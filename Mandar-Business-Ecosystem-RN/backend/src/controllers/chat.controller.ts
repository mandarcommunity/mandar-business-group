// @ts-nocheck
import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import { sendPushNotification } from "../utils/push";
import { sendResponse } from "../utils/sendResponse";

const verifyParticipant = async (chatId: string, userId: string) => {
    const { data } = await supabase.from('chats').select('id').eq('id', chatId).or(`user1_id.eq.${userId},user2_id.eq.${userId}`).single();
    return !!data;
};

export const getMyChats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    let { data: rawChats, error } = await supabase
      .from("chats")
      .select("*")
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order("updated_at", { ascending: false });

    if (error) throw error;
    // Filter out chats that are deleted by this user
    rawChats = rawChats.filter((c: any) => !(c.deleted_by || []).includes(userId));

    // Fetch user and business data for the other person in each chat
    const data = await Promise.all((rawChats || []).map(async (chat: any) => {
      const otherId = chat.user1_id === userId ? chat.user2_id : chat.user1_id;
      
      const { data: userData } = await supabase.from('users').select('full_name').eq('id', otherId).single();
      const { data: bizData } = await supabase.from('businesses').select('business_name, profile_image').eq('user_id', otherId).single();
        const { data: allMsgsData } = await supabase.from('chat_messages').select('content, is_read, sender_id, deleted_by').eq('chat_id', chat.id).order('created_at', { ascending: false }).limit(20);
        const lastMsgData = allMsgsData?.find(m => !(m.deleted_by || []).includes(userId)) || null;
        const { count: unreadCount } = await supabase.from('chat_messages').select('*', { count: 'exact', head: true }).eq('chat_id', chat.id).eq('is_read', false).eq('sender_id', otherId).not('deleted_by', 'cs', `{${userId}}`);
      
      return {
        ...chat,
        otherUserId: otherId,
        personName: userData?.full_name || "Unknown User",
        businessName: bizData?.business_name || "Unknown Business",
          lastMessage: lastMsgData?.content || "Tap to view messages",
            isLastMessageMine: lastMsgData?.sender_id === userId,
            isLastMessageRead: lastMsgData?.is_read || false,
          profileImage: bizData?.profile_image || null,
          unreadCount: unreadCount || 0,
          archived: (chat.archived_by || []).includes(userId),
          pinned: (chat.pinned_by || []).includes(userId),
          blocked: (chat.blocked_by || []).includes(userId),
            blockedByOther: (chat.blocked_by || []).includes(otherId)
        };
    }));

    return sendResponse({ res, success: true, message: "Chats fetched", data });
  } catch (error: any) {
    return sendResponse({ res, success: false, statusCode: 400, message: error.message });
  }
};

export const getOrCreateChat = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { otherUserId } = req.body;
    
    // Check if chat exists
    const { data: existingChat } = await supabase
      .from("chats")
      .select("*")
      .or(`and(user1_id.eq.${userId},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${userId})`)
      .single();

    if (existingChat) {
      return sendResponse({ res, success: true, message: "Chat found", data: existingChat });
    }

    // Create new chat
    const { data: newChat, error } = await supabase
      .from("chats")
      .insert({ user1_id: userId, user2_id: otherUserId })
      .select()
      .single();

    return sendResponse({ res, success: true, message: "Chat created", data: newChat });
  } catch (error: any) {
    return sendResponse({ res, success: false, statusCode: 400, message: error.message });
  }
};

