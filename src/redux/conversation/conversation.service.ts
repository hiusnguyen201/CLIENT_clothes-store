import { convertToSearchParams } from "@/utils/object";
import { apiInstance } from "@/redux/api";
import {
  CreateConversationOneToOnePayload,
  CreateConversationOneToOneResponse,
  CreateMessagePayload,
  CreateMessageResponse,
  GetDetailsConversationOneToOnePayload,
  GetDetailsConversationOneToOneResponse,
  GetListConversationPayload,
  GetListConversationResponse,
  GetListMessagePayload,
  GetListMessageResponse,
} from "@/redux/conversation/conversation.type";

export const getListConversationService = async (
  payload: GetListConversationPayload
): Promise<GetListConversationResponse> => {
  return await apiInstance.get(`/conversations/one-to-one?${convertToSearchParams(payload)}`);
};

export const getListMessageService = async (payload: GetListMessagePayload): Promise<GetListMessageResponse> => {
  return await apiInstance.get(`/conversations/${payload.conversationId}/messages?${convertToSearchParams(payload)}`);
};

export const createMessageService = async (payload: CreateMessagePayload): Promise<CreateMessageResponse> => {
  return await apiInstance.post(`/conversations/${payload.conversationId}/messages`, payload);
};

export const createConversationOneToOneService = async (
  payload: CreateConversationOneToOnePayload
): Promise<CreateConversationOneToOneResponse> => {
  return await apiInstance.post(`/conversations/one-to-one`, payload);
};

export const getDetailsConversationOneToOneService = async (
  payload: GetDetailsConversationOneToOnePayload
): Promise<GetDetailsConversationOneToOneResponse> => {
  return await apiInstance.get(`/conversations/${payload.conversationId}/details`);
};
