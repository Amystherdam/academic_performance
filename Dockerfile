FROM node

EXPOSE 3001

WORKDIR /academic_performance

COPY package.json ./

RUN yarn install

COPY . .

CMD ["yarn", "run", "dev"]

