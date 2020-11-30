import * as React from 'react'
let i = 0
function useLocalStorageState(
  key,
  initialState,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const value = window.localStorage.getItem(key)

    if (value) return deserialize(value)

    return typeof initialState === 'function' ? initialState() : initialState
  })

  const keyReference = React.useRef(key)

  React.useEffect(() => {
    const previousKey = keyReference.current

    if (previousKey !== key) {
      keyReference.current = key
      window.localStorage.removeItem(previousKey)
    }

    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(
    i++ < 5 ? 'name' : `name${i}`,
    initialName,
  )

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input defaultValue={initialName} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
