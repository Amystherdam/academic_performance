FROM node:20-alpine

EXPOSE 3001

WORKDIR /academic_performance

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3001

CMD ["yarn", "run", "dev"]

