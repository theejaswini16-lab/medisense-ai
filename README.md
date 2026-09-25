# AI-Powered Early Disease Detection System for Rural Areas

A machine learning–based web application that predicts probable diseases from
user-entered symptoms, aimed at improving early health screening access in
areas with limited access to doctors and diagnostic facilities.

## Overview

Many rural areas face a shortage of accessible healthcare — long travel
distances, limited clinics, and few doctors per person often mean that
early symptoms go unchecked until a condition becomes serious. This project
is a step toward closing that gap: users enter the symptoms they're
experiencing through a simple web interface, and a trained classification
model returns the most probable disease(s) along with basic guidance, so
they know whether and how urgently to seek medical care.

**This is a screening aid, not a diagnostic tool** — it's meant to help
people decide when to see a doctor, not replace one.

## Features

- Simple, accessible web interface for entering symptoms
- Machine learning model trained to classify probable diseases from symptom input
- Returns predictions along with basic next-step guidance
- Built with lightweight tools so it can run on modest hardware/connectivity — a practical fit for rural deployment

## Tech Stack

- **Backend:** Python, Flask
- **Machine Learning:** scikit-learn
- **Frontend:** HTML, CSS

## How It Works

1. The user enters their symptoms through the web form.
2. The Flask backend processes the input and passes it to the trained classification model.
3. The model (built with scikit-learn) predicts the most probable disease(s) based on the symptom pattern.
4. The result is displayed to the user along with basic guidance.

## Getting Started

### Prerequisites
- Python 3.x
- pip

### Installation

```bash
git clone https://github.com/theejaswini16-lab/<your-repo-name>.git
cd <your-repo-name>
pip install -r requirements.txt
```

### Run the app

```bash
python app.py
```

Then open the local URL shown in your terminal (usually `http://127.0.0.1:5000`) in your browser.

## Disclaimer

This project is intended for educational and screening-assistance purposes
only. It is **not a substitute for professional medical diagnosis or
treatment**. Always consult a qualified healthcare provider for medical
concerns.

## Author

**Theejaswini S**
[GitHub](https://github.com/theejaswini16-lab) · [LinkedIn](https://linkedin.com/in/theejaswini-s-722240334)
