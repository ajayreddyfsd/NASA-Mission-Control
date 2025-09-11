## 📝 Project Notes: Full-Stack React & Node.js 🚀

### Project Structure & Setup

- The project is organized into **three main parts**: a `client` folder for the front end, a `server` folder for the back end, and the **root project folder** that contains both.
- **Each of these three folders has its own `package.json` file**.
- We'll eventually tweak the **root** `package.json` to run both the front end and back end simultaneously with a **single command**. To do this, we need to install the `concurrently` package.

---

### Front-End (Client)

- The `client` folder is just a standard React project.
- To run **just the front end**:
  1. `cd` into the `client` folder.
  2. Run `npm install` to install dependencies.
  3. Run `npm start` to start the project.

---

### Back-End (Server)

- The `server` folder is a standard Express MVC (Model-View-Controller) project.
- To run **just the back end**:
  1. `cd` into the `server` folder.
  2. Run `npm install` to install dependencies.
  3. Run `node server.js` to start the server.
  4. only to install dependenciess, we are cd-ing in to server, but just to run the backend, u need not cd, just run the server.js file in the server-folder

---

### Core Back-End Development

- Before you begin, navigate to the `server` folder.
- You'll need to install the following packages: `express`, `nodemon`, and `cors`.
- The main file for the back end is `server.js`. You'll run this specific file to start the server.
- Also, don't forget to set your MongoDB connection string in the `services/mongo.js` file:
  ```javascript
  const MONGO_URL = "mongodb://localhost:27017/";
  ```

---

### The `models` Folder (The 'M' of MVC)

- This folder is where all the **data- and database-related logic** lives.
- We created mongodb-collection-schemas for the `planetsCollection` and `launchesCollection`.
- In `planets.model.js`, we read a `.csv` file as a stream, filtered the planets, and stored them in the `planetsCollection`.
- In `launches.model.js`, we used `axios` to get data from an external API and saved each launch document to the `launchesCollection`.
- we are literally storing these in the local mongodb database, since we havent named the database anything, it might name it as "test"

---

### The `services` Folder

0. has 2 files, mongo.js and query,js
1. Handles MongoDB connection and disconnection, including acknowledging successful connections and errors.
2. This is where you need to provide the MongoDB connection string.
3. Contains code to facilitate **pagination**.

---

### The `routes` Folder (The 'C' of MVC)

- This is where we handle **API endpoints** and all `GET` and `POST` requests.
- The `routes` folder is essentially the **controllers folder**.
- Each API endpoint is typically made up of two files: a **controller file** and a **router file**.
  - The **controller file** contains the core controller functions.
  - The **router file** maps specific routes to these controller functions.
- Controllers and routers work together: the controller functions return data (like JSON, text, or HTML), and the router files organize these controller-functions by mapping them to specific routes. We usually have multiple controller-files and multiple router-files.
- Finally, in `app.js`, we "mount" these routers on specific-paths again so the server knows which router to use for which request.
  -but here in the code, what we will do is, we will make a helper to do this, api.js, and then use the api.js in app.js

---

### The `api.js` File (An `app.js` Helper)

- Remember how we import all the controller-based router files and define their routes again in app.js? We do that in `api.js`. This file acts as a central helper for `app.js`.

---

### The `app.js` File

- This file imports all necessary packages and sets up middleware.
- **Two important middleware packages are `cors` and `morgan`**:
  - `cors` is essential because our front end and back end run on different servers.
  - `morgan` is great for logging every request to the console.
- So, `app.js` is mainly for importing dependencies, setting up middleware, and including the `api.js` helper file. It also defines one last route to catch all the other possible routes.

---

### The `server.js` File

- **This is the file we run to start the server.**
- It contains the `startServer()` function.
- Anything you want to execute immediately after the server starts, like connecting to the database, should be placed inside this `startServer()` function.

---

### Running Front & Back End Together

- **Step 1:** Check the port the back-end is running on (from `server.js`) and the path it's mounted on (from `app.js`).
  - In our case, the back end is on port `8000` and is mounted on the `/v1` path.
  - This means your API URL is `http://localhost:8000/v1`. You can test this URL in Postman to make sure everything is working.
- **Step 2:** Use this exact URL as the API URL in your front-end code, specifically in `utils/requests.js`.
- **Step 3:**
  1. First, run the back end by running `server.js` file.
  2. Then, `cd` into the `client` folder and run `npm start` to run the front end.

---

### Running Both With a Single Command

- To simplify the process, you can use `concurrently`.
- In the **root** `package.json` file, add the following script:
  ```json
  "scripts": {
      "watch": "concurrently \"npm run server\" \"npm run client\""
  }
  ```
- Next, install `concurrently` as a development dependency:
  ```bash
  npm install --save-dev concurrently
  ```
- Now, you can run both the front end and back end with a single command:
  ```bash
  npm run watch
  ```

---

### Connecting to the Database

- All the database-related code is located in the `models` folder.
- Make sure MongoDB is running on your computer and open mongodb compass.
- Place the correct connection string in the `mongo.js` file in the back-end services folder.

---

### Toggling

- MONGO_URL: u can toggle between the local-mondb-db-storage-url and mongodb-atlas-cluster-storage-url
- Backend API URL to be used in front end: u can toggle between the urls "if u r running the application locally" or "though docker container"
