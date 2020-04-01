FROM stefanscherer/node-windows:nanoserver as install

WORKDIR /repo
ADD package*.json ./
RUN npm ci
ADD *.config.js ./

ENTRYPOINT npm start -- --disable-host-check -d --mode development --host 0.0.0.0 --watch-poll

# FROM install as build
# ADD . .
# RUN npm build