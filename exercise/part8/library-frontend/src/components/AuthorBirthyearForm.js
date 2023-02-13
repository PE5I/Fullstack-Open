import Select from 'react-select'
import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const AuthorBirthyearForm = () => {
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')

  let authors = useQuery(ALL_AUTHORS)
  const [ changeAuthorBirthyear, result ] = useMutation(EDIT_AUTHOR)
  
  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found')
    }

  }, [result.data])
  
  if (authors.loading) {
    return <div>loading...</div>
  }

  authors = authors.data.allAuthors.map(author => { return { value: author.name, label: author.name }})

  const submit = (event) => {
    event.preventDefault()
    changeAuthorBirthyear({ variables: { name, bornYear }})

    setName('')
    setBornYear('')
  }

  return (
    <div>
      <h2>Set author birth year</h2>
      <form onSubmit={submit}>
        <div>
          <Select options={authors} onChange={(e) =>  setName(e.value)}/>
        </div>
        <div>
          birth year <input value={bornYear}
            onChange={({target}) => {
              const re = /^[0-9\b]+$/
              if (target.value === '' || re.test(target.value))
                setBornYear(Number(target.value))
            }}
            />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  )
}

export default AuthorBirthyearForm