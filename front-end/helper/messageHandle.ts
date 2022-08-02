import { getCookie } from 'cookies-next';
export interface MessageInput {
  content: string;
  sender: string;
  time: any;
  room_id: number;
}

export interface MessageGroupProps {
  isMe: boolean;
  messages: Array<string>;
  sender: string | undefined;
}



export function pushOldMessage(
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>,
  username: string | undefined
) {
  if (checkIsFirstMessage(saveMessage)) {
    return pushMessageToTop(message, saveMessage, username);
  }
  if (checkIsSameSender(message, saveMessage, false)) {
    const LAST_ELEMENT = saveMessage.length - 1;
    return saveMessage[LAST_ELEMENT].messages.unshift(message.content);
  }
  return pushMessageToTop(message, saveMessage, username);
}

export function pushNewMessage(
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>,
  username: string | undefined
) {
  if (checkIsFirstMessage(saveMessage)) {
    
    return pushMessageToBottom(message, saveMessage, username);
  }
  if (checkIsSameSender(message, saveMessage, true)) {
    return saveMessage[0].messages.push(message.content);
  }
  return pushMessageToBottom(message, saveMessage, username);
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

const checkIsMe = (message: MessageInput, username: string | undefined) => {
  if (message.sender === username) {
    return true;
  }
  return false;
};

const pushMessageToBottom = (
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>,
  username: string | undefined
) => {
  saveMessage.unshift({
    isMe: checkIsMe(message, username),
    messages: [message.content],
    sender: checkIsMe(message, username) ? username : message.sender,
  });
};

const pushMessageToTop = (
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>,
  username: string | undefined
) => {
  saveMessage.push({
    isMe: checkIsMe(message, username),
    messages: [message.content],
    sender: checkIsMe(message, username) ? username : message.sender,
  });
};
