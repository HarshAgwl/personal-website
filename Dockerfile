FROM node:14.13.1-alpine

RUN apk --no-cache add ca-certificates

WORKDIR /usr/app/client/

COPY ./client/package.json ./
COPY ./client/yarn.lock ./
RUN yarn install

COPY ./client ./
RUN yarn build

WORKDIR /usr/app/server/

COPY ./server ./
RUN yarn install 

RUN yarn global add nodemon

ARG DB_CONNECTION_URL
ENV DB_CONNECTION_URL=${DB_CONNECTION_URL}

ARG ADMIN_PASSWORD
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

CMD ["nodemon", "index.js"]