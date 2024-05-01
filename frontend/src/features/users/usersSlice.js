import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://localhost:3001/users");
  const jsonResponse = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return jsonResponse.data; // Ensure to return the data array here
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
});

// Async thunk for updating a user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, user }) => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  }
);

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE",
  });
  return id;
});

// Slice definition
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
