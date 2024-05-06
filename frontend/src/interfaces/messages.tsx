export interface IConversation {
  messages: IMessage[];
  recipients: [];
  selected?: boolean;
}

export interface IFormattedConversation {
  messages: IMessage[];
  recipients: { id: string; name: string }[];
  selected?: boolean;
}

export interface IMessage {
  sender: string;
  text: string;
  senderName?: string[];
  fromMe?: boolean;
}
