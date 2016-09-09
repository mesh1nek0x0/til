FROM node:argon

# Create app Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependences
COPY package.json /usr/src/app
RUN npm install

# bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD ["npm", "start"]
