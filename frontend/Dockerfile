FROM node:16-alpine
WORKDIR /app/frontend
COPY . /app/frontend
RUN npm ci
RUN npm run build
CMD [ "npm", "start" ]