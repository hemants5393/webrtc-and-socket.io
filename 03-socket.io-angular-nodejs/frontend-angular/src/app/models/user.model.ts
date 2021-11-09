export interface User {
  name: string;
  id: string;
}

export interface MessageData {
  message: string;
  sender: User;
  receiver: User;
  isSender?: boolean
}
