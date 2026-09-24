import * as ImagePicker from "expo-image-picker";
import { Modal, Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  ArrowLeft,
  EllipsisVertical,
  Phone,
  Plus,
  SendHorizontal,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  useState,
  useEffect,
} from "react";

import MessageBubble from "../components/chat/MessageBubble";
import { Trash2 } from "lucide-react-native";

import EmptyState from "../components/states/EmptyState";

import LoadingState from "../components/states/LoadingState";

import ErrorState from "../components/states/ErrorState";

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "../theme";

const messagesData = [
  {
    id: "1",

    message:
      "Hello sir, we manufacture custom ecommerce packaging solutions.",

    time: "10:12 AM",

    isSender: false,
  },

  {
    id: "2",

    message:
      "Can you share pricing for bulk orders?",

    time: "10:14 AM",

    isSender: true,
  },

  {
    id: "3",

    message:
      "Sure. Please share your quantity requirements and box dimensions.",

    time: "10:16 AM",

    isSender: false,
  },

  {
    id: "4",

    message:
      "We require around 5000 corrugated boxes monthly.",

    time: "10:18 AM",

    isSender: true,
  },


  {
    id: "5",

    message:
      "Hello sir, we manufacture custom ecommerce packaging solutions.",

    time: "10:12 AM",

    isSender: false,
  },

  {
    id: "6",

    message:
      "Can you share pricing for bulk orders?",

    time: "10:14 AM",

    isSender: true,
  },

  {
    id: "7",

    message:
      "Sure. Please share your quantity requirements and box dimensions.",

    time: "10:16 AM",

    isSender: false,
  },

  {
    id: "8",

    message:
      "We require around 5000 corrugated boxes monthly.",

    time: "10:18 AM",

    isSender: true,
  },{
    id: "9",

    message:
      "Hello sir, we manufacture custom ecommerce packaging solutions.",

    time: "10:12 AM",

    isSender: false,
  },

  {
    id: "10",

    message:
      "Can you share pricing for bulk orders?",

    time: "10:14 AM",

    isSender: true,
  },

  {
    id: "11",

    message:
      "Sure. Please share your quantity requirements and box dimensions.",

    time: "10:16 AM",

    isSender: false,
  },

  {
    id: "12",

    message:
      "We require around 5000 corrugated boxes monthly.",

    time: "10:18 AM",

    isSender: true,
  },{
    id: "13",

    message:
      "Hello sir, we manufacture custom ecommerce packaging solutions.",

    time: "10:12 AM",

    isSender: false,
  },

  {
    id: "14",

    message:
      "Can you share pricing for bulk orders?",

    time: "10:14 AM",

    isSender: true,
  },

  {
    id: "15",

    message:
      "Sure. Please share your quantity requirements and box dimensions.",

    time: "10:16 AM",

    isSender: false,
  },

  {
    id: "16",

    message:
      "We require around 5000 corrugated boxes monthly.",

    time: "10:18 AM",
    isSender: true,
  },
];

