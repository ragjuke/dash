// next
import Router, { useRouter } from 'next/router';
//
import { useEffect, useState } from 'react';
// @mui
import { Box, Divider } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import {
  addRecipients,
  onSendMessage,
  getConversation,
  getParticipants,
  markConversationAsRead,
  resetActiveConversation,
} from '../../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import ChatRoom from './ChatRoom';
import ChatMessageList from './ChatMessageList';
import ChatMessageListEmpty from './ChatMessageListEmpty';
import ChatHeaderDetail from './ChatHeaderDetail';
import ChatMessageInput from './ChatMessageInput';
import ChatHeaderCompose from './ChatHeaderCompose';
import axios from '../../../utils/axios';
import { useSnackbar } from 'notistack';



// ----------------------------------------------------------------------

const conversationSelector = (state) => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = activeConversationId ? conversations.byId[activeConversationId] : null;
  if (conversation) {
    return conversation;
  }
  const initState = {
    id: '',
    messages: [],
    participants: [],
    unreadCount: 0,
    type: '',
  };
  return initState;
};

export default function ChatWindow(props) {

  const { pathname, query } = useRouter();

  const { conversationKey } = query;

  const [thechat, setThechat] = useState([]);

  useEffect(() => {
        axios
        .get(`/api/message/${props.chatGroup}`)
        .then((response) => {
          // console.log(response.data);
          setThechat(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
  const dispatch = useDispatch();

  

  const { contacts, recipients, participants, activeConversationId } = useSelector((state) => state.chat);

  const conversation = useSelector((state) => conversationSelector(state));

  const mode = conversationKey ? 'DETAIL' : 'COMPOSE';
  // const mode = 'COMPOSE';

  const displayParticipants = participants.filter((item) => item.id !== '8864c717-587d-472a-929a-8e5f298024da-0');

  const handleSendMessage = async (value) => {
    // console.log(value)
    let data = {
                reply: value.message,
                pm_id: value.conversationId
                }

                axios
                  .post(`/api/message/reply`,  data )
                  .then((response) => {
                    const { data } = response;
                    enqueueSnackbar('Reply sent');
                    Router.push(PATH_DASHBOARD.chat.root);
                    // window.location.href = PATH_DASHBOARD.chat.root+'/'+conversationId;
                    location.reload();

                  })
                  .catch((error) => {
                    console.log(error);
                  });
    try {
      // dispatch(onSendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <ChatHeaderDetail participants={displayParticipants} />

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
          {
            thechat == 'Invalid Private Message ID' ?
              <ChatMessageListEmpty conversation={thechat} />

            :
              <ChatMessageList conversation={thechat} />
          }

          <Divider />

          <ChatMessageInput
            conversationId={props.chatGroup}
            onSend={handleSendMessage}
            disabled={pathname === PATH_DASHBOARD.chat.new}
          />
        </Box>

      </Box>
    </Box>
  );
}
