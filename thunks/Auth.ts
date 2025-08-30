import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

export const loginService = createAsyncThunk(
  "loginService",
  async (_, thunkAPI) => {
    const abortController = new AbortController();

    const response = await fetch(`/api/login`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      credentials: "include",
      method: "POST",
    });

    const data = await response.json();
    if (!data) {
      abortController.abort();
      return thunkAPI.rejectWithValue("empty response ");
    }
    const oneWeek = 24 * 60 * 60 * 1000 * 7;
    setCookie("jwtToken", data, { maxAge: Date.now() + oneWeek });
    return data;
  }
);
