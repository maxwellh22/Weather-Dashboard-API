Weather Dashboard API

This is a full-stack weather dashboard application that allows users to search for current and forecasted weather conditions in various cities -- this was built using a variety of technologies including TypeScript, Express.js, Vite, and utilizing the OpenWeather API.

Table of Contents
- Features
- Installation
- Usage
- API Routes
- Testing
- Technologies Used
- License

Features
- Search for a city to get a current and 5-day forecast of weather data for the city you selected
- Displays temperature, humidity, wind speed, and weather conditions for the selected city
- Once you search for a city, your search history is saved to local storage and displayed on the page
- If you want to look at a city's weather data that you have previously searched for, simply click on it to reload that city's data.

Installation
- Clone the repository by visiting my Github page and accessing the appropriate link on the "Code" page
- Install necessary dependencies by navigating to the correct "server" and "client" folders and running "npm install"
- Create a .env file in the "server" directory with the following structure:

API_BASE_URL=https://api.openweathermap.org/data/2.5
API_KEY=your_openweather_api_key_here
- Be sure to restart and rerun your "npm run dev" commands after creating your .env file

Usage
- Navigate to the Backend Server within the project folder and run "npm run dev". Must be running to make API calls.
- Navigate to the Frontend Client folder within the project root folder and run "npm run dev"
- Visit http://localhost:3000/ or load the application on Render to use the weather dashboard

Testing
- Test the Backend API using Postman:
1. POST /api/weather with a city name
2. GET /api/weather/history to see stored searches

- Test the Frontend either on Render or on your localhost:
1. Inspect the page on your Google Chrome browser
2. Search for a city
3. Verify that the API request is successful, that the UX/UI is responsive to your searches, and that any cities that are searched for are being saved and rendered on the page

Technologies Used:
- API: OpenWeather API
- Database: JSON file storage
- Build Tools: Vite, Nodemon
- Frontend: Vite, Typescript, HTML, CSS
- Backend: Node.js, Express.js, Typescript

License
- This project is available under the MIT License

Use on Render:
- Link to live backend on Render: https://weather-dashboard-api-z8xv.onrender.com
- Link to live Frontend Application: https://weather-dashboard-api-app.onrender.com/

Contact
- Maxwell Hurst
- Email: maxwell.hurst22@gmail.com
- GitHub: maxwellh22