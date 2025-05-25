import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {
  GetListConversationResponse,
  ConversationState,
  GetListMessageResponse,
  GetDetailsConversationOneToOneResponse,
} from "@/redux/conversation/conversation.type";
import {
  getDetailsConversationOneToOne,
  getListConversationOneToOne,
  getListMessage,
} from "@/redux/conversation/conversation.thunk";
import { ConversationOneToOne, ConversationUpdate, Message } from "@/types/conversation";

const initialState: ConversationState = {
  loading: {
    getListConversationOneToOne: false,
    getListMessage: false,
    getDetailsConversationOneToOne: false,
  },
  list: {
    oneToOne: [],
    messages: [],
  },
  item: {
    oneToOne: null,
  },
  totalCount: {
    oneToOne: 0,
    messages: 0,
  },
  error: null,
};

const auditLogSlice = createSlice({
  name: "auditLog",
  initialState,
  reducers: {
    addMessage(state: Draft<ConversationState>, action: PayloadAction<Message>) {
      state.list.messages.push(action.payload);
    },
    addConversationOneToOne(state: Draft<ConversationState>, action: PayloadAction<ConversationOneToOne>) {
      state.list.oneToOne.push(action.payload);
    },
    addMessages(state: Draft<ConversationState>, action: PayloadAction<Message[]>) {
      state.list.messages.push(...action.payload);
    },
    updateConversation(state: Draft<ConversationState>, action: PayloadAction<ConversationUpdate>) {
      state.list.oneToOne = state.list.oneToOne.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ConversationState>) => {
    builder
      // Get List Conversation One to One
      .addCase(getListConversationOneToOne.pending, (state: Draft<ConversationState>) => {
        state.loading.getListConversationOneToOne = true;
        state.error = null;
      })
      .addCase(
        getListConversationOneToOne.fulfilled,
        (state: Draft<ConversationState>, action: PayloadAction<GetListConversationResponse>) => {
          const { data } = action.payload;
          state.loading.getListConversationOneToOne = false;
          state.error = null;
          state.list.oneToOne = data.list;
          state.totalCount.oneToOne = data.totalCount;
        }
      )
      .addCase(getListConversationOneToOne.rejected, (state: Draft<ConversationState>, action: PayloadAction<any>) => {
        state.loading.getListConversationOneToOne = false;
        state.error = action.payload as string;
        state.list.oneToOne = [];
        state.totalCount.oneToOne = 0;
      });

    builder
      // Get List Message
      .addCase(getListMessage.pending, (state: Draft<ConversationState>) => {
        state.loading.getListMessage = true;
        state.error = null;
      })
      .addCase(
        getListMessage.fulfilled,
        (state: Draft<ConversationState>, action: PayloadAction<GetListMessageResponse>) => {
          const { data } = action.payload;
          state.loading.getListMessage = false;
          state.error = null;
          state.list.messages = data.list;
          state.totalCount.messages = data.totalCount;
        }
      )
      .addCase(getListMessage.rejected, (state: Draft<ConversationState>, action: PayloadAction<any>) => {
        state.loading.getListMessage = false;
        state.error = action.payload as string;
        state.list.messages = [];
        state.totalCount.messages = 0;
      });

    builder
      // Get Details Conversation One to One
      .addCase(getDetailsConversationOneToOne.pending, (state: Draft<ConversationState>) => {
        state.loading.getDetailsConversationOneToOne = true;
        state.error = null;
      })
      .addCase(
        getDetailsConversationOneToOne.fulfilled,
        (state: Draft<ConversationState>, action: PayloadAction<GetDetailsConversationOneToOneResponse>) => {
          const { data } = action.payload;
          state.loading.getDetailsConversationOneToOne = false;
          state.error = null;
          state.item.oneToOne = data;
        }
      )
      .addCase(
        getDetailsConversationOneToOne.rejected,
        (state: Draft<ConversationState>, action: PayloadAction<any>) => {
          state.loading.getDetailsConversationOneToOne = false;
          state.error = action.payload as string;
          state.item.oneToOne = null;
        }
      );
  },
});

export const { addMessage, updateConversation, addConversationOneToOne, addMessages } = auditLogSlice.actions;

export default auditLogSlice.reducer;
