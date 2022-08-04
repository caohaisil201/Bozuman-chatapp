import React, { useState } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

function InputMessage({ clickHandle }: any) {
  const [inputValue, setinputValue] = useState<string>('');
  const handleChange = (event: any) => {
    setinputValue(event.target.value);
  };

  const onClickHandle = () => {
    if (inputValue !== '') {
      clickHandle(inputValue);
      setinputValue('');
    }
  };

  const press = (event: any) => {
    if (event.key === 'Enter' && inputValue !== '') {
      clickHandle(inputValue.trim());
      setinputValue('');
    }
  };

  return (
    <div className="chatBox__input">
      <input
        placeholder="Type your message"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={press}
      />
      <FaTelegramPlane className="buttonIcon" onClick={onClickHandle} />
    </div>
  );
}

export default InputMessage;
