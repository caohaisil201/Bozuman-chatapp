import React from 'react';

type Props = {
  content: string;
};

function Message({ content }: Props) {
  return (
    <div className="messageGroup__messageContainer--message">
      <p className="messageGroup__messageContainer--message--content">{content}</p>
    </div>
  );
}

export default Message;
