import { createSlice } from "@reduxjs/toolkit";

export interface userInfo {
  username: string
  accessToken: any
}

const initialState: userInfo = {
  username: '',
  accessToken: null
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    changeCurrentUserInfoAction(
      state,
      {
        payload
      }: {
        payload: {
          username: string
          accessToken: any
        }
      }
    ) {
      state.username = payload.username
      state.accessToken = payload.accessToken
    }
  }
})

export const { changeCurrentUserInfoAction } = userInfoSlice.actions
export default userInfoSlice.reducer
