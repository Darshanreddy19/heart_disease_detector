import pandas as pd
import numpy as np
import pickle
import json

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score

# Load the dataset
df = pd.read_csv('heart.csv')

# Features and target
X = df.iloc[:, :-1].values   # all 13 feature columns
y = df.iloc[:, -1].values    # last column: target

# Split: 80% training, 20% testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Define models
models = {
    'RandomForest': RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        criterion='entropy'
    ),
    
    'GradientBoosting': GradientBoostingClassifier(
        n_estimators=150,
        learning_rate=0.1,
        random_state=42
    ),
    
    'LogisticRegression': Pipeline([
        ('scaler', StandardScaler()),
        ('clf', LogisticRegression(max_iter=1000))
    ]),
    
    'SVM': Pipeline([
        ('scaler', StandardScaler()),
        ('clf', SVC(probability=True, kernel='rbf'))
    ]),
}

# Train, evaluate and save
results = {}

for name, model in models.items():
    
    # Train
    model.fit(X_train, y_train)
    
    # Test accuracy
    acc = accuracy_score(y_test, model.predict(X_test))
    
    # Cross-validation
    cv_score = cross_val_score(model, X, y, cv=5).mean()
    
    results[name] = {
        'accuracy': round(acc * 100, 2),
        'cv_score': round(cv_score * 100, 2)
    }
    
    print(f'{name}: Test={acc*100:.1f}% CV={cv_score*100:.1f}%')
    
    # Save model
    with open(f'{name}.pkl', 'wb') as f:
        pickle.dump(model, f)

# Save results
with open('results.json', 'w') as f:
    json.dump(results, f)

print('All 4 models trained and saved!')