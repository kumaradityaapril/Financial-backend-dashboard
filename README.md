# Finance Backend API

A highly scalable, robust Node.js and Express backend API designed for managing financial data. It features direct PostgreSQL database integration for maximum performance, secure password handling, and a strict Role-Based Access Control (RBAC) system to ensure data security.

---

## Features
- **Raw SQL Integration**: Uses `pg` (node-postgres) to connect and query PostgreSQL, prioritizing fine-grained performance over ORM abstractions.
- **Secure Authentication Foundation**: Utilizes `bcrypt` to hash and secure user passwords safely in the database.
- **Granular Role-based Access Control (RBAC)**: Supports completely customized access scopes using administrative overrides (Admin, Analyst, Viewer).
- **Financial Record Operations**: Implement full CRUD (Create, Read, Update, Delete) for tracking income and expenses.
- **Filtering System**: Allows the querying of financial records based on specific parameters like type, category, and date ranges.
- **Analytics Dashboard Aggregation**: Dynamic endpoints to compute total income, total expenses, net balance, and category-wise breakdowns right from the database layer.

## Technologies Used
- **Runtime Environment**: Node.js
- **Web Framework**: Express.js
- **Database**: PostgreSQL
- **Database Driver**: `pg` (Node-Postgres)
- **Security**: `bcrypt` for hashing
- **Development Tooling**: `nodemon` for hot reloading

---

## Role-Based Access Control (RBAC)
The application enforces security at the route level by verifying the `role` provided in the request headers against the expected authorization scope.

- **`admin`**: Ultimate access. Authorized to create users, and has full CRUD capabilities over all financial records.
- **`analyst`**: Authorized to view records and fetch dashboard analytics. Cannot create, update, or delete records.
- **`viewer`**: Strictly read-only access to view basic financial records. Cannot view dashboard analytics.

*(Note: Roles are validated via the `role` header in HTTP requests for developmental demonstration purposes).*

---

## API Documentation

### 1. User Management (`/api/users`)
| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/` | `admin` | Create a new user (with `name`, `email`, `password`, `role`). |
| `GET`  | `/api/users/` | `admin` | Retrieves a list of all registered users in the system. |

### 2. Financial Records (`/api/records`)
| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/records/` | `admin` | Creates a new financial record. |
| `GET`  | `/api/records/` | `admin`, `analyst`, `viewer` | Retrieve records. Accepts query parameters: `type`, `category`, `startDate`, `endDate`. |
| `PUT`  | `/api/records/:id` | `admin` | Update an existing financial record by its `id`. |
| `DELETE` | `/api/records/:id` | `admin` | Delete a financial record permanently by its `id`. |

### 3. Analytics Dashboard (`/api/records/dashboard`)
| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/records/dashboard` | `admin`, `analyst` | Aggregates and returns total income, total expenses, net balance, and a category breakdown. |

---

## Database Configuration

This backend requires a running instance of PostgreSQL. Provide a database named `finance_assignment_db`.

Run the following SQL commands to instantiate the required schema and tables before starting the backend:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial_records (
  id SERIAL PRIMARY KEY,
  amount NUMERIC NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  user_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Local Development & Setup

1. **Clone the repository and install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Verify the `src/config/db.js` configurations match your local PostgreSQL setup (e.g. host, port, user, and password). A `.env` file should be kept if any server-level environments are integrated.

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   *(This triggers `nodemon` and hot-reloads the server on port `5000`)*

---

## Author 
**Name:** Kumar Aditya  
**Email:** kumaraditya.bvn@gmail.com  
