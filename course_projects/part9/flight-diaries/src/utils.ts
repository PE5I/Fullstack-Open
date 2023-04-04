import { NewDiaryEntry, Weather } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
}

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error ('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const toNewDiaryEntry = (object: NewDiaryEntry): NewDiaryEntry => {
  const { date, weather, visibility, comment } = object;
  const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
  };

  return newEntry;
};

export default toNewDiaryEntry;