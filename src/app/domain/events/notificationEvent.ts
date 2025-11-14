export interface NotificationEvent {
  TargetId: string;
  UserRefId: string;
  Type: number;
  Message: string;
  Title: string;
  IsRead: boolean,
  Data: object;
}
