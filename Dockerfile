FROM node:10-alpine as builder

COPY package.json package-lock.json ./

RUN npm install && mkdir /src && mv ./node_modules ./src

WORKDIR /src

COPY . .

RUN npm run build


FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /src /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]