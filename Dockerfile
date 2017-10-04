FROM node:8.6.0

COPY package.json /opt/app/
WORKDIR /opt/app
RUN ["npm", "install"]

COPY src/index.js /opt/app/
CMD ["node", "index.js"]

