FROM node:19.3-alpine AS build
# # Set working directory.
RUN mkdir /usr/local/app
WORKDIR /usr/local/app

COPY package.json package-lock.json ./

# Install app dependencies.
RUN npm install

# # Copy app files.
COPY . .

# # Build app

RUN node_modules/.bin/ng build --configuration production

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist/nutmeg/ /usr/share/nginx/html