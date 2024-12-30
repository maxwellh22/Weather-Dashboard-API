import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  description: string;

  constructor(
    city: string,
    date: string,
    temperature: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    description: string
  ) {
    this.city = city;
    this.date = date;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.description = description;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || 'https://api.openweathermap.org/data/2.5';
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
    this.cityName = '';
    if (!this.apiKey) {
      throw new Error('Missing API key for OpenWeather API.');
    } if (!this.baseURL) {
      throw new Error('Missing base URL for OpenWeather API.');
    }
  }
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const url = this.buildGeocodeQuery(query);
    console.log('Fetching location data from URL:', url);
    const response = await axios.get(url);
    const { coord } = response.data;
    return { lat: coord.lat, lon: coord.lon };
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(cityName: string): string {
    return `${this.baseURL}/weather?q=${encodeURIComponent(cityName)}&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(cityName: string): Promise<Coordinates> {
    if (!this.cityName) {
      throw new Error('City name is not set. Please provide a city name.');
    }
    const locationData = await this.fetchLocationData(cityName);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await axios.get(url);
    return response.data;
  }
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any): Weather {
    const { city: cityInfo, list } = response;
    const current = list[0];
    return new Weather(
      cityInfo.name,
      current.dt_txt,
      current.main.temp,
      current.wind.speed,
      current.main.humidity,
      current.weather[0].icon,
      current.weather[0].description
    );
  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const cityName = currentWeather.city;
    return weatherData.map(
      (forecast: any) =>
        new Weather(
          cityName,
          forecast.dt_txt,
          forecast.main.temp,
          forecast.wind.speed,
          forecast.main.humidity,
          forecast.weather[0].icon,
          forecast.weather[0].description
        )
    );
  }
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string): Promise<{ current: Weather; forecast: Weather[] }> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);

    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecast = this.buildForecastArray(currentWeather, weatherData.list);

    return { current: currentWeather, forecast };
  }
}


export default new WeatherService();
