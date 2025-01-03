FROM mcr.microsoft.com/playwright:v1.49.0-jammy

ENV TZ="Europe/Warsaw"
RUN date

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

ENTRYPOINT ["npm", "start"]