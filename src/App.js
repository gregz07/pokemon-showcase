import React, { useEffect, useState } from 'react';
import './App.css';
import PokemonList from './components/pokemon-list';
import PokemonDetail from './components/pokemon-detail'
import loading from './components/loading';
import pokeService from './services/poke-service'

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route exact={true} path="/" component={Main}/>
      <Route path="/pokemon/:pokeId" component={PokemonDetail}/>
    </Router>
  );
}

const Main = (props) => {
  const PokemonListLoading = loading(PokemonList);
  const [appState, setAppState] = useState({
    loading: false,
    pokemons: null,
  });
  
  useEffect(() => {
      setAppState({ loading: true });
      
      pokeService()['GET_POKEMONS']
        .then((result) => {
          const allPokemons = result.data; 
          setAppState({ loading: false, pokemons: allPokemons });
        });
    }, 
    [setAppState]
  );

  return (
    <div>
      <PokemonListLoading isLoading={appState.loading} pokemons={appState.pokemons} />
    </div>
  );
}

export default App;
