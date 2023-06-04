# Use the specific Node.js version
FROM node:18.16.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose the port the app runs in
EXPOSE 8000

# Serve the app
CMD [ "npm", "start" ]