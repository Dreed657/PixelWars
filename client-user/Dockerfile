FROM node:16-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install --quiet
COPY ./ /app/
ENV REACT_APP_BASE_REST_URL=http://localhost:3000/v1
RUN npm run build

FROM nginx:1.21
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
