# Real Estate Price Prediction Project

A full-stack machine learning web application to predict real estate prices in Bangalore, India. Users can input property details and instantly receive an estimated price based on a trained regression model using real market data.

---

## 🚀 Deployed Application

> **Live Demo:** [Add your deployed link here]

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Data Science & Model Development](#data-science--model-development)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Credits](#credits)

---

## 📝 Project Overview
This project predicts the price of residential properties in Bangalore using a machine learning model trained on real-world data. It features a modern web interface for users to input property details and get instant price estimates.

---

## ✨ Features
- **Interactive Web UI:** User-friendly interface for inputting property details (area, BHK, bathrooms, location).
- **Instant Price Prediction:** Real-time price estimation using a trained regression model.
- **Location Selection:** Dynamic dropdown of available Bangalore locations.
- **Responsive Design:** Works on desktop and mobile devices.
- **Notification System:** User feedback for errors and successful predictions.
- **Data-Driven:** Model trained on comprehensive Bangalore real estate data.

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript, jQuery, Font Awesome
- **Backend:** Python, Flask, Gunicorn
- **Machine Learning:** scikit-learn, pandas, numpy
- **Model Serialization:** pickle
- **Data:** [Bengaluru_House_Data.csv](model/Bengaluru_House_Data.csv)

---

## 📊 Data Science & Model Development
- **Data Cleaning:** Removed irrelevant columns, handled missing values, standardized formats.
- **Feature Engineering:** Extracted BHK from size, engineered price per sqft, grouped rare locations.
- **Outlier Removal:** Removed properties with unrealistic values and outliers in price per sqft.
- **Modeling:** Trained and evaluated multiple regression models (Linear Regression, Lasso, Decision Tree) using GridSearchCV.
- **Best Model:** Linear Regression selected based on cross-validation performance.
- **Export:** Model and column metadata saved as pickle and JSON for use in the web app.

---

## 📁 Project Structure
```
Real Estate Price Prediction Project/
│
├── client/           # Frontend (HTML, CSS, JS)
│   ├── app.html
│   ├── app.js
│   └── app.css
│
├── model/            # Data science & model artifacts
│   ├── Bengaluru_House_Data.csv
│   ├── price_pridiction.ipynb
│   ├── banglore_home_prices_model.pickle
│   └── columns.json
│
├── server/           # Backend (Flask API)
│   ├── server.py
│   ├── util.py
│   ├── requirements.txt
│   └── artifacts/
│       ├── banglore_home_prices_model.pickle
│       └── columns.json
│
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone <repo-url>
cd "Real Estate Price Prediction Project"
```

### 2. Backend Setup (Flask API)
```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python server.py
```
The Flask server will start at `http://127.0.0.1:5000/`.

### 3. Frontend Setup
Open `client/app.html` in your web browser. (No build step required.)

---

## 📡 API Documentation

### 1. `GET /get_location_names`
- **Description:** Returns a list of available locations.
- **Response:**
  ```json
  { "locations": ["location1", "location2", ...] }
  ```

### 2. `POST /predict_home_price`
- **Description:** Predicts the price of a property.
- **Request Form Data:**
  - `total_sqft` (float): Area in square feet
  - `location` (string): Location name
  - `bhk` (int): Number of bedrooms
  - `bath` (int): Number of bathrooms
- **Response:**
  ```json
  { "estimated_price": 75.34 }
  ```

---

## 🖥️ Usage
1. Start the backend Flask server as described above.
2. Open `client/app.html` in your browser.
3. Enter property details and click **Calculate Price**.
4. View the estimated price instantly.

---

## 🚀 Deployment
- **Production:** Use Gunicorn or a WSGI server for deployment.
- **Artifacts:** Ensure `banglore_home_prices_model.pickle` and `columns.json` are present in `server/artifacts/`.
- **Environment Variables:** (If needed, add `.env` and document here.)
- **Nginx/Reverse Proxy:** (Optional) Configure as needed for production.
- **Cloud/Platform:** (Add instructions for Heroku, AWS, etc. if applicable.)

---

## 📎 Credits
- **Author:** Shailesh
- **Data Source:** Kaggle - [Bengaluru House Data](https://www.kaggle.com/datasets/amitabhajoy/bengaluru-house-price-data)
- **Frontend & Backend:** Custom implementation

---


