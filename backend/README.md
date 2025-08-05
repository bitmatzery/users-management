# <div align="center">🚀 User Management API</div>
<div align="center"><strong>⚡ Modern NestJS Backend with GraphQL & PostgreSQL</strong></div>


## ✨ <span style="color:#4FC3F7">Core Features</span>

| Feature                  | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| 🔐 **Authentication**    | JWT-based secure auth system with role management                           |
| 📊 **GraphQL API**       | Type-safe queries & mutations with Apollo Server                            |
| 🛡️ **Data Validation**  | Built-in DTO validation using class-validator                               |
| 🐳 **Docker Ready**      | Containerized PostgreSQL & app with health checks                           |
| 📈 **Scalable**          | Modular architecture with clean separation of concerns                      |

---

## 🛠 <span style="color:#4FC3F7">Technology Stack</span>

<div align="center">

| Category       | Technologies                                                                 |
|---------------|------------------------------------------------------------------------------|
| **Runtime**   | <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=nodedotjs" height="20"> <img src="https://img.shields.io/badge/NestJS-10.x-red?logo=nestjs" height="20"> |
| **API**       | <img src="https://img.shields.io/badge/GraphQL-E10098?logo=graphql" height="20"> <img src="https://img.shields.io/badge/Apollo_Server-4.0-purple?logo=apollographql" height="20"> |
| **Database**  | <img src="https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql" height="20"> <img src="https://img.shields.io/badge/TypeORM-0.3-red?logo=typeorm" height="20"> |
| **DevOps**    | <img src="https://img.shields.io/badge/Docker-24.0-blue?logo=docker" height="20"> <img src="https://img.shields.io/badge/Jest-29.0-red?logo=jest" height="20"> |

</div>

---

## 🚀 <span style="color:#4FC3F7">Quick Start</span>

### 📋 Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker (recommended)

### ⚙️ Installation
git clone https://github.com/your-repo/backend.git
cd backend
npm install

### 🔧 Configuration
Create .env file

### Database
DATABASE_URL=postgresql://user:password@localhost:5432/db_name

### Authentication
JWT_SECRET=your_secure_secret
JWT_EXPIRES_IN=3600s

### App
PORT=4001
NODE_ENV=development

## 🐳 <span style="color:#4FC3F7">Docker Deployment</span>

### Start all services
docker-compose up -d --build

### View logs
docker-compose logs -f
Service	Port	URL
Application	4001	http://localhost:4001/graphql
PostgreSQL	5432	postgres://db:5432

### 🏗 <span style="color:#4FC3F7">Project Structure</span>
text
src/
├── modules/
│   ├── auth/               # Authentication logic
│   ├── users/              # User management
│   │   ├── entities/       # Database models
│   │   ├── resolvers/      # GraphQL resolvers
│   │   └── services/       # Business logic
│   └── shared/             # Common utilities
├── config/                 # Configuration files
├── migrations/             # Database migrations
└── main.ts                 # Application entry point

### 📡 <span style="color:#4FC3F7">API Documentation</span>
GraphQL Schema
graphql
type Mutation {
  login(email: String!, password: String!): AuthPayload!
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

type Query {
  users: [User!]!
  user(id: ID!): User
}

type User {
  id: ID!
  name: String!
  email: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

### 🧪 <span style="color:#4FC3F7">Testing</span>

### Run unit tests
npm run test

### Run e2e tests
npm run test:e2e

### Test coverage
npm run test:cov

### Watch mode
npm run test:watch

<div align="center"> <h2>🤝 <span style="color:#4FC3F7">Contributing</span></h2> <p>We welcome contributions! Please follow our <a href="./CONTRIBUTING.md">contribution guidelines</a>.</p> </div>
<div align="center"> <h2>📜 <span style="color:#4FC3F7">License</span></h2> <p>MIT © 2025 <a href="https://github.com/bitmatzery">bitmatzery</a></p> <p>Made with ❤️ and <img src="https://nestjs.com/img/logo-small.svg" width="16"  style="vertical-align: middle;"></p> </div> 
