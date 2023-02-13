import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"
import { useState } from "react";

const Genre = ({ genre, setGenre }) => {
  return (
    <button value={genre} onClick={({target}) => setGenre(target.value)}>
      {genre}
    </button>
  )
}

const Books = () => {
  const [filterGenre, setFilterGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading ...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(b => filterGenre ? b.genres.includes(filterGenre) : b)
            .map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {Array.from(new Set(
          books.map(a => a.genres.flat())
          .flat()))
          .map(genre => <Genre key={genre} genre={genre} setGenre={setFilterGenre} />)  
        }
        <button onClick={() => setFilterGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
