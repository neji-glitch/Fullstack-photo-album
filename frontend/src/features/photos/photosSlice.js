import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*Retrieves a list of photos from a specific album using a GET request. If successful, it organizes the photos along 
with their count into a structured format to update the Redux state, facilitating efficient data access and manipulation.*/
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

      return {
        photos: jsonResponse.data,
        count: jsonResponse.data.length,
        albumId: albumId,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/*Handles the creation of a new photo via a POST request. It expects photoData containing necessary information
 like albumId. If the operation is successful, the new photo details are added to the state, 
enhancing the user experience by allowing for immediate interaction with the newly added photo.*/

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

      console.log("photo created:", data.data);
      return { photo: data.data, albumId: photoData.albumId };
    } catch (error) {
      console.error("Error in createPhoto:", error);
      return rejectWithValue(error.message);
    }
  }
);
/*Fetches detailed information about a specific photo through a GET request using photo and album identifiers. 
Successful data retrieval updates the state to include this detailed photo data, which can be used for displaying
 or editing the photo in the UI.*/
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
/* Implements the deletion of a specific photo via a DELETE request. On successful deletion, the photo is removed 
from the state, ensuring the UI remains in sync with the backend without requiring a full 
page reload or re-fetch of data.*/
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
/*The slice's extraReducers manage the state transitions based on the lifecycle of these asynchronous actions—loading,
 success, and failure—allowing the application to respond dynamically to changes in the state 
 (e.g., showing loading indicators, updating UI elements upon success, or handling errors).*/
const photosSlice = createSlice({
  name: "photos",
  initialState: {
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
        const { albumId, photoId } = action.meta.arg;
        if (state.photosByAlbum[albumId]) {
          state.photosByAlbum[albumId].photos = state.photosByAlbum[
            albumId
          ].photos.filter((photo) => photo.id !== photoId);
          state.photosByAlbum[albumId].count--;
        }
        state.status = "succeeded";
      })
      .addCase(deletePhoto.rejected, (state, action) => {
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
