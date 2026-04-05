# 💰 Finance Dashboard UI

A clean and interactive finance dashboard built to visualize and manage financial data such as transactions, income, and expenses.

---

## 🚀 Overview

This project is a frontend-only finance dashboard designed to help users:

* View overall financial summary
* Explore transaction data
* Understand spending patterns
* Gain insights through visual charts

The focus of this project is on **UI/UX design, state management, and data visualization**, rather than backend integration.

---

## 🛠️ Tech Stack

* React (Vite)
* Tailwind CSS
* Recharts (for charts)
* Zustand (state management)

---

## 📦 Setup Instructions

1. Clone the repository

```bash
git clone <your-repo-link>
cd finance-dashboard
```

2. Install dependencies

```bash
npm install
```

3. Run the project

```bash
npm run dev
```

4. Open in browser

```bash
http://localhost:5173
```

---

## ✨ Features

### 📊 Dashboard

* Summary cards (Balance, Income, Expense)
* Time-based chart (balance trend)
* Category-based chart (spending breakdown)

---

### 📋 Transactions

* View all transactions in a table
* Search, filter (category & type), and sorting
* Add/Edit transactions (Admin role)
* Responsive table with horizontal scroll for mobile

---

### 🔐 Role-Based UI

* Viewer → can only view data
* Admin → can add/edit transactions
* Role switch available in topbar

---

### 📈 Insights

* Highest spending category
* Monthly comparison (current vs previous month)
* Expense distribution (histogram)
* Income vs Expense comparison (bar chart)
* Smart observations for each month

---

### 📱 Responsive Design

* Mobile-friendly layout
* Sidebar toggle for mobile
* Scrollable tables
* Adaptive grid system

---

## 🧠 Approach

* Used **Zustand** for simple and centralized state management
* Built reusable UI components (cards, charts, table)
* Focused on **clean layout, readability, and user experience**
* Implemented **data transformation logic** for insights and charts
* Designed UI inspired by modern fintech dashboards

---

## 🎯 Key Highlights

* Clean and consistent UI
* Interactive charts with real data
* Role-based UI behavior
* Fully responsive across devices
* Focus on usability and clarity

---

## ⚠️ Assumptions

* Data is static/mock (no backend)
* Transactions follow a fixed structure
* Dates are in standard format (YYYY-MM-DD)

---

## 🚀 Future Improvements

* Dark mode support
* Local storage persistence
* Pagination for transactions
* Advanced filters (date range, grouping)
* Export data (CSV/JSON)

---

## 👨‍💻 Author

Rahul Kumar
