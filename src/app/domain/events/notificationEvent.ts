export interface NotificationEvent {
  targetId: string;
  userRefId: string;
  type: number;
  message: string;
  title: string;
  IsRead: boolean,
  Data: object;
}
