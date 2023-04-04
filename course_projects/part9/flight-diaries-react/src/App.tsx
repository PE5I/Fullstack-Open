import { useEffect, useState } from "react";
import axios from "axios";

const getDiaries = async () => {
  const diaryEntries = await axios.get('http://localhost:3001/api/diaries');
  console.log(diaryEntries);
  return diaryEntries;
}

interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string
}

const RenderDiary = (props: { entry: Diary }) => {
  console.log("entry", props.entry);
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

  // let diaryEntries: Diary[] = [];
  useEffect(() => {
      axios.get<Diary[]>('http://localhost:3001/api/diaries').then(response => {
        setEntries(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Add new entry</h1>
      <form>
        date <input onChange={({ target }) => setDate(target.value)}/>
        <br/>
        visibility <input onChange={({ target }) => setViz(target.value)}/>
        <br/>
        weather <input onChange={({ target }) => setWeather(target.value)}/>
        <br/>
        comment <input onChange={({ target }) => setComment(target.value)}/>
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
