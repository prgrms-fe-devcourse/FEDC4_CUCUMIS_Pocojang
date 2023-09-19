export interface RequestGetMessagesType {
  userId: string;
}

export interface RequestSendMessagesType {
  message: string;
  receiver: string;
}

export interface RequestReadMessagesType {
  sender: string;
}
