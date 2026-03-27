# Google Forms Lite Clone

## Overview

This repository is a monorepo for a simplified Google Forms clone with:

- Front-end: React + TypeScript + Redux Toolkit (RTK + RTK Query) + React Router
- Back-end: Node.js + GraphQL (NestJS) with in-memory data stores

## Project Structure

- `/client` - React app source code
- `/server` - GraphQL API (NestJS)

## Prerequisites

- Node.js 18+ recommended
- npm 10+ (or pnpm/yarn as preferred)

## Setup

1. Clone repository:

```bash
git clone <your-repo-url> forms-clone
cd forms-clone
```

2. Install root dependencies (if any):

```bash
npm install
```

## Running Locally

### Run Both Together (Optional)

If a root script is available to run both concurrently, from repository root:

```bash
npm run dev
```

(If not configured, run server and client in separate terminals as bellow.)

### Start Server

1. Open a terminal at `/server`:

```bash
cd server
npm run start:dev
```

2. Server runs by default at `http://localhost:3000/graphql` (GraphQL Playground / Sandbox available).

### Start Client

1. Open a terminal at `/client`:

```bash
cd client
npm run dev
```

2. Client runs by default at `http://localhost:5173` (Vite).

## Test and Quality

- `/server` tests:
  - `npm run test`
  - `npm run test:e2e`
- `/client` linting / tests:
  - `npm run lint`
  - `npm run test` (if test scripts exist)

## GraphQL API Endpoints

`/server` exposes:

- Query `forms`: all forms
- Query `form(id: ID!)`: single form
- Query `responses(formId: ID!)`: form responses
- Mutation `createForm(...)`: create new form
- Mutation `submitResponse(...)`: submit form response

## Notes

- Data is in-memory and resets when server restarts.
- Make sure server is running before using the client UI.
- If ports are busy, adjust `server/src/main.ts` or Vite config in `client/vite.config.ts`.

---

## Common Issues

- `ECONNREFUSED` from client means server is not running or using a different port.
- If form list is empty, create a form first before submitting responses.
