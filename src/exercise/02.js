import * as React from 'react'

function useLocalStorageState(key, value) {
  window.localStorage.setItem(key, value)
}

function Greeting({initialName = ''}) {
  const [name, setName] = React.useState(() =>
    window.localStorage.getItem('name'),
  )

  useLocalStorageState('name', name)

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
