FROM node:8-slim

ENV port=3000

WORKDIR /server

COPY . /server

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
