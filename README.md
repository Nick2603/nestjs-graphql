# 📝 Article Management App

A full-featured article management application built with **NestJS**, **GraphQL**, and **Prisma**.
This pet project demonstrates scalable architecture, advanced backend techniques and integration between various services.

## 🚀 Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **API:** [GraphQL](https://graphql.org/)
- **Authentication:** [passport-jwt](https://www.passportjs.org/packages/passport-jwt/)
- **Authorization:** [CASL](https://casl.js.org/)
- **Caching:** [Redis](https://redis.io/)
- **Search Engine:** [Elasticsearch](https://www.elastic.co/elasticsearch)
- **Containerization:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Excel report generation:** [exceljs](https://github.com/exceljs/exceljs#readme)

---

## 🔧 Features

- ✅ Full CRUD for article management
- 🔐 Authentication using access and refresh tokens
- 🔑 Role-based authorization with **casl**
- 📈 Resolved N+1 query issues in GraphQL with **DataLoader**
- 🧾 Atomic operations with **Prisma transactions**
- 🚀 **Redis** integration for caching
- 🔍 Full-text search with **Elasticsearch**, extended via Prisma custom methods
- 📤 API for generating and sending Excel reports
- 🐳 Development with `docker-compose` orchestration

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [npm](https://www.npmjs.com/) or alternative package manager
- [Docker](https://www.docker.com/)
