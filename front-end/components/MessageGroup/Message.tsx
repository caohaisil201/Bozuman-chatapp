import React from 'react';

type Props = {
  content: string;
};

function Message({ content }: Props) {
  return (
    <div className="message">
      <p className="message__content">{content}</p>
    </div>
  );
}

export default Message;
