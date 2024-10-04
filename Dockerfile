# Stage 1: Build the React app
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
CMD ["yarn", "dev"]