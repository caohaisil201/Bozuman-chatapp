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
    pushMessageToTop(message, saveMessage);
  } else {
    if (checkSender(message, saveMessage, false)) {
      saveMessage[saveMessage.length - 1].messages.unshift(message.content);
    } else {
      pushMessageToTop(message, saveMessage);
    }
  }
}
// Call this function when recive a new message
export function pushNewMessage(
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>
) {
  if (checkIsFirstMessage(saveMessage)) {
    pushMessageToBottom(message, saveMessage);
  } else {
    if (checkSender(message, saveMessage, true)) {
      saveMessage[0].messages.push(message.content);
    } else {
      pushMessageToBottom(message, saveMessage);
    }
  }
  // TODO: identify message not rely on username, use it to query nickname or full name to show on page
}

const checkIsFirstMessage = (saveMessage: Array<MessageGroupProps>) => {
  if (!saveMessage[0]) {
    return true;
  }
  return false;
};

const checkSender = (
  message: MessageInput,
  saveMessage: Array<MessageGroupProps>,
  isNew: boolean,
) => {
  if (isNew) {
    if (saveMessage[0].sender === message.sender) {
      return true;
    }
    return false;
  } else {
    if (saveMessage[saveMessage.length - 1].sender === message.sender) {
      return true;
    }
    return false;
  }

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
