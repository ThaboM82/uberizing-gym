FROM node:13-alpine

WORKDIR /app

COPY ./server /app/

RUN npm install && npm audit fix

EXPOSE 3030

CMD [ "npm", "start" ]
