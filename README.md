# Income & Expense Ledger

A full-stack Income & Expense Ledger application built using the MERN stack. The application allows users to manage financial transactions, view income/expense summaries, and filter transactions using backend query parameters.

## Features

* Add income and expense transactions
* View all transactions
* Edit transactions
* Delete transactions
* Filter transactions by:

  * Transaction type
  * Category
  * Start date
  * End date
* Server-side transaction filtering
* Server-side financial summary
* Total income calculation
* Total expense calculation
* Net balance calculation
* Positive/negative balance indication
* MongoDB persistence
* RESTful API architecture

## Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Project Structure

```text
income-expense-ledger/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## API Endpoints

| Method | Endpoint                | Description                             |
| ------ | ----------------------- | --------------------------------------- |
| POST   | `/api/transactions`     | Create a transaction                    |
| GET    | `/api/transactions`     | Get transactions                        |
| GET    | `/api/transactions/:id` | Get a single transaction                |
| PUT    | `/api/transactions/:id` | Update a transaction                    |
| DELETE | `/api/transactions/:id` | Delete a transaction                    |
| GET    | `/api/summary`          | Get income, expense and balance summary |

### Transaction Filters

The transaction API supports query parameters:

```text
GET /api/transactions?type=expense&category=Food&startDate=2026-08-30&endDate=2026-08-30
```

Supported filters:

* `type`
* `category`
* `startDate`
* `endDate`

Filtering is performed on the backend rather than only filtering already-loaded frontend data.

## Running Locally

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd income-expense-ledger
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the Vite development URL shown in the terminal.

## Application Flow

```text
User
 ↓
React Frontend
 ↓
Axios
 ↓
Express REST API
 ↓
Controller / Business Logic
 ↓
Mongoose
 ↓
MongoDB
 ↓
Response
 ↓
React State
 ↓
Updated UI
```

## Summary Calculation

The summary is calculated server-side from the transaction data.

```text
Total Income
Total Expense
Net Balance = Total Income - Total Expense
```

This keeps the backend as the source of truth for financial calculations.

## Design Decisions

* MongoDB is used for flexible transaction storage.
* Mongoose provides schema definition and validation.
* REST APIs separate frontend presentation from backend business logic.
* Summary calculations are performed on the backend.
* Transaction filters are handled through backend query parameters.
* React state is used to manage transactions, form data, editing state, summary data and filters.

## Future Improvements

Possible future enhancements include:

* Authentication using JWT
* Category-wise expense/income breakdown
* Pagination
* Charts and visual reports
* CSV export
* Multiple accounts such as Cash and Bank
* Transfer transactions between accounts
