<<<<<<< HEAD
FROM node:20.15.1

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

=======
FROM node:20.15.1

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

>>>>>>> eb23958e391158a0d5bd4c45f56dbbc3e1867de0
CMD ["yarn", "start"]