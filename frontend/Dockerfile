# STAGE 1: Build
FROM node:16.20.2-alpine AS builder
WORKDIR /usr/src/app

# 1. Копируем только файлы зависимостей для кеширования
COPY package.json package-lock.json ./

# 2. Устанавливаем зависимости (без openssl-legacy-provider)
RUN npm install

# 3. Копируем остальные файлы проекта
COPY . .

# 4. Собираем Angular приложение с явным указанием конфигурации
RUN npm run build

# STAGE 2: Run
FROM nginx:alpine

# 1. Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 2. Копируем собранное приложение из builder stage
COPY --from=builder /usr/src/app/dist/frontend /usr/share/nginx/html

# 3. Открываем порт 80
EXPOSE 80

# 4. Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
