import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
//
import Scrollbar from '../../../components/Scrollbar';
import LightboxModal from '../../../components/LightboxModal';
import ChatMessageItem from './ChatMessageItem';
import ChatMessageItemReplies from './ChatMessageItemReplies';

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

  const imagesLightbox = conversation.messages;
  
  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, height: 1 }}>
          <ChatMessageItem
            key={conversation.id}
            message={conversation.message}
            conversation={conversation}
            partner={conversation?.partner}
            onOpenLightbox={handleOpenLightbox}
          />


          
              {/* Let's Loop through the replies */}
                {conversation.replies != undefined &&  conversation.replies.map((message) => {
                    return (
                     <>
                        <ChatMessageItemReplies
                            key={message.id}
                            message={message.reply}
                            conversation={message}
                            partner={conversation.partner}
                            onOpenLightbox={handleOpenLightbox}
                            />
                     </>
                    );
                  })}
        
      </Scrollbar>

      {/* <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      /> */}
    </>
  );
}
