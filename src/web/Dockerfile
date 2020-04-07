FROM node:12 as install
#FROM stefanscherer/node-windows:12 as install

WORKDIR /repo
ADD package*.json ./
RUN npm ci
ADD *.config.js ./

ENTRYPOINT npm start -- --disable-host-check -d --mode development --host 0.0.0.0 --watch-poll --port 8082 --public localhost:8082

# FROM install as build
# ADD . .
# RUN npm build