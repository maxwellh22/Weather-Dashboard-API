import { Router, Request, Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request<{}, {}, { city: string }>, res: Response) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required.' });
    }
  // TODO: GET weather data from city name
  // TODO: save city to search history
  const weatherData = await WeatherService.getWeatherForCity(city);
  await HistoryService.addCity(city);
  return res.json(weatherData);
} catch (error) {
  console.error('Error in POST /api/weather:', error);
  return res.status(500).json({ error: 'Failed to fetch weather data. Please try again.' });
}
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    return res.json(history);
  } catch (error) {
    console.error('Error in getting api weather history', error);
    return res.status(500).json({ error: 'Failed to get search history. Please try again.' });
  }
});

// * BONUS TODO: DELETE city from search history


export default router;
