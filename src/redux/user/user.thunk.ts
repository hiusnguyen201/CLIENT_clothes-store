import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkEmailExistService,
  createUserService,
  editListUserPermissionsService,
  editUserInfoService,
  exportListUserExcelService,
  getListUserPermissionsService,
  getListUserService,
  getUserService,
  liveImportListUserExcelService,
  removeUserService,
  resetPasswordUserService,
  testImportListUserExcelService,
} from "@/redux/user/user.service";
import {
  CheckEmailExistPayload,
  CheckEmailExistResponse,
  CreateUserPayload,
  CreateUserResponse,
  EditListUserPermissionsPayload,
  EditListUserPermissionsResponse,
  EditUserInfoPayload,
  EditUserInfoResponse,
  ExportListUserExcelResponse,
  GetListUserPayload,
  GetListUserPermissionsPayload,
  GetListUserPermissionsResponse,
  GetListUserResponse,
  GetUserPayload,
  GetUserResponse,
  ImportListUserPayload,
  LiveImportListUserResponse,
  RemoveUserPayload,
  RemoveUserResponse,
  ResetPasswordUserPayload,
  ResetPasswordUserResponse,
  TestImportListUserResponse,
} from "@/redux/user/user.type";
import { ThunkApiConfig } from "@/types/thunk-api";
import { downloadFileBlob } from "@/utils/object";

export const createUser = createAsyncThunk<CreateUserResponse, CreateUserPayload, ThunkApiConfig>(
  "user/create-user",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateUserResponse = await createUserService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListUser = createAsyncThunk<GetListUserResponse, GetListUserPayload, ThunkApiConfig>(
  "user/get-list-user",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetListUserResponse = await getListUserService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const exportListUserExcel = createAsyncThunk<void, GetListUserPayload, ThunkApiConfig>(
  "user/export-list-user-excel",
  async (payload, { rejectWithValue }) => {
    try {
      const data: ExportListUserExcelResponse = await exportListUserExcelService(payload);
      downloadFileBlob(data, "users-list.xlsx");
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const testImportListUser = createAsyncThunk<TestImportListUserResponse, ImportListUserPayload, ThunkApiConfig>(
  "user/test-import-list-user",
  async (payload, { rejectWithValue }) => {
    try {
      const response: TestImportListUserResponse = await testImportListUserExcelService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const liveImportListUser = createAsyncThunk<LiveImportListUserResponse, ImportListUserPayload, ThunkApiConfig>(
  "user/live-import-list-user",
  async (payload, { rejectWithValue }) => {
    try {
      const response: LiveImportListUserResponse = await liveImportListUserExcelService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk<GetUserResponse, GetUserPayload, ThunkApiConfig>(
  "user/get-user",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetUserResponse = await getUserService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const editUserInfo = createAsyncThunk<EditUserInfoResponse, EditUserInfoPayload, ThunkApiConfig>(
  "user/edit-user-info",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetUserResponse = await editUserInfoService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const removeUser = createAsyncThunk<RemoveUserResponse, RemoveUserPayload, ThunkApiConfig>(
  "user/remove-user",
  async (payload, { rejectWithValue }) => {
    try {
      const response: RemoveUserResponse = await removeUserService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const checkEmailExist = createAsyncThunk<CheckEmailExistResponse, CheckEmailExistPayload, ThunkApiConfig>(
  "user/check-user-name-exist",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CheckEmailExistResponse = await checkEmailExistService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListUserPermissions = createAsyncThunk<
  GetListUserPermissionsResponse,
  GetListUserPermissionsPayload,
  ThunkApiConfig
>("user/get-list-user-permissions", async (filters, { rejectWithValue }) => {
  try {
    const response: GetListUserPermissionsResponse = await getListUserPermissionsService(filters);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const editListUserPermissions = createAsyncThunk<
  EditListUserPermissionsResponse,
  EditListUserPermissionsPayload,
  ThunkApiConfig
>("user/edit-list-user-permissions", async (payload, { rejectWithValue }) => {
  try {
    const response: EditListUserPermissionsResponse = await editListUserPermissionsService(payload);
    return response;
  } catch (e: any) {
    const message: string = e?.response?.data?.message || e.message || e.toString();
    return rejectWithValue(message);
  }
});

export const resetPasswordUser = createAsyncThunk<ResetPasswordUserResponse, ResetPasswordUserPayload, ThunkApiConfig>(
  "user/reset-password",
  async (payload, { rejectWithValue }) => {
    try {
      const response: ResetPasswordUserResponse = await resetPasswordUserService(payload);
      return response;
    } catch (e: any) {
      const message: string = e?.response?.data?.message || e.message || e.toString();
      return rejectWithValue(message);
    }
  }
);
