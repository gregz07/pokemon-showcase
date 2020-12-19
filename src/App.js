import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import PokemonList from './components/pokemon-list';
import PokemonDetail from './components/pokemon-detail'
import loading from './components/loading';
import { getPokemons } from './services/poke-service'

import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import { Row, Col } from 'react-flexbox-grid';

function App() {
  return (
    <Router>
      <Route exact={true} path="/" component={Main}/>
      <Route path="/pokemon/:pokeId" component={PokemonDetail}/>
    </Router>
  );
}

const Main = (props) => {
  const history = useHistory();
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [appState, setAppState] = useState({
    loading: false,
    pokemons: null
  });

  const PokemonListLoading = loading(PokemonList);

  useEffect(() => {
      setAppState({ loading: true });
      
      // Set previous state
      if (history.action === 'REPLACE' && history.location.state) {
        setOffset(history.location.state.offset)
        setPageSize(history.location.state.pageSize)
      }

      getPokemons(offset, pageSize)
        .then((result) => {
          const allPokemons = result.data; 
          setAppState({ loading: false, pokemons: allPokemons });
        });
    },
    [offset, pageSize, setAppState] 
  );

  return (
    <Row>
      <Col xs={12}>
        <Row center="xs" className="App-header">
          <Col xs={6} className="header-wrapper-image">
            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"}/>
          </Col>
        </Row>
        <Row>
          <PokemonListLoading isLoading={appState.loading} pokemons={appState.pokemons} pageSize={pageSize} offset={offset} />
        </Row>
        <Row bottom="xs" >
          <Col xs={3} style={{padding: '2em'}}>
            <button onClick={() => setOffset(offset - pageSize)}> Prev </button>
            <button onClick={() => setOffset(offset + pageSize)}> Next </button>
          </Col>
          <Col xs={6}></Col> 
          <Col xs={3} style={{padding: '2em'}}>
              <ButtonToolbar aria-label="Toolbar with button groups" style={{float: 'right'}}>
                <ButtonGroup className="mr-2" aria-label="First group">
                  <Button className={`${pageSize === 10 ? 'pagesize-selected' : ''}`} onClick={() => setPageSize(10)}>10</Button> 
                  <Button className={`${pageSize === 20 ? 'pagesize-selected' : ''}`} onClick={() => setPageSize(20)}>20</Button> 
                  <Button className={`${pageSize === 30 ? 'pagesize-selected' : ''}`} onClick={() => setPageSize(30)}>30</Button> 
                  <Button className={`${pageSize === 40 ? 'pagesize-selected' : ''}`} onClick={() => setPageSize(40)}>40</Button> 
                </ButtonGroup>
              </ButtonToolbar>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default App;
