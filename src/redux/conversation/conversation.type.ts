import { Nullable } from "@/types/common";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";
import { ConversationOneToOne, Message } from "@/types/conversation";

/**
 * State
 */
export interface ConversationState {
  loading: {
    getListConversationOneToOne: boolean;
    getListMessage: boolean;
    getDetailsConversationOneToOne: boolean;
  };
  list: {
    oneToOne: ConversationOneToOne[];
    messages: Message[];
  };
  item: {
    oneToOne: Nullable<ConversationOneToOne>;
  };
  totalCount: {
    oneToOne: number;
    messages: number;
  };
  error: Nullable<string>;
}

/**
 * Get List Conversation
 */
export interface GetListConversationPayload extends GetListParams<ConversationOneToOne> {}
export interface GetListConversationResponse extends GetListResponseData<ConversationOneToOne> {}

/**
 * Get List Message
 */
export interface GetListMessagePayload extends GetListParams<Message> {
  conversationId: string;
}
export interface GetListMessageResponse extends GetListResponseData<Message> {}

/**
 * Create Message
 */
export interface CreateMessagePayload {
  conversationId: string;
  content: string;
}
export interface CreateMessageResponse extends BaseResponse<Message> {}

/**
 * Create Conversation one to one
 */
export interface CreateConversationOneToOnePayload {
  participantId: string;
}
export interface CreateConversationOneToOneResponse extends BaseResponse<ConversationOneToOne> {}

/**
 * Get Details Conversation one to one
 */
export interface GetDetailsConversationOneToOnePayload {
  conversationId: string;
}
export interface GetDetailsConversationOneToOneResponse extends BaseResponse<ConversationOneToOne> {}
