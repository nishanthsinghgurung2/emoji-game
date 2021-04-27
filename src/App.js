import React, { useEffect, useState } from 'react';
import './App.css';

import emoji from 'emoji-dictionary';

const generateRandomEmojiArray = (emojis) => {
  let j;
  let temp;
  for(let i=emojis.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * 6);
    temp = emojis[j];
    emojis[j] = emojis[i];
    emojis[i] = temp;
  }
  return emojis;
};

const App = () => {
  const [emojis, setEmojis] = useState(['heart_eyes','grinning', 'grimacing','heart_eyes','grinning', 'grimacing']);
  const [randomEmojis, setRandomEmojis] = useState([]);
  const [showEmojis, setShowEmojis] = useState([]);
  const [emojisInBuffer, setEmojisInBuffer] = useState([]);
  const [emojisInBufferIndex, setEmojisInBufferIndex] = useState([]);

  let newEmojisinBuffer = [];
  let emojisinBufferIndex = [];

  const revealEmoji = (e) => {
    if(newEmojisinBuffer.length === 0 || newEmojisinBuffer.length === 1) {
      newEmojisinBuffer = [...emojisInBuffer];
      newEmojisinBuffer.push(randomEmojis[e.target.dataset.idx]);
      
      emojisinBufferIndex = [...emojisInBufferIndex];
      emojisinBufferIndex.push(e.target.dataset.idx);

      setEmojisInBuffer(newEmojisinBuffer);
      setEmojisInBufferIndex(emojisinBufferIndex);
      
      const updatedEmojis = [...showEmojis];

      if(newEmojisinBuffer.length === 1 || newEmojisinBuffer.length === 2) {
        updatedEmojis[e.target.dataset.idx] = true;
        setShowEmojis(updatedEmojis);
      }

      if(newEmojisinBuffer.length === 2) {
        if(newEmojisinBuffer[0] === newEmojisinBuffer[1]) {
          setEmojisInBuffer([]);
          setEmojisInBufferIndex([]);
          newEmojisinBuffer = [];
        } else {
          setTimeout(() => {
            updatedEmojis[emojisinBufferIndex[0]] = false;
            updatedEmojis[emojisinBufferIndex[1]] = false;
            setShowEmojis(updatedEmojis);
            setEmojisInBuffer([]);
            setEmojisInBufferIndex([]);
            newEmojisinBuffer = [];
          }, 1000);
        }
        
      }
    }
  };

  useEffect(() => {
    setRandomEmojis(generateRandomEmojiArray(emojis));
  }, [emojis]);

  return (
    <div className='App'>
     
      {randomEmojis && randomEmojis.map((item,index) =>
            <div key={`emoji-${index}`} className='emojis-container'>
              {showEmojis[index]? <div className='emoji-box'>{emoji.getUnicode(item)}</div>: 
                <div 
                  className='empty-box'
                  onClick={revealEmoji}
                  data-idx={index}
                ></div>
              }
            </div>
      )}
    </div>
  );
}

export default App;
