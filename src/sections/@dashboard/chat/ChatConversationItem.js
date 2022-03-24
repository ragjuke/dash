import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Avatar, ListItemButton, ListItemText, ListItemAvatar } from '@mui/material';
//
import BadgeStatus from '../../../components/BadgeStatus';
import axios from '../../../utils/axios';
import { useState } from 'react';
import NextLink from 'next/link';


import { PATH_DASHBOARD } from 'src/routes/paths';
// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  transition: theme.transitions.create('all'),
}));

const AvatarWrapperStyle = styled('div')(() => ({
  position: 'relative',
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  '& .MuiAvatar-img': { borderRadius: '50%' },
  '& .MuiAvatar-root': { width: '100%', height: '100%' },
}));

// ----------------------------------------------------------------------

const getDetails = (conversation, currentUserId) => {
  const otherParticipants = 2;
  const displayNames = conversation.partner.fname + ' ' + conversation.partner.lname;

  // // Let's Pull the Whole Chat
  // axios.get(`/api/message/${conversation.id}`).then(r=>{
  //     setReplies(r.data);
  //     console.log(r.data);
  // });

  let displayText = '';
  const lastMessage = conversation.message;
  // if (lastMessage) {
  //   const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';
  //   // const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;
  //   displayText = `${sender}${message}`;
  // }
  return { otherParticipants, displayNames, displayText };
};

ChatConversationItem.propTypes = {
  isSelected: PropTypes.bool,
  conversation: PropTypes.object.isRequired,
  isOpenSidebar: PropTypes.bool,
  onSelectConversation: PropTypes.func,
};

export default function ChatConversationItem({ isSelected, conversation, onSelectConversation, isOpenSidebar }) {
  const details = getDetails(conversation, 'James');
  const [replies, setReplies] = useState({});

  // const displayLastActivity = conversation.messages[conversation.messages.length - 1].createdAt;

  const isGroup = details.otherParticipants.length > 1;
  const isUnread = conversation.unread > 0;
  const isOnlineGroup = isGroup && details.otherParticipants.map((item) => item.status).includes('online');

  return (
    // <NextLink href={`${PATH_DASHBOARD.chat.root}/${conversation.id}`} passHref>
    <RootStyle
      disableGutters
      onClick={onSelectConversation}
      sx={{
        ...(isSelected && { bgcolor: 'action.selected' }),
      }}
    >
      <ListItemAvatar>
        <Box
          sx={{
            ...(isGroup && {
              position: 'relative',
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              '& .avatarWrapper': {
                position: 'absolute',
                width: AVATAR_SIZE_GROUP,
                height: AVATAR_SIZE_GROUP,
                '&:nth-of-type(1)': {
                  left: 0,
                  zIndex: 9,
                  bottom: 2,
                  '& .MuiAvatar-root': {
                    border: (theme) => `solid 2px ${theme.palette.background.paper}`,
                  },
                },
                '&:nth-of-type(2)': { top: 2, right: 0 },
              },
            }),
          }}
        >
          {/* {details.otherParticipants.slice(0, 2).map((participant) => ( */}
            <AvatarWrapperStyle className="avatarWrapper" key={conversation.id}>
              <Avatar alt='' src={conversation.partner.profile_photo_url == 'https://ui-avatars.com/api/?name=&color=7F9CF5&background=EBF4FF' ? '' : conversation.partner.profile_photo_url} />
              {/* {!isGroup && participant?.status && (
                <BadgeStatus status={participant.status} sx={{ right: 2, bottom: 2, position: 'absolute' }} />
              )} */}
            </AvatarWrapperStyle>
          {/* ))} */}
          {/* {isOnlineGroup && <BadgeStatus status="online" sx={{ right: 2, bottom: 2, position: 'absolute' }} />} */}
        </Box>
      </ListItemAvatar>

      {isOpenSidebar && (
        <>
          <ListItemText
            primary={details.displayNames}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={details.displayText}
            secondaryTypographyProps={{
              noWrap: true,
              variant: isUnread ? 'subtitle2' : 'body2',
              color: isUnread ? 'textPrimary' : 'textSecondary',
            }}
          />

          <Box
            sx={{
              ml: 2,
              height: 44,
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                mb: 1.25,
                fontSize: 12,
                lineHeight: '22px',
                whiteSpace: 'nowrap',
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(conversation.created_at), {
                addSuffix: false,
              })}
            </Box>
            {isUnread && <BadgeStatus status="unread" size="small" />}
          </Box>
        </>
      )}




    </RootStyle>

    // </NextLink>
  );
}
