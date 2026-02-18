# Mini Expense Manager

## Overview

Mini Expense Manager is a full-stack application designed to help users track and manage their daily expenses. It supports manual entry, CSV uploads, automatic rule-based categorization, anomaly detection, and dashboard summaries. The application demonstrates problem-solving, technical implementation, and real-world data handling.

---
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/c2943e8c-7bb0-4e77-9f18-f8d031267354" />

---
## Features

### Core Features

* **Add Expense Manually**

  * Fields: Date, Amount, Vendor Name, Description
  * Automatically assigns category based on vendor name

* **Upload via CSV**

  * Supports CSV uploads with multiple expense entries
  * Parses and saves entries to the backend

* **Rule-Based Categorization**

  * Maintains a vendor-to-category mapping
  * Applies mapping automatically during expense entry

* **Anomaly Detection**

  * Flags expenses more than 3× the average for their category
  * Displays anomalies distinctly in the UI

* **Dashboard Summary**

  * Shows monthly totals per category
  * Displays top 5 vendors by total spend
  * Counts and lists anomalies

---

## Tech Stack

* **Frontend:** React + TypeScript
* **Backend:** Java Spring Boot
* **Database:** MySQL

---

## Setup Instructions

### Backend

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Install dependencies (if using Maven):

   ```bash
   mvn clean install
   ```
3. Configure MySQL in `application.yml`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/expense_manager
   spring.datasource.username=<your-username>
   spring.datasource.password=<your-password>
   ```
4. Run the backend:

   ```bash
   mvn spring-boot:run
   ```

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm start
   ```
4. Open the app at `http://localhost:3000`

---

## Assumptions

* Vendor-to-category mapping is predefined but can be extended.
* CSV format: `Date,Amount,Vendor,Description`
* Anomaly threshold is strictly 3× the category average.
* Authentication is not implemented; the app is intended for single-user demo purposes.

---

## Design Note

* **Rule-Based Categorization:** Implemented using a mapping table in the database. Each expense automatically fetches its category based on the vendor.
* **Anomaly Logic:** Calculated by comparing a new expense amount to the average of its category; anomalies are flagged in the UI.
* **Data Model Choices:**

  * `Expense` table: `id, date, amount, vendor, description, category, is_anomaly`
  * `VendorCategory` table: `vendor, category`
* **Trade-offs / Shortcuts:**

  * No authentication or multi-user support
  * CSV parsing assumes correctly formatted input
  * UI is functional but not heavily styled

---

## Project Structure

```
Expense-Manager/
│
├─ backend/                     # Spring Boot backend
│  ├─ src/main/java
│  ├─ src/main/resources
│  └─ pom.xml
│
├─ frontend/                    # React + TypeScript frontend
│  ├─ src/
│  │  ├─ api/                   
│  │  ├─ types/                
│  │  ├─ components/           
│  │  └─ pages/                
│  │
│  └─ package.json
│
└─ README.md

```

---
