# System Architecture

> Full-stack AI-powered product launch intelligence architecture powered by **React + Qwen LLM + Supabase**

**Live Platform:**  
https://launch-iq-ai.vercel.app/

**Product Demo:**  
https://drive.google.com/file/d/1_RsbBekWaEKZ1L8vRRmYzNKCSje6Rkrt/view?usp=drivesdk

**Deployment Status:** Deployed (portfolio/demo project)

---

# Full Stack Architecture

```mermaid
graph TD

A[User Product Input]
--> B[React + TypeScript Frontend]

B --> C[Simulation Engine]

C --> D[Qwen LLM API - OpenRouter]

D --> E[AI Strategic Analysis]

E --> F[Structured JSON Response]

F --> G[Supabase PostgreSQL Database]

G --> H[Launch Intelligence Dashboard]
```

---

# System Components

## Frontend Layer

Responsible for user interaction and simulation experience.

### Technologies Used

```txt
React
TypeScript
Vite
Tailwind CSS
shadcn/ui
React Router
```

### Responsibilities

- Product simulation forms
- Authentication flow
- Dashboard rendering
- Strategic output visualization
- Real-time user interaction
- Responsive UI experience

---

## Intelligence Layer

Responsible for AI-powered business intelligence generation.

### Technologies Used

```txt
OpenRouter API - Qwen
qwen/qwen3.6-27b
Prompt Engineering
Structured JSON Parsing
```

### Responsibilities

- Product launch simulation
- Purchase likelihood prediction
- Launch risk assessment
- Market sentiment intelligence
- Strategic recommendations
- Pricing strategy generation
- Competitive positioning
- Go-To-Market recommendations
- SWOT intelligence

---

## Persistence Layer

Responsible for secure data storage and retrieval.

### Technologies Used

```txt
Supabase Authentication
PostgreSQL Database
Database Persistence
Session Management
```

### Responsibilities

- User authentication
- Simulation storage
- Dashboard persistence
- Historical records
- Session handling

---

# Request Flow Architecture

```mermaid
sequenceDiagram

User->>Frontend: Enter Product Data

Frontend->>Simulation Engine: Process Simulation

Simulation Engine->>AI Service: Send AI Prompt

AI Service-->>Simulation Engine: Strategic JSON Response

Simulation Engine->>JSON Parser: Validate Structure

JSON Parser->>Supabase: Save Simulation Results

Supabase-->>Frontend: Stored Response

Frontend-->>User: Display Launch Dashboard
```

---

# Data Flow

### Step 1 — User Input
Users enter:

- Product Name
- Category
- Industry
- Target Audience
- Pricing
- Product Features
- Competitors
- Launch Goal
- Market Region

### Step 2 — AI Processing
LaunchIQ.ai sends structured prompts to:

```txt
Qwen LLM (qwen/qwen3.6-27b)
```

for strategic launch intelligence.

### Step 3 — Response Structuring
AI responses are transformed into structured JSON outputs.

### Step 4 — Database Storage
Simulation results are stored securely in:

```txt
Supabase PostgreSQL
```

### Step 5 — Dashboard Generation
Users receive:

- Purchase likelihood  
- Launch risk score  
- Market sentiment  
- Executive strategic summary  
- Pricing recommendations  
- Competitive positioning  
- SWOT analysis  
- Go-To-Market strategy  

---

# Infrastructure Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + TypeScript |
| UI Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Routing | React Router |
| AI Intelligence | Qwen LLM (via OpenRouter) |
| AI Model | qwen/qwen3.6-27b |
| Backend | Supabase |
| Database | PostgreSQL |
| Deployment | Vercel |
| Version Control | GitHub |

---

# Architecture Status

```txt
Frontend Architecture       Complete
AI Intelligence Layer       Complete
Database Persistence        Complete
Authentication System       Complete
Simulation Engine           Complete
Strategic Output Engine     Complete
Deployed (demo/portfolio)   Yes
Public Access               Live
```
