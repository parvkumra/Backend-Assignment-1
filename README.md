# 🔐 Node.js Auth System (JWT + Bcrypt + MySQL)

A secure and modular user authentication system built using **Node.js**, **TypeScript**, **JWT**, **bcrypt**, and **MySQL**. Includes middleware, hashing, and token-based session handling.

---

## 📦 Tech Stack

- **Backend**: Node.js + TypeScript
- **Auth**: JWT (JSON Web Tokens) + bcrypt
- **Database**: MySQL (using mysql2 or Prisma)
- **Routing**: Express
- **Middleware**: Custom auth middleware (token check, protected routes)

---

## 🚀 Getting Started



```bash
git clone https://github.com/your-username/node-auth-system.git

npm install

SAMPLE .ENV FILE
PORT=3000
JWT_SECRET=super-secret-key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=mydb

RUN THE APP
npx ts-node-dev src/index.ts
