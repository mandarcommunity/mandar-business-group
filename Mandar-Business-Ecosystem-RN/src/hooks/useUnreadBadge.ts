import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { getUser } from '../utils/storage';

export const useUnreadBadge = () => {
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    let channel: any;
    
    const checkUnread = async () => {
      try {
        const user = await getUser();
        if (!user || !user.id) return;
        
        const { data: myChats } = await supabase
          .from('chats')
          .select('id')
          .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);
          
        if (!myChats || myChats.length === 0) return;
        const chatIds = myChats.map(c => c.id);
        
        const { count } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .in('chat_id', chatIds)
          .eq('is_read', false)
          .neq('sender_id', user.id);
          
        setHasUnread(count && count > 0 ? true : false);
      } catch (err) {}
    };
    
    checkUnread();
    
    const setupRealtime = async () => {
      channel = supabase
        .channel('global_unread_messages')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'chat_messages' },
          (payload) => {
             checkUnread();
          }
        )
        .subscribe();
    };
    
    setupRealtime();
    
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  return hasUnread;
};
