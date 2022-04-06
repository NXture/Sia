#!/usr/bin/env python
# -*- coding:utf-8 -*-

import requests
import utils


def run(string, entities):

    API_Key = utils.config('api_key')
    location = "Bangalore"
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid="
    final_url = weather_url + API_Key

    weather_data = requests.get(final_url)
    x = weather_data.json()

    if x["cod"] != "404":
        y = x["main"]
        current_temperature = y["temp"]
        current_temp_celsius = round(current_temperature - 273.25, 2)
        current_pressure = y["pressure"]
        current_humidity = y["humidity"]
        z = x["weather"]
        weather_description = z[0]["description"]

    return utils.output('end', 'weather_checked', f'In Bangalore, temperature is around {current_temp_celsius} Celsius, humidity is {current_humidity} %, atmospheric pressure is {current_pressure} hPa, and {weather_description}')
