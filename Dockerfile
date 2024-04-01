FROM node:lts-hydrogen

WORKDIR /

RUN npm install

EXPOSE 3000

CMD [ "nmp", "run", "dev" ]