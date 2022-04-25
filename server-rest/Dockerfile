FROM node:16-alpine

COPY package.json .
COPY . .

RUN npm install --quiet & npm run swagger-gen & npx prisma generate 

CMD ["npm", "start"]
