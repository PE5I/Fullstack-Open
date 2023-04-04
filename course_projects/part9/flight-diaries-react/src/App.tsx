import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

const addEntry = async (entryObject: NewDiaryEntry) => {
  const newEntry = await axios.post('http://localhost:3001/api/diaries', entryObject);
  return newEntry.data;
}

interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string
}

interface AxiosError extends Error {
  response: {
    data: {
      error: string
    }
  }
}

type NewDiaryEntry = Omit<Diary, 'id'>

const RenderDiary = (props: { entry: Diary }) => {
  return (
    <div>
      <b>{props.entry.date}</b>
      <p>
        visibility: {props.entry.visibility}
        <br/>
        weather: {props.entry.weather}
      </p>
    </div>
  )
}

const App = () => {
  const [date, setDate] = useState('');
  const [viz, setViz] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [entries, setEntries] = useState<Diary[]>([]);
  const [error, setError] = useState('');

  // let diaryEntries: Diary[] = [];
  useEffect(() => {
      axios.get<Diary[]>('http://localhost:3001/api/diaries').then(response => {
        setEntries(response.data)
      })
  }, [])

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault()
    const newEntry = {
      date,
      "visibility": viz,
      weather,
      comment
    }

    try {
      const entry = await addEntry(newEntry)
      setDate('')
      setViz('')
      setWeather('')
      setComment('')
      setEntries(entries.concat(entry))
      console.log("entry", entry);
    } catch (e: unknown) {
      let message = ''
      const error = e as AxiosError;
      // console.log(error.response.data.error)
      message += error.response.data.error
      setError(message)
      setTimeout(() => {
        message = ''
        setError('')
      }, 5000);
    }
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <p style={{color: "red"}}>{error}</p>
      <form onSubmit={handleAdd}>
        date <input value={date} onChange={({ target }) => setDate(target.value)}/>
        <br/>
        visibility <input value={viz} onChange={({ target }) => setViz(target.value)}/>
        <br/>
        weather <input value={weather} onChange={({ target }) => setWeather(target.value)}/>
        <br/>
        comment <input value={comment} onChange={({ target }) => setComment(target.value)}/>
        <br/>
        <button>
          add
        </button>
      </form>

      <h1>Diary entries</h1>
      {entries.length > 0 ? entries.map(c => <RenderDiary key={c.id} entry={c} />) : ''}
    </div>
  )
}

export default App;
