FROM node


WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 9090

CMD ["npm","run","dev"]