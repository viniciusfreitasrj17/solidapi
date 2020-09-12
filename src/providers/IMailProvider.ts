export interface IAdderss {
  email: string;
  name: string;
}

export interface IMessage {
  to: IAdderss;
  from: IAdderss;
  subject: string;
  body: string;
}

export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>;
}
