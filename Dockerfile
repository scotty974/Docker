# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=18.20.2

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

RUN npm i -g prisma

RUN npx prisma init

# Copy the rest of the source files into the image.
COPY . .

RUN prisma generate

# Expose the port that the application listens on.
EXPOSE 4500
# Run the application as a non-root user.
USER node
# Run the application.
CMD ["node", "app.js"]
