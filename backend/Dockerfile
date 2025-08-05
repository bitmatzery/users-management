# Используем более стабильную версию Node.js
FROM node:20-alpine AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
# Устанавливаем зависимости
RUN npm install
# Собираем приложение
RUN npm run build

# Используем ту же стабильную версию Node.js для финального образа
FROM node:20-alpine
WORKDIR /app
# Копируем собранное приложение из этапа сборки
COPY --from=builder /app ./
# Открываем порт приложения
EXPOSE 4001
# Запускаем приложение
CMD ["npm", "run", "start:prod"]
