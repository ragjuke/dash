import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
import NextLink from 'next/link';
// @mui
import { List } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { SkeletonConversationItem } from '../../../components/skeleton';
//
import ChatConversationItem from './ChatConversationItem';
import { useState } from 'react';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

ChatConversationList.propTypes = {
  conversations: PropTypes.object,
  isOpenSidebar: PropTypes.bool,
  sx: PropTypes.object,
};

export default function ChatConversationList({ conversations, isOpenSidebar, activeConversationId, sx, ...other }) {
  const { router, push } = useRouter();
  // const { conversationKey } = router.query;

  const theUrl = window.location.pathname;

  const [replies, setReplies] = useState([]);


  const handleSelectConversation = (conversationId) => {
    let conversationKey = '';
    // const conversation = conversations.byId[conversationId];
    // console.log(PATH_DASHBOARD.chat.root+conversationId);
    push(`${PATH_DASHBOARD.chat.root}/${conversationId}`);
    window.location.href = PATH_DASHBOARD.chat.root+'/'+conversationId;
    // location.reload();
  };

  // const loading = !conversations.allIds.length;

  return (
    <List disablePadding sx={sx} {...other}>

                  {conversations?.map((row) => {
                    
                    const { id, sender_id, receiver_id, message, partner, status, unread, created_at } = row;

                    return (
                      <ChatConversationItem
                        key={id}
                        isOpenSidebar={true}
                        conversation={row}
                        isSelected={theUrl == '/dashboard/chat/'+row.id+'/' ? true : false }
                        onSelectConversation={() => handleSelectConversation(row.id)}
                      />
                    );
                  })}


    </List>
  );
}
