FROM node:14-alpine
RUN apk add --no-cache ffmpeg
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . .
RUN yarn webpack --mode production
