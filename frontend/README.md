# 🚀 User Management Dashboard (Frontend)

*Modern Angular-based user management interface with GraphQL API integration*

## ✨ Features

- **📊 User Dashboard** - Beautifully crafted user list with pagination
- **👤 Profile Management** - View/edit user details with form validation
- **⚡ Real-time Updates** - Powered by Apollo GraphQL
- **🎨 Responsive Design** - Works flawlessly on all devices
- **🔒 Secure Operations** - JWT authentication ready

## 🛠 Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| Angular 12       | Frontend framework               |
| Apollo Client    | GraphQL API integration          |
| Bootstrap 5      | Responsive UI components         |
| NGXS             | State management                 |
| RxJS             | Reactive programming             |
| Date-fns         | Date formatting                  |

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x
- Angular CLI 12.x
- Running [backend service](https://github.com/your-repo/backend)

### Installation
```bash
git clone https://github.com/your-repo/frontend.git
cd frontend
npm install
```

### Configuration
Create .env file:
GRAPHQL_URI=http://localhost:4001/graphql

### Development
```bash
npm start
App will open at http://localhost:4200
```
### Production Build
```bash
npm run build
```
### 🐳 Docker Deployment
```bash
docker-compose up -d --build
```
Access at http://localhost:80

### 📂 Project Structure
<pre>
src/
├── app/
│   ├── modules/          # Feature modules
│   ├── core/             # Core services
│   ├── shared/           # Shared components
│   └── store/            # State management
├── assets/               # Static files
└── environments/         # Build configurations
</pre>
### 🌈 UI Components

| Component        | Description                      |
|------------------|----------------------------------|
| User Card        | Elegant profile display          |
| Data Table       | Sortable/paginated user list     |
| Modal Forms      | Clean CRUD operation interfaces  |
| Toast Alerts     | Non-intrusive notifications      |
| RxJS             | Reactive programming             |
| Date-fns         | Date formatting                  |


<div align="center">
  <h2>📜 <span style="color:#4FC3F7">License</span></h2>
  <p>MIT © 2025 <a href="https://github.com/bitmatzery">bitmatzery</a></p>
  <p>Made with ❤️ and <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="16" alt="Angular" style="vertical-align: middle;"></p>
</div>
