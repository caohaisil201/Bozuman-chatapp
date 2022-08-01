import React, { useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

function InputMessage({clickHandle} : any) {
  const [inputValue, setinputValue] = useState<string>('');
  const handleChange = (event: any) => {
    setinputValue(event.target.value);
  };
  const onClickHandle = () => {
    clickHandle(inputValue)
    setinputValue('')
  }
  return (
    <div className="chatBox__input">
      <input
        placeholder="Type your message"
        value={inputValue}
        onChange={handleChange}
      />
      <FaTelegramPlane className="buttonIcon" onClick={onClickHandle} />
    </div>
  );
}

export default InputMessage;
