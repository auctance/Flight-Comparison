from flask import Flask, render_template, request, jsonify
from models import Flight
from config import Config
import requests
import os
app = Flask(__name__)
app.config.from_object(Config)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search_flights', methods=['POST'])
def search_flights():
    # Get search parameters from frontend
    # print(request.headers['Content-Type'])
    # if request.headers['Content-Type'] != 'application/x-www-form-urlencoded':
    #     return jsonify({'error': 'Invalid Content-Type'}), 400

    departure = request.form.get('departure')
    destination = request.form.get('destination')
    start_date = request.form.get('start_date')
    end_date = request.form.get('end_date')

    departure=Config.region[departure]
    destination=Config.region[destination]

    flights = Flight.get_flight_data(departure, destination, start_date, end_date)

    # Create list of dictionaries for each flight
    flights_list = []
    for flight in flights:
        flights_list.append({

            'price': flight['price'],
            'departure': flight['departure'],
            'destination': flight['destination'],
            'departure_time': flight['departure_time'],
            'arrival_time': flight['arrival_time'],
            'airline': flight['airline']
        })

    return jsonify(flights_list)



if __name__ == '__main__':
    app.run(port=os.getenv("PORT", default=5000), host='0.0.0.0')
