export interface Notificacion {
  id: string;
  type: string;
  title: string;
  message: string;
  senderId: string;
  senderName: string;
  targetUserId: string;
  relatedEntityId: string;
  createdAt: Date;
  isRead: boolean;
  data: any;
}