export default function ConversationScreen({ route }: any) {
  const { chatId, otherUserId, name, otherUserName, businessName, businessId } = route?.params || {};
  
  const displayTitle = businessName || name || otherUserName || "User";
  const displaySubtitle = businessName ? (name || otherUserName || "Contact Person") : "Active now";
  const navigation = useNavigation<any>();

  const pickAttachment = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'images' as any,
          allowsEditing: true,
          
          quality: 0.2,
          base64: true,
        });
      if (result.canceled || !result.assets[0].uri) return;
      
      if (!currentChatId) {
        const { ToastAndroid } = require("react-native");
        ToastAndroid.show("Please send a text message first to initialize chat", ToastAndroid.SHORT);
        return;
      }
      
      setSelectedAttachment(result.assets[0]);
      } catch (err) {
        console.error("Pick attachment error", err);
      }
    };

    const confirmSendAttachment = async () => {
      if (!selectedAttachment) return;
      try {
        setUploadingAttachment(true);
        const { sendMessage } = require("../services/chat.service");
        const { getAccessToken } = require("../utils/storage");
        const token = await getAccessToken();
          
        
        const base64Str = selectedAttachment.base64;
        if (!base64Str) throw new Error("No base64 data");
        
        setSelectedAttachment(null); // Hide modal immediately
        
        const resMsg = await sendMessage(token, currentChatId, "[IMAGE_BASE64]" + base64Str);
        const finalMsg = resMsg.data?.data?.content || "[IMAGE_SENT]";
      
      setMessages((prev: any) => [{
        id: Math.random().toString(),
        message: finalMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: true
      }, ...prev]);
      
    } catch(err) {
      console.error(err);
      const { ToastAndroid } = require("react-native");
      ToastAndroid.show("Failed to upload image", ToastAndroid.SHORT);
    } finally {
      setUploadingAttachment(false);
    }
  };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(chatId || null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
    const [selectedAttachment, setSelectedAttachment] = useState<any>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isBlocked, setIsBlocked] = useState(route?.params?.blocked || false);

  useEffect(() => {
      let myChannel: any = null;
      const { supabase } = require("../utils/supabase");
      const setupChat = async () => {
      try {
        setIsLoading(true);
        const { getAccessToken, getUser } = require("../utils/storage");
        const { getOrCreateChat, getChatMessages } = require("../services/chat.service");
        const { supabase } = require("../utils/supabase");
        
        const token = await getAccessToken();
        const user = await getUser();
        
        if (!user) throw new Error("No user found");
        setCurrentUserId(user.id);

        let activeChatId = currentChatId;
        if (!activeChatId && otherUserId) {
          const chatRes = await getOrCreateChat(token, otherUserId);
          activeChatId = chatRes.data?.data?.id || chatRes.data?.id;
          setCurrentChatId(activeChatId);
        }

        if (activeChatId) {
          // Mark as read
          const { markChatAsRead } = require('../services/chat.service');
            await markChatAsRead(token, activeChatId).catch(console.error);
          const msgsRes = await getChatMessages(token, activeChatId);
          const rawMessages = Array.isArray(msgsRes.data) ? msgsRes.data : (msgsRes.data?.data || []);
          setMessages(rawMessages.map((m: any) => ({
            id: m.id,
            message: m.content,
            time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSender: m.sender_id === user.id
          })));

          supabase.removeAllChannels(); // Safe clear
          myChannel = supabase
            .channel(`chat_${activeChatId}`)
            .on('postgres_changes', { 
              event: 'INSERT', 
              schema: 'public', 
              table: 'chat_messages',
              filter: `chat_id=eq.${activeChatId}`
            }, (payload: any) => {
              const newMsg = payload.new;
              if (newMsg.sender_id === user.id) return;
              
              setMessages((prev) => [{
                id: newMsg.id,
                message: newMsg.content,
                time: new Date(newMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isSender: false
              }, ...prev]);
            })
            .subscribe();

            }
        } catch (err) {
        console.error("Setup chat error", err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    setupChat();
    
    return () => {
      if (myChannel) {
        supabase.removeChannel(myChannel);
      }
    };
  }, [currentChatId, otherUserId]);

  /* LOADING */
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingState title="Loading conversation..." />
      
        </SafeAreaView>
    );
  }

  /* ERROR */
  if (hasError) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorState
          title="Unable to load chat"
          description="Please try again later."
          buttonText="Retry"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 25}
      >
        {/* HEADER */}
      {selectedMessages.length > 0 ? (
        <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setSelectedMessages([])} style={{ padding: 8 }}>
              <ArrowLeft size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold', marginLeft: 16 }}>{selectedMessages.length}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={{ padding: 8 }} onPress={async () => {
              try {
                const { Alert } = require("react-native");
                Alert.alert("Delete Messages", "Delete selected messages?", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Delete", style: "destructive", onPress: async () => {
                      const { deleteMessages } = require("../services/chat.service");
                      const { getAccessToken } = require("../utils/storage");
                      const t = await getAccessToken();
                      await deleteMessages(t, currentChatId, selectedMessages);
                      setMessages(prev => prev.filter((m: any) => !selectedMessages.includes(m.id)));
                      setSelectedMessages([]);
                    }
                  }
                ]);
              } catch(e){}
            }}>
              <Trash2 size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
              <ArrowLeft size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>

            <View style={styles.headerInfo}>
              <Text style={styles.personName}>{displayTitle}</Text>
              <Text style={styles.businessName}>{displaySubtitle}</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} onPress={async () => { 
              try {
                const { getAccessToken } = require("../utils/storage");
                const { getBusinessById } = require("../services/business.service");
                const { API } = require("../services/api");
                const { Linking, ToastAndroid } = require("react-native");
                
                let phoneToCall = null;
                const token = await getAccessToken();
                
                if (businessId) {
                  const res = await getBusinessById(businessId, token);
                  if (res.data?.phone) phoneToCall = res.data.phone;
                  else if (res.data?.user?.mobile) phoneToCall = res.data.user.mobile;
                } else if (otherUserId) {
                  // Fallback: get business by user ID from API
                  const res = await API.get(`/businesses/user/${otherUserId}`, { headers: { Authorization: `Bearer ${token}` } });
                  if (res.data?.data?.mobile) phoneToCall = res.data.data.mobile;
                    else if (res.data?.data?.phone) phoneToCall = res.data.data.phone;
                  else {
                    // Get user mobile
                    const userRes = await API.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }); // Not exactly, other user
                    // We can't fetch other user's mobile easily without an API. Let's rely on business.
                  }
                }
                
                if (!phoneToCall) {
                  ToastAndroid.show("No phone number found", ToastAndroid.SHORT);
                  return;
                }
                
                Linking.openURL(`tel:${phoneToCall}`);
              } catch (e) {
                console.error(e);
                const { ToastAndroid } = require("react-native");
                ToastAndroid.show("Failed to fetch phone number", ToastAndroid.SHORT);
              }
            }}>
              <Phone size={18} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => setMenuVisible(true)}>
              <EllipsisVertical size={18} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      )}

        {!messages.length ? (
          <View style={styles.emptyWrapper}>
            <EmptyState title="No messages yet" description="Start the conversation by sending a message." />
          </View>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            inverted
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContainer}
            renderItem={({ item }) => (
              <MessageBubble
                message={item.message}
                time={item.time}
                isSender={item.isSender}
                onImagePress={setPreviewImage}
                selected={selectedMessages.includes(item.id)}
                onLongPress={() => {
                  if (selectedMessages.length === 0) setSelectedMessages([item.id]);
                }}
                onPress={() => {
                  if (selectedMessages.length > 0) {
                    if (selectedMessages.includes(item.id)) setSelectedMessages(prev => prev.filter(id => id !== item.id));
                    else setSelectedMessages(prev => [...prev, item.id]);
                  }
                }}
              />
            )}
          />
        )}

        
        {/* Attachment Confirmation Modal */}
        <Modal visible={!!selectedAttachment} transparent animationType="slide" onRequestClose={() => setSelectedAttachment(null)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center' }}>
            <View style={{ position: 'absolute', top: 40, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 }}>
              <TouchableOpacity onPress={() => setSelectedAttachment(null)} style={{ padding: 10 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmSendAttachment} style={{ padding: 10, backgroundColor: COLORS.primary, borderRadius: 8 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Send Image</Text>
              </TouchableOpacity>
            </View>
            {selectedAttachment?.uri && (
              <Image source={{ uri: selectedAttachment.uri }} style={{ width: '100%', height: '80%', resizeMode: 'contain' }} />
            )}
          </View>
        </Modal>

        {/* Fullscreen Image Preview Modal */}
        <Modal visible={!!previewImage} transparent animationType="fade" onRequestClose={() => setPreviewImage(null)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center' }}>
            <View style={{ position: 'absolute', top: 40, right: 20, flexDirection: 'row', zIndex: 10 }}>
                <TouchableOpacity onPress={async () => {
                  try {
                    const FileSystem = require('expo-file-system');
                    const MediaLibrary = require('expo-media-library');
                    const { status } = await MediaLibrary.requestPermissionsAsync();
                    if (status === 'granted') {
                      const { ToastAndroid } = require("react-native");
                      ToastAndroid.show("Downloading image...", ToastAndroid.SHORT);
                      const fileUri = FileSystem.documentDirectory + `image_${Date.now()}.jpg`;
                      await FileSystem.downloadAsync(previewImage, fileUri);
                      await MediaLibrary.saveToLibraryAsync(fileUri);
                      ToastAndroid.show("Saved to gallery!", ToastAndroid.SHORT);
                    } else {
                      const { Alert } = require("react-native");
                      Alert.alert("Permission required", "Need permission to save images.");
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }} style={{ padding: 10, marginRight: 15, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPreviewImage(null)} style={{ padding: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
              </View>
            {previewImage && (
              <Image source={{ uri: previewImage }} style={{ width: '100%', height: '80%', resizeMode: 'contain' }} />
            )}
          </View>
        </Modal>

          {/* INPUT */}
        {isBlocked ? (
            <View style={[styles.inputSection, { justifyContent: 'center', paddingVertical: 16 }]}>
              <Text style={{ textAlign: 'center', color: '#888' }}>You blocked this chat. Unblock to send a message.</Text>
            </View>
          ) : (
          <View style={styles.inputSection}>
            
          <TouchableOpacity style={styles.attachButton} onPress={pickAttachment} disabled={uploadingAttachment}>
              <Plus size={20} color={uploadingAttachment ? COLORS.textMuted : COLORS.textPrimary} />
            </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type message..."
              placeholderTextColor={COLORS.textMuted}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            disabled={!message.trim() || sending}
            onPress={async () => {
              if (!message.trim() || !currentChatId) return;
              setSending(true);
              const textToSend = message.trim();
              setMessage("");
              
              try {
                const { getAccessToken } = require("../utils/storage");
                const { sendMessage } = require("../services/chat.service");
                const token = await getAccessToken();
                
                const sentRes = await sendMessage(token, currentChatId, textToSend);
                  const newMsg = sentRes.data?.data || sentRes.data;
                
                setMessages(prev => [{
                  id: newMsg.id,
                  message: newMsg.content,
                  time: new Date(newMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  isSender: true
                }, ...prev]);
              } catch (err) {
                console.error("Send message error", err);
                setMessage(textToSend);
              } finally {
                setSending(false);
              }
            }}
            style={[styles.sendButton, (!message.trim() || sending) && styles.disabledSendButton]}
          >
            <SendHorizontal size={18} color={COLORS.white} />
          </TouchableOpacity>
        
          </View>
          )}
      </KeyboardAvoidingView>

      <Modal visible={menuVisible} transparent animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: 60, paddingRight: 20 }} activeOpacity={1} onPress={() => setMenuVisible(false)}>
          <View style={{ backgroundColor: COLORS.surface, borderRadius: 12, width: 200, overflow: 'hidden', elevation: 5 }}>
            <TouchableOpacity style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border }} onPress={async () => { 
              setMenuVisible(false); 
              let targetId = businessId;
              if (!targetId && otherUserId) {
                const { API } = require("../services/api");
                const { getAccessToken } = require("../utils/storage");
                const t = await getAccessToken();
                const res = await API.get(`/businesses/user/${otherUserId}`, { headers: { Authorization: `Bearer ${t}` } });
                const data = res.data?.data;
                if (data?.id) targetId = data.id;
              }
              if (targetId) { navigation.navigate("BusinessProfile", { businessId: targetId }); } else { const { ToastAndroid } = require("react-native"); ToastAndroid.show("No business profile found for this user", ToastAndroid.SHORT); } 
            }}>
              <Text style={{ fontSize: 15, color: COLORS.textPrimary }}>View Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border }} onPress={async () => { 
              setMenuVisible(false); 
              let targetId = businessId;
              if (!targetId && otherUserId) {
                const { API } = require("../services/api");
                const { getAccessToken } = require("../utils/storage");
                const t = await getAccessToken();
                const res = await API.get(`/businesses/user/${otherUserId}`, { headers: { Authorization: `Bearer ${t}` } });
                const data = res.data?.data;
                if (data?.id) targetId = data.id;
              }
              if (targetId) { navigation.navigate("BusinessCatalog", { businessId: targetId }); } else { const { ToastAndroid } = require("react-native"); ToastAndroid.show("No catalog found for this user", ToastAndroid.SHORT); } 
            }}>
              <Text style={{ fontSize: 15, color: COLORS.textPrimary }}>View Products</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border }} onPress={async () => {
                setMenuVisible(false);
                const { Alert } = require("react-native");
                Alert.alert("Clear Chat", "Are you sure you want to clear all messages?", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Clear", style: "destructive", onPress: async () => {
                      const { clearChat } = require("../services/chat.service");
                      const { getAccessToken } = require("../utils/storage");
                      const t = await getAccessToken();
                      await clearChat(t, currentChatId);
                      setMessages([]);
                    }
                  }
                ]);
              }}>
                <Text style={{ fontSize: 15, color: COLORS.textPrimary }}>Clear Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border }} onPress={async () => {
                setMenuVisible(false);
                const { Alert } = require("react-native");
                Alert.alert(isBlocked ? "Unblock User" : "Block User", isBlocked ? "Are you sure you want to unblock this chat?" : "Are you sure you want to block this chat?", [
                  { text: "Cancel", style: "cancel" },
                  { text: isBlocked ? "Unblock" : "Block", style: "destructive", onPress: async () => {
                      const { updateChatState } = require("../services/chat.service");
                        const { getAccessToken } = require("../utils/storage");
                        const t = await getAccessToken();
                        const action = isBlocked ? 'unblock' : 'block';
                        await updateChatState(t, currentChatId, action);
                        Alert.alert(isBlocked ? "Unblocked" : "Blocked", isBlocked ? "Chat has been unblocked." : "Chat has been blocked.");
                        setIsBlocked(!isBlocked); // Optionally clear or redirect
                    }
                  }
                ]);
              }}>
                <Text style={{ fontSize: 15, color: COLORS.textPrimary }}>{isBlocked ? "Unblock" : "Block"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ padding: 16 }} onPress={() => { setMenuVisible(false); setReportModalVisible(true); }}>
                <Text style={{ fontSize: 15, color: COLORS.error }}>Report</Text>
              </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    <Modal visible={reportModalVisible} transparent animationType="fade" onRequestClose={() => setReportModalVisible(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: COLORS.surface, borderRadius: 12, width: '80%', padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Report Chat</Text>
              <Text style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 15 }}>Reporting will also block this chat and send a report to the admin.</Text>
              
              <TextInput
                style={{ borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 10, minHeight: 80, textAlignVertical: 'top' }}
                placeholder="Describe the issue (e.g. scam, spam, abusive)..."
                multiline
                value={reportReason}
                onChangeText={setReportReason}
              />
              
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                <TouchableOpacity onPress={() => setReportModalVisible(false)} style={{ padding: 10, marginRight: 10 }}>
                  <Text style={{ color: COLORS.textSecondary, fontWeight: 'bold' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={async () => {
                    if (!reportReason.trim()) return;
                    try {
                      const { reportChat } = require("../services/chat.service");
                      const { getAccessToken } = require("../utils/storage");
                      const t = await getAccessToken();
                      await reportChat(t, currentChatId, reportReason);
                      setReportModalVisible(false);
                      setReportReason("");
                      const { Alert } = require("react-native");
                      Alert.alert("Reported", "Chat has been reported and blocked.");
                      setIsBlocked(true);
                    } catch(e){}
                  }}
                  style={{ padding: 10, backgroundColor: COLORS.error, borderRadius: 8 }}>
                  <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Submit Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      COLORS.background,
  },

  header: {
    height: 82,

    paddingHorizontal:
      SPACING.lg,

    borderBottomWidth: 1,

    borderBottomColor:
      COLORS.border,

    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    backgroundColor:
      COLORS.background,
  },

  headerLeft: {
    flexDirection: "row",

    alignItems: "center",

    flex: 1,
  },

  headerInfo: {
    marginLeft: SPACING.md,

    flex: 1,
  },

  personName: {
    fontSize: 15,

    fontWeight: "700",

    color:
      COLORS.textPrimary,
  },

  businessName: {
    marginTop: 2,

    fontSize:
      TYPOGRAPHY.caption,

    color: COLORS.accent,

    fontWeight: "600",
  },

  viewProfile: {
    marginTop: 4,

    fontSize: 11,

    fontWeight: "600",

    color:
      COLORS.textPrimary,
  },

  headerRight: {
    flexDirection: "row",

    marginLeft: SPACING.md,
  },

  iconButton: {
    width: 42,

    height: 42,

    borderRadius: 16,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",

    marginLeft: SPACING.sm,
  },

  messagesList: {
    flex: 1,
  },

  messagesContainer: {
    paddingHorizontal:
      SPACING.lg,

    paddingTop: SPACING.lg,

    paddingBottom: 16,

    flexGrow: 1,

    justifyContent: "flex-end",
  },

  emptyWrapper: {
  flex: 1,

  justifyContent: "center",

  paddingTop:
    SPACING.xxxl,
},

  inputSection: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal:
      SPACING.lg,

    paddingTop: SPACING.sm,

    paddingBottom: 10,

    borderTopWidth: 1,

    borderTopColor:
      COLORS.border,

    backgroundColor:
      COLORS.background,
  },

  attachButton: {
    width: 48,

    height: 48,

    borderRadius: 18,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    alignItems: "center",

    justifyContent: "center",

    marginRight: SPACING.sm,
  },

  inputWrapper: {
    flex: 1,

    minHeight: 48,

    borderRadius: 18,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,

    borderColor:
      COLORS.border,

    paddingHorizontal:
      SPACING.lg,

    justifyContent: "center",
  },

  input: {
    fontSize:
      TYPOGRAPHY.body,

    color:
      COLORS.textPrimary,

    paddingVertical: 0,
  },

  sendButton: {
  width: 48,

  height: 48,

  borderRadius: 18,

  backgroundColor:
    COLORS.primary,

  alignItems: "center",

  justifyContent: "center",

  marginLeft: SPACING.sm,
},

disabledSendButton: {
  opacity: 0.5,
},

sendingText: {
  position: "absolute",

  bottom: 4,

  fontSize: 8,

  color: COLORS.white,
},

activeAttachButton: {
  borderColor:
    COLORS.primary,

  backgroundColor:
    COLORS.surfaceSecondary,
},

activeMenuButton: {
  borderColor:
    COLORS.primary,

  backgroundColor:
    COLORS.surfaceSecondary,
},

});