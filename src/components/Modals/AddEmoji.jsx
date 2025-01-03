import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

const AddEmoji = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  <div>
         {chosenEmoji ? (
          <span>You chose: {chosenEmoji.emoji}</span>
        ) : (
          <span>No emoji Chosen</span>
        )}
        <Picker onEmojiClick={onEmojiClick} />
        </div>
    
    return {onEmojiClick}
//   return (
//     <div>
//       {chosenEmoji ? (
//         <span>You chose: {chosenEmoji.emoji}</span>
//       ) : (
//         <span>No emoji Chosen</span>
//       )}
//       <Picker onEmojiClick={onEmojiClick} />
//     </div>
//   );
};
export default AddEmoji;