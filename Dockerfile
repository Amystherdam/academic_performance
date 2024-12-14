FROM node:18-alpine

EXPOSE 3001

WORKDIR /academic_performance

COPY package.json ./

RUN yarn install

COPY . .

CMD ["yarn", "run", "dev"]

