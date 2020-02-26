FROM node:12.11.1-alpine

#RUN npx create-react-app app --typescript

COPY ./client/package.json ./client/yarn.lock /app/

WORKDIR /app

RUN yarn install

COPY ./client /app/

EXPOSE 3000

CMD ["yarn", "start"]
