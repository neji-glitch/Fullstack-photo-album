import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import albumsReducer from "../features/albums/albumsSlice";
import photosReducer from "../features/photos/photosSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    albums: albumsReducer,
    photos: photosReducer,
  },
});

export default store;
