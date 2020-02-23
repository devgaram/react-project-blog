FROM node:12.14
LABEL maintainer="joingaram@gmail.com"
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --network-timeout 1000000

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]