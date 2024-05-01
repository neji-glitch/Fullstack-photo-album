import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersView from "./views/UsersView";
import AlbumsView from "./views/AlbumsView";
import PhotoList from "./views/PhotoList";
import PhotoDetails from "./views/PhotoDetails";
import "./App.css";
import store from "./app/store";
import { Provider as ReduxProvider } from "react-redux";

const App = () => (
  <ReduxProvider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<UsersView />} />
        <Route path="/users/:userId/albums" element={<AlbumsView />} />
        <Route path="albums/:albumId/photos" element={<PhotoList />} />
        <Route
          path="/albums/:albumId/photos/:photoId"
          element={<PhotoDetails />}
        />
      </Routes>
    </Router>
  </ReduxProvider>
);

export default App;
