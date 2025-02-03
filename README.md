# WeatherApp

<img width="1132" alt="Screenshot 2025-02-01 at 4 41 27 PM" src="https://github.com/user-attachments/assets/55734534-fdc2-41ef-8962-3fa413ec459e" />

## Overview
The Weather App is a web application that allows users to search for weather conditions in any city worldwide. It fetches real-time weather data using the OpenWeatherMap API and displays relevant details such as temperature, weather conditions, and country information.

## Features
* Search for weather by city name
* Displays temperature in Celsius
* Shows weather conditions with icons
* Checks for duplicate city entries
* Provides user-friendly notifications
* Responsive design for different screen sizes

## Technologies Used
* HTML - For structuring the web page
* CSS - For styling the user interface
* JavaScript - For dynamic content and API handling
* OpenWeatherMap API - For fetching real-time weather data
* Google Fonts - For enhanced typography

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/LALITH0110/weather-app.git
   ```
2. Navigate to the project folder:
   ```
   cd weather-app
   ```
3. Open _index.html_ in a web browser.

## Usage
* Enter the name of a city in the search bar (enter city,country-code(two-digits) for a same city name in different countries).
* Click the search button to fetch weather details.
* The app displays temperature, weather conditions, and location information.
* If the city is already added, a notification will inform you.

## API Configuration
This app uses OpenWeatherMap API. To run it successfully:
1. Sign up at OpenWeatherMap and obtain an API key.
2. Replace the apikey variable in _app.js_ with your API key:
   ```
   const apikey = 'YOUR_API_KEY_HERE';
   ```

## Author
Developed and maintained by [Lalith Kothuru](https://github.com/LALITH0110).
