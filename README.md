# Zeotap_ClickHouse_Assignment

## ClickHouse CSV Uploader

A web application that facilitates data ingestion between CSV files and ClickHouse databases using JWT authentication.

## Overview

This project consists of a React frontend and a Node.js/Express backend that allows users to:

1. Upload CSV files to a ClickHouse database
2. Retrieve data from a ClickHouse database to flat files

## Project Structure

```
ZEOTAP CLICKHOUSE ASSIGNMENT/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── assets/             # Static assets
│   │   ├── App.jsx             # Main application component
│   │   ├── App.css             # Application styles
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Public assets
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
├── server/                     # Backend Node.js/Express application
│   ├── controllers/
│   │   └── ingestionController.js  # Logic for data ingestion
│   ├── routes/
│   │   └── ingestionRoutes.js      # API route definitions
│   ├── uploads/                # Temporary storage for uploaded files
│   ├── server.js               # Express server setup
│   └── package.json            # Backend dependencies
├── .env                        # Environment variables (not tracked by git)
└── README.md                   # Project documentation
```

## Features

- **CSV to ClickHouse**: Upload CSV files directly to a ClickHouse database table
- **ClickHouse to Flat File**: Export data from ClickHouse to flat files
- **JWT Authentication**: Secure access to ClickHouse databases using JWT tokens
- **User-friendly Interface**: Simple and intuitive web interface

## Prerequisites

- Node.js (v14+)
- npm or yarn
- ClickHouse database instance

## Installation

### Clone the repository

```bash
https://github.com/Chirag5017/Zeotap_ClickHouse_Assignment.git
cd zeotap-clickhouse-assignment
```

### Install backend dependencies

```bash
cd server
npm install
```

### Install frontend dependencies

```bash
cd ../client
npm install
```

## Configuration

Create a `.env` file in the server directory with the following variables:

```
PORT=5000


## Running the Application

### Start the backend server

```bash
cd server
npm start
```

The server will start on http://localhost:5000

### Start the frontend application

```bash
cd client
npm run dev
```

The frontend will be available at http://localhost:5173 (or another port specified by Vite)

## Usage

### Uploading CSV to ClickHouse

1. Open the web application in your browser
2. Fill in the ClickHouse connection details:
   - Host (e.g., http://localhost)
   - Port (e.g., 8123)
   - Database name
   - JWT Token for authentication
   - Target table name
3. Select the CSV file to upload
4. Click the "Upload CSV" button
5. Upon successful upload, you'll see a confirmation message with the number of records uploaded

### Retrieving Data from ClickHouse

Use the API endpoint:

```
POST /api/ingest/clickhouse-to-flat
```

with a JSON body containing:

```json
{
  "host": "http://localhost",
  "port": "8123",
  "database": "your_database",
  "token": "your_jwt_token",
  "tableName": "your_table",
  "columns": ["column1", "column2"]
}
```

## API Endpoints

- `POST /api/ingest/flat-to-clickhouse`: Upload CSV file to ClickHouse
- `POST /api/ingest/clickhouse-to-flat`: Retrieve data from ClickHouse

## Technology Stack

- **Frontend**: React, Axios, CSS
- **Backend**: Node.js, Express.js
- **Libraries**: csv-parser, clickhouse, multer

