interface MessageInput {
  content: string;
  username: string;
  time: any;
}

interface MessageGroupProps {
  isMe: boolean;
  messages: Array<string>;
  senderName: string | null;
}

// TODO: write API get userInfo(secure later), write API get 10 newest message
const USERNAME = 'bozuman1'
export const newestMessage : Array<MessageGroupProps> = [{
  isMe: false,
  messages: ['Bozuman', 'Bozuman','Bozuman','lorem',],
  senderName: 'Sil'
}, {  isMe: false,
  messages: ['Bozuman', 'Bozuman','Bozuman','lorem','Bozuman', 'Bozuman','Bozuman','lorem',],
  senderName: 'Hung'}]

export function outputMessageInGroup (message: MessageInput) {
  // Get array of message by API, this function will update it on cliend whenever socket emit a event)
  if (checkSender(message)) {
    newestMessage[0].messages.push(message.content)
  } else {
    if (checkIsMe(message)) {
      newestMessage.unshift({
        isMe: true,
        messages: [message.content],
        senderName: USERNAME
      })
    } else {
      newestMessage.unshift({
        isMe: false,
        messages: [message.content],
        senderName: message.username
      })
    }
  }
    // TODO: identify message not rely on username, use it to query nickname or full name to show on page
  
}

const checkSender = (message: MessageInput) => {
  if (newestMessage[0].senderName === message.username){
    return true;
  }
  return false
}

const checkIsMe = (message: MessageInput) => {
  if (message.username === USERNAME){
    return true;
  }
  return false
}
