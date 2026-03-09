FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
ARG VITE_API_URL=/api
ARG VITE_BRAIN_API_URL=/brain-api
ARG VITE_NEXUS_API_URL=/nexus
ARG VITE_NEXUS_API_KEY
ARG VITE_NEXUS_PARTNER_UUID
ARG VITE_NEXUS_REDIRECT_URL=https://admin.alphagoinside.com.br/accountDiscovery
ENV VITE_API_URL=$VITE_API_URL \
    VITE_BRAIN_API_URL=$VITE_BRAIN_API_URL \
    VITE_NEXUS_API_URL=$VITE_NEXUS_API_URL \
    VITE_NEXUS_API_KEY=$VITE_NEXUS_API_KEY \
    VITE_NEXUS_PARTNER_UUID=$VITE_NEXUS_PARTNER_UUID \
    VITE_NEXUS_REDIRECT_URL=$VITE_NEXUS_REDIRECT_URL
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
