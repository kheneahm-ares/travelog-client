#build stage
FROM node:alpine as builder
WORKDIR /app

#first copy our package json to be smart about cache
COPY ./travelog-client/package.json ./
RUN npm install --legacy-peer-deps

#copy everything and produce a build
COPY travelog-client .
RUN npm run build

#explicitly expose port 3000 and copy our build to the root specified
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html