from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load all 4 trained models when server starts
models = {}

for name in ['RandomForest', 'GradientBoosting', 'LogisticRegression', 'SVM']:
    with open(f'{name}.pkl', 'rb') as f:
        models[name] = pickle.load(f)

# Load accuracy scores for home page
with open('results.json') as f:
    model_results = json.load(f)

# API: Get model results for home page
@app.route('/api/results', methods=['GET'])
def get_results():
    try:
        return jsonify(model_results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# API: Process prediction (JSON request from React)
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features in correct order
        features = [
            float(data.get(k, 0)) for k in [
                'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
                'restecg', 'thalach', 'exang', 'oldpeak',
                'slope', 'ca', 'thal'
            ]
        ]

        # Convert to numpy array
        arr = np.array([features])

        # Selected model (default to RandomForest)
        selected = data.get('model', 'RandomForest')
        if selected not in models:
            return jsonify({'error': f'Model {selected} not found'}), 400
        
        model = models[selected]

        # Prediction
        prediction = int(model.predict(arr)[0])

        # Probabilities
        probability = model.predict_proba(arr)[0]
        risk = round(probability[1] * 100, 1)
        confidence = round(max(probability) * 100, 1)

        # All models comparison
        all_risks = {}
        for n, m in models.items():
            prob = m.predict_proba(arr)[0]
            all_risks[n] = round(prob[1] * 100, 1)

        return jsonify({
            'prediction': prediction,
            'risk': risk,
            'confidence': confidence,
            'selected': selected,
            'all_risks': all_risks
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# LEGACY: Form-based prediction (for backward compatibility)
@app.route('/result', methods=['POST'])
def result():
    try:
        # Read all 13 input values from form
        features = [float(request.form[k]) for k in [
            'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
            'restecg', 'thalach', 'exang', 'oldpeak',
            'slope', 'ca', 'thal'
        ]]

        # Convert to numpy array
        arr = np.array([features])

        # Selected model
        selected = request.form.get('model', 'RandomForest')
        model = models[selected]

        # Prediction
        prediction = int(model.predict(arr)[0])

        # Probabilities
        probability = model.predict_proba(arr)[0]
        risk = round(probability[1] * 100, 1)
        confidence = round(max(probability) * 100, 1)

        # All models comparison
        all_risks = {
            n: round(m.predict_proba(arr)[0][1] * 100, 1)
            for n, m in models.items()
        }

        return jsonify({
            'prediction': prediction,
            'risk': risk,
            'confidence': confidence,
            'selected': selected,
            'all_risks': all_risks
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# RUN SERVER
if __name__ == '__main__':
    app.run(debug=True)