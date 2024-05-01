# **Fullstack Photo Album Application**

This repository contains a fullstack application with **React.js** as the frontend framework, using **Bootstrap** and **Ant Design** for styling, and **Node.js** for the backend. The data is stored in a **SQLite3** database.

## **Prerequisites**

Before you begin, ensure you have installed **Node.js** on your local machine. Node.js is required to run the backend and serve the frontend of the application.

## **Getting Started**

To get a local copy up and running follow these simple steps:

### **Cloning the Repository**

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/fullstack-photo-album.git
cd fullstack-photo-album

### **Installing Global Dependencies**
We need to start by installing the global dependecies you need to run :
npm install

### **Installing local Dependencies**
Install local dependencies for both the frontend and backend using the provided scripts:
npm run install-all
This command will navigate into both the frontend and backend directories and install necessary packages.


### **Running the Application**

Once the dependencies are installed, you can run both the frontend and backend simultaneously with the following command:
npm start
This command uses concurrently to run both the start-backend and start-frontend scripts defined in package.json.

### **Scripts Explained**

**start-backend**: Navigates to the backend directory and starts the Node.js server.
**start-frontend**: Navigates to the frontend directory and serves the React application.
**start**: Runs both the frontend and backend simultaneously.
**install-all**: Installs dependencies for both frontend and backend.
**install-backend**: Installs dependencies for the backend.
**install-frontend**: Installs dependencies for the frontend.

### ** Usage **
After starting the application, the frontend should be accessible via http://localhost:3000 and the backend will typically run on http://localhost:3001
