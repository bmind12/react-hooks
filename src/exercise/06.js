import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) return

    setState(state => ({
      ...state,
      status: 'pending',
      pokemon: null,
      error: null,
    }))
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState(state => ({
          ...state,
          status: 'resolved',
          pokemon: pokemonData,
        }))
      })
      .catch(error => {
        setState(state => ({...state, status: 'rejected', error: error}))
      })
  }, [pokemonName])

  switch (state.status) {
    case 'idle':
    default:
      return 'Submit a pokemon'
    case 'rejected':
      throw state.error
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={state.pokemon} />
  }
}

function ErrorComponent(props) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{props.error?.message}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
