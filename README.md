<div align="center">Users Management Application</div>

## <div align="center">📝 Описание проекта</div>

Это полнофункциональное приложение для управления пользователями, построенное на современном стеке технологий:

### 🏗 Архитектура

#### Frontend: Angular 12, Apollo Client (GraphQL)

#### Backend: NestJS, TypeORM, PostgreSQL

#### Интерфейс: Bootstrap 5, иконки Bootstrap Icons

#### Приложение позволяет просматривать, создавать, редактировать и удалять пользователей с валидацией данных и обработкой ошибок.

### ✨ Основные функции

<div style="line-height: 2.5;">

📋 **Список всех пользователей**  
👤 **Просмотр детальной информации**  
✏️ **Редактирование данных**  
➕ **Создание новых пользователей**  
🗑️ **Удаление пользователей**  
🔍 **Валидация данных** (клиент + сервер)  
⏳ **Индикаторы загрузки**  
🛠️ **Обработка ошибок**

</div>

## 🛠 Технологический стек

### <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="20" style="vertical-align: middle;" alt="Angular Logo"> Frontend

<table>
  <tr>
    <td style="text-align: center; padding: 10px;">
      <img src="https://img.shields.io/badge/Angular-12-DD0031?logo=angular" height="25" alt="Angular 12"><br>
      <span style="font-size: 0.8em;">Фреймворк для UI</span>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://img.shields.io/badge/Apollo_Client-3.2-311C87?logo=apollographql" height="25" alt="Apollo Client 3.2"><br>
      <span style="font-size: 0.8em;">GraphQL клиент</span>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://img.shields.io/badge/RxJS-6.6-B7178C?logo=reactivex" height="25" alt="RxJS 6.6"><br>
      <span style="font-size: 0.8em;">Реактивное программирование</span>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap" height="25" alt="Bootstrap 5"><br>
      <span style="font-size: 0.8em;">Стилизация</span>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://img.shields.io/badge/Bootstrap_Icons-1.8-7952B3?logo=bootstrap" height="25" alt="Bootstrap Icons 1.8"><br>
      <span style="font-size: 0.8em;">Иконки</span>
    </td>
  </tr>
</table>

### <img src="https://nestjs.com/img/logo-small.svg" width="20" style="vertical-align: middle;" alt="NestJS Logo"> Backend

<table>
  <tr>
    <td style="text-align: center; padding: 10px;">
      <img src="https://img.shields.io/badge/NestJS-8.0-E0234E?logo=nestjs" height="25" alt="NestJS 8.0"><br>
      <span style="font-size: 0.8em;">Серверный фреймворк</span>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://img.shields.io/badge/TypeORM-0.3.2-FE0909?logo=typeorm" height="25" alt="TypeORM 0.3.2"><br>
      <span style="font-size: 0.8em;">ORM для PostgreSQL</span>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql" height="25" alt="PostgreSQL 17"><br>
      <span style="font-size: 0.8em;">База данных</span>
    </td>
    <td style="text-align: center; padding: 10px;">
      <img src="https://img.shields.io/badge/GraphQL-16.9-E10098?logo=graphql" height="25" alt="GraphQL 16.9"><br>
      <span style="font-size: 0.8em;">API интерфейс</span>
    </td>
  </tr>
</table>


### 📂 Структура проекта

#### Frontend

<pre>
src/
├── app/
│   ├── components/          # Общие компоненты
│   ├── pages/               # Страницы приложения
│   │   └── users/           # Модуль пользователей
│   ├── interfaces/          # Интерфейсы данных
│   ├── services/            # Сервисы
│   └── graphql.module.ts    # Настройка Apollo Client
├── assets/                  # Статические файлы
└── environments/            # Конфигурация окружения
</pre>

#### Backend

<pre>
src/
├── users/                   # Модуль пользователей
│   ├── entities/            # Сущности TypeORM
│   ├── inputs/              # GraphQL Input типы
│   ├── resolvers/           # GraphQL резолверы
│   └── services/            # Бизнес-логика
├── app.module.ts            # Корневой модуль
└── main.ts                  # Точка входа
</pre>


### Установка и запуск

#### Требования

<div style="white-space: nowrap; overflow-x: auto; padding: 10px 0;">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white" height="25" alt="Node.js 18+">
  <img src="https://img.shields.io/badge/NestJS-10.0-E0234E?logo=nestjs" height="25" alt="NestJS 10.0">
  <img src="https://img.shields.io/badge/Angular_CLI-12-DD0031?logo=angular&logoColor=white" height="25" alt="Angular CLI 12">
  <img src="https://img.shields.io/badge/PostgreSQL-17%2B-4169E1?logo=postgresql&logoColor=white" height="25" alt="PostgreSQL 17+">
  <img src="https://img.shields.io/badge/Docker-20.10%2B-2496ED?logo=docker&logoColor=white" height="25" alt="Docker 20.10+">
</div>


### Frontend

Установите зависимости:

```bash
cd frontend
npm install
```

Настройте переменные окружения:

Создайте файл src/environments/environment.ts на основе environment.example.ts:

```typescript
export const environment = {
production: false,
graphql_uri: 'http://localhost:4001/graphql' // URL вашего GraphQL сервера
};
```

Запустите приложение:

```bash
npm start
```

Приложение будет доступно по адресу: http://localhost:4200

### Backend

Установите зависимости:

```bash
cd backend
npm install
```

### 🗄 Конфигурация базы данных

Настройте подключение к БД в ormconfig.json

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "admin",
  "password": "secret",
  "database": "users_db",
  "synchronize": true,
  "logging": false,
  "entities": ["dist/**/*.entity.js"],
  "migrations": ["dist/migrations/*.js"],
  "cli": {
    "migrationsDir": "src/migrations"
  }
} 
```

#### Запустите сервер:

```bash
npm run start:dev
```
GraphQL API будет доступен по адресу: http://localhost:4001/graphql


### Разработка

#### Frontend

```bash
cd frontend
npm run build
```

#### Backend

```bash
cd backend
npm run build
```

#### Frontend тесты

```bash
cd frontend
npm test
```

#### Backend тесты

```bash
cd backend
npm test
```

<div align="center"> <h2>💝 Разработано с ❤️</h2> <p> <a href="https://github.com/bitmatzery"> <img src="https://img.shields.io/badge/Author-bitmatzery-blue?style=for-the-badge" height="30"> </a> </p> <p>© 2025 Все права защищены</p> <p> <span style="vertical-align: middle;">Made with </span> <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="16" style="vertical-align: middle;"> <span style="vertical-align: middle;"> and </span> <img src="https://nestjs.com/img/logo-small.svg" width="16" style="vertical-align: middle;"> </p> </div>
