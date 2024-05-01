import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAlbums = createAsyncThunk(
  "albums/fetchAlbums",
  async (userId) => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/albums`
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    return jsonResponse.data;
  }
);

export const deleteAlbum = createAsyncThunk(
  "albums/deleteAlbum",
  async ({ userId, albumId }) => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/albums/${albumId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete album");
    }
    return albumId;
  }
);

// Async thunk for creating an album
export const createAlbum = createAsyncThunk(
  "albums/createAlbum",
  async (albumData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${albumData.userId}/albums`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(albumData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to create album, response:", response);
        throw new Error(data.message || "Could not create album");
      }

      console.log(
        "Album created:",
        data.data.id,
        data.data.title,
        data.data.userId
      );
      console.log("Album created:", data);
      return data.data;
    } catch (error) {
      console.error("Error in createAlbum:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating an album
export const updateAlbum = createAsyncThunk(
  "albums/updateAlbum",
  async ({ userId, albumId, albumData }, { rejectWithValue }) => {
    console.log("ids: ", userId, albumId);
    console.log("album data: ", albumData);
    try {
      const response = await fetch(
        `http://localhost:3001/users/${albumData.userId}/albums/${albumData.albumId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(albumData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Could not update album");
      }
      console.log("yalaaa", data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    albums: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.albums = state.albums.filter(
          (album) => album.id !== action.payload
        );
      })
      .addCase(deleteAlbum.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createAlbum.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.albums.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createAlbum.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateAlbum.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        const index = state.albums.findIndex(
          (album) => album.id === action.payload.id
        );
        if (index !== -1) {
          state.albums[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(updateAlbum.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default albumsSlice.reducer;
