# Villva Workspace

A full-stack workspace management platform built with React and Go.

---

## Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Base UI |
| Routing | React Router v7 |
| State Management | Zustand |
| Server State / API | TanStack Query (React Query) |
| Tables | TanStack Table |
| Forms | React Hook Form + Zod (validation) |
| Charts | Recharts |
| HTTP Client | Axios |
| Icons | Lucide React |
| Font | Geist Variable |
| Linter | OxLint |

### Backend

| Layer | Technology |
|---|---|
| Language | Go 1.26 |
| Web Framework | Gin |
| ORM | GORM |
| Authentication | JWT (golang-jwt) |
| Authorization | Casbin (RBAC/ABAC) |
| Background Jobs | Asynq (Redis-backed task queue) |
| File Storage | MinIO (S3-compatible) |

### Infrastructure / Database

| Layer | Technology |
|---|---|
| Primary Database | PostgreSQL 15 |
| Cache / Queue | Redis 7 |
| Object Storage | MinIO |
| Containerization | Docker Compose |
| Email | SMTP |

> React + TypeScript frontend talking to a Go REST API, backed by PostgreSQL for data, Redis for job queues/cache, and MinIO for file storage. All services run via Docker Compose.

---

## Getting Started

### Prerequisites

- Node.js 20+
- Go 1.26+
- Docker & Docker Compose

### Run Infrastructure

```bash
docker-compose up -d
```

### Run Backend

```bash
cd backend-go
go run ./cmd/api/main.go
```

### Run Frontend

```bash
npm install
npm run dev
```
