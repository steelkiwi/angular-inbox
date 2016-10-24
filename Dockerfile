FROM node:4.6.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install -g bower
RUN npm install
RUN bower install --allow-root
RUN npm run build

EXPOSE 3000
EXPOSE 3001

CMD [ "npm", "run", "serve:dist" ]
