import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* This thunk fetches user data from the API. 
If the fetch is successful, it updates the Redux state with the user data; if it fails, it throws an error. */
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://localhost:3001/users");
  const jsonResponse = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return jsonResponse.data;
});

/*Manages the state of users with initial settings of an empty user list, idle status, and no errors. The fetchUsers.
fulfilled action updates the state with the fetched user data upon successful API calls.*/
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
