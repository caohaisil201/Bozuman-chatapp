import React from 'react';

type Props = {
  content: string;
};

function Message({ content }: Props) {
  return (
    <div className="messageGroup__message">
      <p className="messageGroup__message--content">{content}</p>
    </div>
  );
}

export default Message;
