# 🚗 AutoValuate — Car Price Prediction

> Know your car's true worth. An AI-powered used car price estimator trained on 8,000+ real Indian vehicle transactions.

![Python](https://img.shields.io/badge/Python-3.13-blue) ![Sklearn](https://img.shields.io/badge/Scikit--learn-RandomForest-green) ![R2](https://img.shields.io/badge/R²%20Score-98.28%25-brightgreen) ![Flask](https://img.shields.io/badge/Backend-Flask-orange)

---

## 🎯 Problem Statement

The Indian used car market lacks pricing transparency. Buyers overpay. Sellers undersell. AutoValuate bridges that gap using machine learning — giving anyone an instant, data-backed price estimate.

---

## 🚀 Live Demo

Input your car's specs → Get an instant AI price estimate with a confidence range and feature importance breakdown.

---

## 📊 Model Performance

| Model | R² Score | MAE (₹) | RMSE (₹) |
|---|---|---|---|
| **Random Forest** ✅ | **0.9828** | **65,204** | **1,09,288** |
| Decision Tree | 0.9655 | 89,391 | 1,54,897 |
| Linear Regression | 0.6939 | 2,70,328 | 4,61,311 |

Random Forest was selected as the final model with **98.28% accuracy** on unseen test data.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Python 3.13 |
| ML Library | Scikit-learn |
| Model | Random Forest Regressor (100 estimators) |
| Data Processing | Pandas, NumPy |
| Serialization | Pickle |
| Backend | Flask |
| Frontend | HTML, CSS, JavaScript |

---

## 📋 Input Features

The model uses 10 vehicle parameters:

- Year of Manufacture
- Kilometres Driven
- Engine Power (bhp)
- Engine Displacement (CC)
- Fuel Efficiency (kmpl)
- Seating Capacity
- Fuel Type (Petrol / Diesel / CNG)
- Transmission (Manual / Automatic)
- Owner History (1st / 2nd / 3rd owner)
- Seller Type (Individual / Dealer)

---

## 💡 Key Features of the Web App

- ⚡ Instant price prediction with min/max range
- 📊 "What Drives the Price?" — live feature importance chart
- 🎯 AI Confidence indicator (High / Medium / Low)
- 📱 Clean, responsive UI built from scratch

---

## 🗂️ Project Structure

```
AutoValuate/
├── Price_Prediction.ipynb   # Full ML pipeline (EDA → Training → Evaluation)
├── app.py                   # Flask web application
├── model.pkl                # Trained Random Forest model
├── encoders.pkl             # Label encoders for categorical features
├── templates/
│   └── index.html           # Frontend UI
└── README.md
```

---

## ⚙️ Setup & Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/autovaluate.git
cd autovaluate

# Install dependencies
pip install flask scikit-learn pandas numpy

# Run the app
python app.py
```

Open `http://localhost:5000` in your browser.

---

## 📈 Model Training Pipeline

1. Data loading & inspection (8,128 records)
2. Data cleaning — handling nulls, unit parsing (kmpl, bhp, CC)
3. Label encoding for categorical variables
4. Train/test split (80/20)
5. Model comparison — Linear Regression, Decision Tree, Random Forest
6. Final model serialization with Pickle
7. Flask integration for real-time inference

---

## 🙋 Author

Built with ❤️ by Shivvraj Yadav · LinkedIn:https://www.linkedin.com/in/shivraj-yadav-sy2323/ ·

---

*Trained on real Indian vehicle transaction data. For educational and informational purposes.*
