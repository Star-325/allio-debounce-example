import React from 'react'
import { debounce } from 'lodash'
import './App.css'

type Character = {
  name: string;
}

export default function App() {
  const [characters, setCharacters] = React.useState<string[]>([])

  async function search(criteria: string) {
    const response = await fetch(`https://swapi.dev/api/people/?search=${criteria}`)
    const body = await response.json()
    return body.results.map((result: Character) => result.name)
  }

  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      setCharacters(await search(criteria))
    }, 300)
  ).current

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('HandleChangeFunction is Called!!!')
    debouncedSearch(e.target.value)
  }

  return (
    <div className="App">
      <input
        type="search"
        placeholder="Enter your search"
        onChange={handleChange}
      />
      <ul>
        {characters.map((character) => (
          <ul key={character}>{character}</ul>
        ))}
      </ul>
    </div>
  )
}
