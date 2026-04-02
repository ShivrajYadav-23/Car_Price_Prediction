from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load model and encoders
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('encoders.pkl', 'rb') as f:
    encoders = pickle.load(f)

FEATURE_IMPORTANCE = {
    'max_power': 69.03,
    'year': 17.15,
    'km_driven': 6.09,
    'mileage': 3.35,
    'engine': 2.56,
    'transmission': 0.51,
    'fuel': 0.44,
    'seats': 0.40,
    'owner': 0.27,
    'seller_type': 0.20
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        year         = int(data['year'])
        km_driven    = int(data['km_driven'])
        fuel         = encoders['fuel'][data['fuel']]
        seller_type  = encoders['seller_type'][data['seller_type']]
        transmission = encoders['transmission'][data['transmission']]
        owner        = encoders['owner'][data['owner']]
        mileage      = float(data['mileage'])
        engine       = float(data['engine'])
        max_power    = float(data['max_power'])
        seats        = float(data['seats'])

        features = np.array([[year, km_driven, fuel, seller_type,
                               transmission, owner, mileage, engine,
                               max_power, seats]])

        prediction = model.predict(features)[0]

        # Confidence band (±12%)
        lower = prediction * 0.88
        upper = prediction * 1.12

        return jsonify({
            'success': True,
            'price': round(float(prediction)),
            'lower': round(float(lower)),
            'upper': round(float(upper)),
            'price_formatted': f"₹{prediction:,.0f}",
            'lower_formatted': f"₹{lower:,.0f}",
            'upper_formatted': f"₹{upper:,.0f}",
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/importance')
def importance():
    return jsonify(FEATURE_IMPORTANCE)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
