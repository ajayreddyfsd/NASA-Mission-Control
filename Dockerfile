#@ The whole purpose of this code is just to define some instructions to build a Docker-image.
#@ so these are just instructions. 
#@ when we combine these instructions with "docker build", we create the docker-image. 
#@ and when we run the created docker-image using "docker run", we create and start the docker-container.

# 1. Use an official Node.js base image (Alpine variant = lightweight Linux distro)
#! we are using a ready made base image from docker-hub, instead of reinventing the wheel
FROM node:lts-alpine

# 2. Set the working directory inside the container to /app.
# All subsequent commands (COPY, RUN, CMD, etc.) will run relative to this path.
WORKDIR /app

# 3. Bring in the list of libraries we need for the whole project
#! brings the root pkg.json and pkg-lock.json both
COPY package*.json ./

# 4. Bring in the list of libraries needed for the frontend (React app)
COPY client/package*.json client/

# 5. Install those frontend libraries (without developer-only tools)
RUN npm run install-client --omit=dev

# 6. Bring in the list of libraries needed for the backend (server)
COPY server/package*.json server/

# 7. Install those backend libraries (without developer-only tools)
RUN npm run install-server --omit=dev

# 8. Now bring all the frontend (React) code
COPY client/ client/

# 9. Build the React app → turns code into plain HTML, CSS, JS files
RUN npm run build --prefix client

# 10. Now bring all the backend (server) code
COPY server/ server/


# 11. Tell Docker: "Don’t run as boss/root, run as a normal-user for safety"
#! for some safety reasons and to prevent hacking, we need to run not as root but as normal-user
USER node

# 12. Say what to do when this container starts → run the server
#! when the container starts, this is the command that you must run first. which is "npm start --prefix server"
CMD [ "npm", "start", "--prefix", "server" ]

# 13. Open port number 8000 so people can connect to the server
#! why 8000? coz that is what we have used while coding backend
EXPOSE 8000
