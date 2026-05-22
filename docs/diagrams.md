# Architecture Diagrams

Below is a Mermaid-based system diagram you can copy into GitHub README or render locally.

```mermaid
graph TD
  A[Frontend (React)] --> B[Backend (Express)]
  B --> C[(MongoDB)]
  B --> D[Gemini AI Service]
  B --> E[Analytics Service]
  B --> F[Inventory Alert]

  subgraph Frontend
    A
  end

```

