import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/types/thunk-api";
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
import {
  createConversationOneToOneService,
  createMessageService,
  getDetailsConversationOneToOneService,
  getListConversationService,
  getListMessageService,
} from "@/redux/conversation/conversation.service";

export const getListConversationOneToOne = createAsyncThunk<
  GetListConversationResponse,
  GetListConversationPayload,
  ThunkApiConfig
>("conversation/get-list-conversation", async (payload, { rejectWithValue }) => {
  try {
    const response: GetListConversationResponse = await getListConversationService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const getListMessage = createAsyncThunk<GetListMessageResponse, GetListMessagePayload, ThunkApiConfig>(
  "conversation/get-list-message",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetListMessageResponse = await getListMessageService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const createMessage = createAsyncThunk<CreateMessageResponse, CreateMessagePayload, ThunkApiConfig>(
  "conversation/create-message",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateMessageResponse = await createMessageService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const createConversationOneToOne = createAsyncThunk<
  CreateConversationOneToOneResponse,
  CreateConversationOneToOnePayload,
  ThunkApiConfig
>("conversation/create-conversation-one-to-one", async (payload, { rejectWithValue }) => {
  try {
    const response: CreateConversationOneToOneResponse = await createConversationOneToOneService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const getDetailsConversationOneToOne = createAsyncThunk<
  GetDetailsConversationOneToOneResponse,
  GetDetailsConversationOneToOnePayload,
  ThunkApiConfig
>("conversation/get-details-conversation-one-to-one", async (payload, { rejectWithValue }) => {
  try {
    const response: GetDetailsConversationOneToOneResponse = await getDetailsConversationOneToOneService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});
