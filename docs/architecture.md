# Architecture Overview

This document describes the high-level architecture of SmartStoreAi.

## Mermaid Diagram

```mermaid
flowchart LR
  Browser[Client (React)] -->|API calls| FrontendServer[Frontend Dev Server]
  FrontendServer -->|HTTP| Backend[Node.js / Express]
  Backend --> Auth[(Auth Service /JWT)]
  Backend --> DB[(MongoDB)]
  Backend --> GeminiService[Gemini / AI Service]
  Backend --> Analytics[Analytics Service]
  ProductService[Product Controller] --> DB
  OrderService[Order Controller] --> DB
  Backend -->|Events| InventoryAlert[Inventory Alert Service]

  style DB fill:#f9f,stroke:#333,stroke-width:1px
```

## Components

- Frontend: Vite + React, components in `frontend/src/components`.
- Backend: Node.js + Express, routes in `backend/routes` and controllers in `backend/controllers`.
- Database: MongoDB (see `docs/db_schema.sql` for schema reference).
- AI Service: `backend/services/geminiService.js` integrates with Gemini.
- Analytics: `backend/services/analyticsService.js` collects metrics.

## Data flow

1. Client requests data from frontend.
2. Frontend calls backend API endpoints.
3. Backend authenticates via JWT, queries DB, calls AI services as needed, and returns JSON.

