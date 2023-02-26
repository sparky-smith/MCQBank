FROM node:latest
RUN npm install nodemon -g
WORKDIR /usr/src/app
ADD package.json /usr/src/app/package.json
RUN npm install
COPY . .
CMD ["npm", "start"]