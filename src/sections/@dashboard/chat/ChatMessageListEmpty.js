import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
//
import Scrollbar from '../../../components/Scrollbar';
import LightboxModal from '../../../components/LightboxModal';
import ChatMessageItem from './ChatMessageItem';
import ChatMessageItemReplies from './ChatMessageItemReplies';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

ChatMessageList.propTypes = {
  conversation: PropTypes.array.isRequired,
};

export default function ChatMessageList({ conversation }) {
  const scrollRef = useRef(null);
  // console.log(conversation)

  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [replies, setReplies] = useState([])

  useEffect(()=>{
    setReplies(conversation?.replies);
},[])

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation.messages]);

  const imagesLightbox = conversation.messages
    // .filter((messages) => messages.contentType === 'image')
    // .map((messages) => messages.body);

  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, height: 1 }}>

          <Box sx={{ padding: '20px', margin: '0 auto' }}>
            <h4>Select a chat from the left sidebar.</h4>
          </Box>


        
      </Scrollbar>

    </>
  );
}