export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const userId = (req as any).user.id;
    if (!(await verifyParticipant(chatId, userId))) return sendResponse({ res, statusCode: 403, success: false, message: "Unauthorized chat access" });

    const { data: rawData, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: false }).limit(50);
      
      const data = rawData?.filter(msg => !(msg.deleted_by || []).includes(userId)) || [];

    return sendResponse({ res, success: true, message: "Messages fetched", data });
  } catch (error: any) {
    return sendResponse({ res, success: false, statusCode: 400, message: error.message });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { chatId } = req.params;
    if (!(await verifyParticipant(chatId, userId))) return sendResponse({ res, statusCode: 403, success: false, message: "Unauthorized chat access" });
    let { content } = req.body;

    // 1. Check if chat is blocked
    const { data: chatData } = await supabase.from('chats').select('blocked_by').eq('id', chatId).single();
    if (chatData?.blocked_by?.length > 0) {
      return sendResponse({ res, statusCode: 400, success: false, message: "Cannot send message to this chat" });
    }

    if (content && content.startsWith("[IMAGE_BASE64]")) {
      const base64Data = content.replace("[IMAGE_BASE64]", "");
      const buffer = Buffer.from(base64Data, "base64");
      const fileName = `attach_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
      
      const { error: uploadErr } = await supabase.storage.from("chat_attachments").upload(fileName, buffer, { contentType: "image/jpeg" });
      if (!uploadErr) {
        const { data: urlData } = supabase.storage.from("chat_attachments").getPublicUrl(fileName);
        content = "[IMAGE]" + urlData.publicUrl;
      } else {
        console.error("Upload error:", uploadErr);
        throw uploadErr;
      }
    }

    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        chat_id: chatId,
        sender_id: userId,
        content
      })
      .select()
      .single();

    if (error) throw error;

    // Update chat updated_at
    await supabase.from("chats").update({ updated_at: new Date().toISOString() }).eq("id", chatId);

    return sendResponse({ res, success: true, message: "Message sent", data });
  } catch (error: any) {
    return sendResponse({ res, success: false, statusCode: 400, message: error.message });
  }
};

export const markChatAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    // We want to mark messages sent by the OTHER user as read.
    // So where chat_id = chatId AND sender_id != userId
    const { error } = await supabase
      .from('chat_messages')
      .update({ is_read: true })
      .eq('chat_id', chatId)
      .neq('sender_id', userId)
      .eq('is_read', false);

    if (error) {
      console.error("Mark read error:", error);
      return sendResponse({ res, statusCode: 500, success: false, message: error.message });
    }

    return sendResponse({ res, success: true, message: "Marked as read" });
  } catch (error: any) {
    console.error(error);
    return sendResponse({ res, statusCode: 500, success: false, message: error.message || "Server Error" });
  }
};

export const updateChatState = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const { action } = req.body; // 'pin', 'unpin', 'archive', 'unarchive', 'delete', 'block'
    const userId = req.user.id;

    const { data: chat, error: fetchErr } = await supabase.from('chats').select('*').eq('id', chatId).single();
    if (fetchErr || !chat) return sendResponse({ res, statusCode: 404, success: false, message: "Chat not found" });

    let updates: any = {};
    
    const toggleArray = (arr: any, val: string, add: boolean) => {
        const safeArr = Array.isArray(arr) ? arr : [];
        const set = new Set(safeArr);
        if (add) set.add(val); else set.delete(val);
        return Array.from(set);
      };

    if (action === 'pin') updates.pinned_by = toggleArray(chat.pinned_by, userId, true);
    if (action === 'unpin') updates.pinned_by = toggleArray(chat.pinned_by, userId, false);
    if (action === 'archive') updates.archived_by = toggleArray(chat.archived_by, userId, true);
    if (action === 'unarchive') updates.archived_by = toggleArray(chat.archived_by, userId, false);
    if (action === 'delete') updates.deleted_by = toggleArray(chat.deleted_by, userId, true);
    if (action === 'block') updates.blocked_by = toggleArray(chat.blocked_by, userId, true);
      if (action === 'unblock') updates.blocked_by = toggleArray(chat.blocked_by, userId, false);

    const { error } = await supabase.from('chats').update(updates).eq('id', chatId);
    if (error) throw error;
    
    return sendResponse({ res, success: true, message: `Chat ${action} successful` });
  } catch (error: any) {
    return sendResponse({ res, statusCode: 500, success: false, message: error.message });
  }
};

export const clearChat = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;
    if (!(await verifyParticipant(chatId, userId))) return sendResponse({ res, statusCode: 403, success: false, message: "Unauthorized chat access" });

    // Supabase RPC or direct fetch-and-update since array_append is tricky in REST API without RPC
    const { data: msgs } = await supabase.from('chat_messages').select('id, deleted_by').eq('chat_id', chatId);
    if (msgs) {
      await Promise.all(msgs.map(async (msg) => {
        const arr = new Set(msg.deleted_by || []);
        arr.add(userId);
        await supabase.from('chat_messages').update({ deleted_by: Array.from(arr) }).eq('id', msg.id);
      }));
    }
    return sendResponse({ res, success: true, message: "Chat cleared" });
  } catch (error: any) {
    return sendResponse({ res, statusCode: 500, success: false, message: error.message });
  }
};

export const deleteMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const { messageIds } = req.body;
    const userId = req.user.id;
    if (!(await verifyParticipant(chatId, userId))) return sendResponse({ res, statusCode: 403, success: false, message: "Unauthorized chat access" });

    const { data: msgs } = await supabase.from('chat_messages').select('id, deleted_by').in('id', messageIds);
    if (msgs) {
      await Promise.all(msgs.map(async (msg) => {
        const arr = new Set(msg.deleted_by || []);
        arr.add(userId);
        await supabase.from('chat_messages').update({ deleted_by: Array.from(arr) }).eq('id', msg.id);
      }));
    }
    return sendResponse({ res, success: true, message: "Messages deleted" });
  } catch (error: any) {
    return sendResponse({ res, statusCode: 500, success: false, message: error.message });
  }
};

export const reportChat = async (req: AuthRequest, res: Response) => {
  try {
    const { chatId } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;
    if (!(await verifyParticipant(chatId, userId))) return sendResponse({ res, statusCode: 403, success: false, message: "Unauthorized chat access" });

    // 1. Block the chat
    const { data: chat } = await supabase.from('chats').select('blocked_by').eq('id', chatId).single();
    if (chat) {
      const arr = new Set(chat.blocked_by || []);
      arr.add(userId);
      await supabase.from('chats').update({ blocked_by: Array.from(arr) }).eq('id', chatId);
    }

    // 2. Insert report
    await supabase.from('reports').insert({ reporter_id: userId, reported_chat_id: chatId, reason });

    return sendResponse({ res, success: true, message: "Chat reported and blocked" });
  } catch (error: any) {
    return sendResponse({ res, statusCode: 500, success: false, message: error.message });
  }
};
