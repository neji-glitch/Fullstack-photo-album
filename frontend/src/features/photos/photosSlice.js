import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/albums/${albumId}/photos`
      );
      const jsonResponse = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      // Ensure the payload structure matches what the reducer expects
      return {
        photos: jsonResponse.data,
        count: jsonResponse.data.length,
        albumId: albumId, // Make sure this is correctly passed
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPhoto = createAsyncThunk(
  "albums/createPhoto",
  async (photoData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/albums/${photoData.albumId}/photos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photoData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to create photo, response:", response);
        throw new Error(data.message || "Could not create photo");
      }
      // Ensure this object is correctly formatted
      console.log("photo created:", data.data);
      return { photo: data.data, albumId: photoData.albumId }; // Make sure data.data contains the 'id'
    } catch (error) {
      console.error("Error in createPhoto:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPhotoById = createAsyncThunk(
  "photos/fetchPhotoById",
  async ({ photoData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/albums/${photoData.albumId}/photos/${photoData.photoId}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch photo details");
      }

      return data;
    } catch (error) {
      console.error("Error in createAlbum:", error);
      console.error("Received response:", error.response);
      return rejectWithValue(error.message);
    }
  }
);

export const deletePhoto = createAsyncThunk(
  "albums/deletePhoto",
  async ({ albumId, photoId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/albums/${albumId}/photos/${photoId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete photo");
      }
      return { albumId, photoId }; // Ensure albumId and photoId are well defined
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const photosSlice = createSlice({
  name: "photos",
  initialState: {
    //photos: [],
    photosByAlbum: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.photosByAlbum[action.payload.albumId] = {
          photos: action.payload.photos,
          count: action.payload.count,
        };
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        const { albumId, photoId } = action.meta.arg; // Ensure you pass albumId and photoId from the thunk
        if (state.photosByAlbum[albumId]) {
          state.photosByAlbum[albumId].photos = state.photosByAlbum[
            albumId
          ].photos.filter((photo) => photo.id !== photoId);
          state.photosByAlbum[albumId].count--; // Adjust the count accordingly
        }
        state.status = "succeeded";
        // Optionally, set a message indicating success
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        // Optionally, handle errors, such as updating state to show that deletion failed
        state.error = action.error.message;
      })
      .addCase(createPhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPhoto.fulfilled, (state, action) => {
        const { albumId, photo } = action.payload;
        if (!state.photosByAlbum[albumId]) {
          state.photosByAlbum[albumId] = { photos: [], count: 0 };
        }
        if (photo && photo.id) {
          // Check that photo and photo.id are defined
          state.photosByAlbum[albumId].photos.push(photo);
          state.photosByAlbum[albumId].count++;
        }
        state.status = "succeeded";
      })
      .addCase(createPhoto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchPhotoById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPhotoById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPhoto = action.payload; // Assuming you store it in `currentPhoto`
      })
      .addCase(fetchPhotoById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default photosSlice.reducer;
