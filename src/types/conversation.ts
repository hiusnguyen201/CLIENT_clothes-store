import { User } from "@/types/user";

export type ConversationOneToOne = {
  id: string;
  avatar: null;
  name: null;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCountMap: Record<string, number>;
  participants: User[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ConversationUpdate = Pick<
  ConversationOneToOne,
  "id" | "lastMessage" | "lastMessageTime" | "unreadCountMap"
>;

export type Message = {
  id: string;
  conversation: string;
  sender: User;
  content: string;
  timestamp: Date;
  readBy: User[];
  createdAt: Date;
  updatedAt: Date;
};
