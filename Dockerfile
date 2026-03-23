# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ARG VITE_EMAIL_SERVICE_ID
ARG VITE_EMAIL_TEMPLATE_ID
ARG VITE_EMAIL_PUBLIC_KEY
ENV VITE_EMAIL_SERVICE_ID=$VITE_EMAIL_SERVICE_ID
ENV VITE_EMAIL_TEMPLATE_ID=$VITE_EMAIL_TEMPLATE_ID
ENV VITE_EMAIL_PUBLIC_KEY=$VITE_EMAIL_PUBLIC_KEY
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
