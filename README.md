# AutoValuate — Vehicle Price Prediction Dashboard

A professional Flask web dashboard that predicts used vehicle prices using a Random Forest ML model trained on 8,000+ Indian vehicle transactions.

---

## 🗂️ Project Structure

```
vehicle_dashboard/
│
├── app.py                  # Flask backend (routes + prediction logic)
├── model.pkl               # Trained Random Forest model
├── encoders.pkl            # Label encoders for categorical features
├── requirements.txt        # Python dependencies
├── Vehicle.csv             # Dataset (place in this folder)
│
├── templates/
│   └── index.html          # Main dashboard HTML
│
└── static/
    ├── css/
    │   └── style.css       # Dashboard stylesheet
    └── js/
        └── app.js          # Frontend JS (form handling, API calls)
```

---

## ⚙️ Setup & Run

### Step 1: Install dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Place Dataset
Put `Vehicle.csv` in the same folder as `app.py`.

### Step 3: Train the model (first time only)
The `model.pkl` and `encoders.pkl` are already included.
If you want to retrain from scratch, run:
```bash
python train_model.py
```

### Step 4: Start the Flask server
```bash
python app.py
```

### Step 5: Open your browser
```
http://localhost:5000
```

---

## 🔢 Input Features

| Feature           | Type     | Range / Options                                   |
|-------------------|----------|---------------------------------------------------|
| Year              | Number   | 1994 – 2020                                       |
| KM Driven         | Number   | 1 – 475,000 km                                    |
| Engine Power      | Number   | 32 – 280 bhp                                      |
| Engine CC         | Number   | 624 – 3604 CC                                     |
| Fuel Efficiency   | Number   | 0 – 33.44 kmpl                                    |
| Seats             | Select   | 2, 4, 5, 6, 7, 8, 9                               |
| Fuel Type         | Select   | Petrol, Diesel, CNG, LPG                          |
| Transmission      | Select   | Manual, Automatic                                 |
| Owner History     | Select   | First / Second / Third / Fourth+ / Test Drive     |
| Seller Type       | Select   | Individual, Dealer, Trustmark Dealer              |

---

## 🏆 Model Performance

- **Algorithm**: Random Forest Regressor (100 trees, max_depth=12)
- **R² Score**: ~96%+
- **Top Features**: Engine Power (69%), Year (17%), KM Driven (6%)

---

## 🛠️ Tech Stack

- **Backend**: Python, Flask
- **ML**: scikit-learn (Random Forest)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Fonts**: Syne (display), DM Sans (body)
