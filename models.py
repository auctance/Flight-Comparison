import requests
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()

class Flight(db.Model):
    __tablename__ = 'flights'

    id = db.Column(db.Integer, primary_key=True)
    airline = db.Column(db.String(64), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    departure = db.Column(db.String(64), nullable=False)
    destination = db.Column(db.String(64), nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    arrival_time = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<Flight {self.id}: {self.airline} ({self.departure} to {self.destination})>"

    @staticmethod
    def get_flight_data(departure, destination, start_date, end_date):
        # ctrip api don't use start_date and end_date, but two dates can restrict results
        api_url = 'https://flights.ctrip.com/itinerary/api/12808/lowestPrice'
        params = {
            'flightWay': 'Oneway',
            'dcity': departure,
            'acity': destination,
            'direct': 'true',
            'army': 'false'
        }

        response = requests.get(api_url, params=params)
        data = response.json()

        # # test
        # data = {'data': {'oneWayPrice': [
        #     {'20230423': 500, '20230424': 410, '20230425': 380, '20230426': 320, '20230427': 500, '20230428': 920,
        #      '20230429': 950, '20230430': 510, '20230501': 298, '20230502': 528, '20230503': 931, '20230504': 425,
        #      '20230505': 298, '20230506': 298, '20230507': 298, '20230508': 249, '20230509': 229, '20230510': 229,
        #      '20230511': 229, '20230512': 249, '20230513': 229, '20230514': 249, '20230515': 229, '20230516': 298,
        #      '20230517': 298, '20230518': 298, '20230519': 298, '20230520': 298, '20230521': 298, '20230522': 298,
        #      '20230713': 1163, '20230714': 1151, '20230715': 1123,
        #      '20230716': 1123, '20230717': 1123, '20230718': 1123, '20230719': 1123, '20230720': 1151, '20230721': 1123,
        #      '20230722': 1123}], 'roundTripPrice': None, 'singleToRoundPrice': None}, 'status': 0, 'msg': 'success'}
        # # test

        flights = []
        for flight_date, price in data['data']['oneWayPrice'][0].items():
            departure_time = datetime.strptime(flight_date, '%Y%m%d')
            arrival_time = departure_time  # Assuming all flights are same day
            flight_obj = {'airline': departure, 'price': price, 'departure': departure, 'destination': destination,
                          'departure_time': departure_time, 'arrival_time': arrival_time}

            # restrict date from start_date to end_date
            d_start_date = datetime.strptime(start_date, '%Y-%m-%d')
            d_end_date = datetime.strptime(end_date, '%Y-%m-%d')

            if departure_time>=d_start_date and departure_time<=d_end_date:
                flights.append(flight_obj)

        flights_sorted = sorted(flights, key=lambda f: f['price'])

        return flights_sorted
