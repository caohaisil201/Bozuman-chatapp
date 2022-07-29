import useGetUserInfo from 'hooks/useGetUserInfo';

export interface MessageInput {
  content: string;
  sender: string;
  time: any;
}

export interface MessageGroupProps {
  isMe: boolean;
  messages: Array<string>;
  sender: string;
}

// const userData = useGetUserInfo()
const USERNAME = 'Hung';
// Call this function when scroll up to get old messgage
export function pushOldMessage(
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>
) {
  if (checkIsFirstMessage(saveMessage)) {
    return pushMessageToTop(message, saveMessage);
  }
  if (checkIsSameSender(message, saveMessage, false)) {
    const LAST_ELEMENT = saveMessage.length - 1;
    return saveMessage[LAST_ELEMENT].messages.unshift(message.content);
  }
  return pushMessageToTop(message, saveMessage);
}
// Call this function when recive a new message
export function pushNewMessage(
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>
) {
  if (checkIsFirstMessage(saveMessage)) {
    return pushMessageToBottom(message, saveMessage);
  }
  if (checkIsSameSender(message, saveMessage, true)) {
    return saveMessage[0].messages.push(message.content);
  }
  return pushMessageToBottom(message, saveMessage);
}

const checkIsFirstMessage = (saveMessage: Array<MessageGroupProps>) => {
  if (!saveMessage[0]) {
    return true;
  }
  return false;
};

const checkIsSameSender = (
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>,
  isNew: boolean
) => {
  if (isNew) {
    if (saveMessage[0].sender === message.sender) {
      return true;
    }
  } else {
    if (saveMessage[saveMessage.length - 1].sender === message.sender) {
      return true;
    }
  }
  return false;
};

const checkIsMe = (message: MessageInput) => {
  if (message.sender === USERNAME) {
    return true;
  }
  return false;
};

const pushMessageToBottom = (
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>
) => {
  if (checkIsMe(message)) {
    saveMessage.unshift({
      isMe: true,
      messages: [message.content],
      sender: USERNAME,
    });
  } else {
    saveMessage.unshift({
      isMe: false,
      messages: [message.content],
      sender: message.sender,
    });
  }
};

const pushMessageToTop = (
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>
) => {
  if (checkIsMe(message)) {
    saveMessage.push({
      isMe: true,
      messages: [message.content],
      sender: USERNAME,
    });
  } else {
    saveMessage.push({
      isMe: false,
      messages: [message.content],
      sender: message.sender,
    });
  }
};
