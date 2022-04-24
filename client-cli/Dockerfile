FROM node:16-alpine

COPY package.json .
COPY . .

RUN npm install --quiet

CMD ["npm", "start"]