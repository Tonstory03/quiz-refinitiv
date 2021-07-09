FROM node:12-alpine as clientBuilder
WORKDIR /usr/src/client
COPY client/package*.json ./
RUN yarn
COPY client . 
RUN npm run build


FROM node:12-alpine AS apiBuilder 
WORKDIR /usr/src/api
COPY api/package*.json ./
RUN yarn
RUN mkdir public
COPY --from=clientBuilder /usr/src/client/build /usr/src/api/public
COPY api . 
EXPOSE 8080
CMD yarn start
