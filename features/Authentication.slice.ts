import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginService } from "../thunks/Auth";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface _doc {
  createdAt: string;
  email: string;
  firebaseUID: string;
  name: string;
  phone: string;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
interface Payload extends JwtPayload {
  _doc: _doc;
}

interface AuthState {
  isAuthenticated: boolean;
  role: string;
  token: string;
  loading: boolean;
  isError: boolean;
  message: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: "",
  token: "thisis the expected token",
  loading: true,
  isError: false,
  message: "",
};

const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    handleLogout(state, action: PayloadAction<string>) {},
    handleLogIn(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = true;
    },
    setRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginService.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginService.fulfilled, (state, action) => {
        state.loading = false;
        const decoded = jwtDecode<Payload>(action.payload);
        state.isAuthenticated = true;
        state.role = decoded._doc.role;
      })
      .addCase(loginService.rejected, (state, action) => {});
  },
});
export const { handleLogout, handleLogIn, setRole } =
  AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
