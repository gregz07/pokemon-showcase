import React from 'react'
import Card from 'react-bootstrap/Card'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';

const PokemonList = (props) => {
  const { pokemons, pageSize, offset } = props; 
  if (!pokemons || pokemons.length === 0) {
    return <p> 0 pokemons found .. </p>;
  }
  
  return (
      <Grid >
        <Row  middle="md" center="md"> 
          {
            pokemons.map(pokemon => {
              return (
                <Col xs={6} md={3} key={pokemon.name}>
                  <Card style={{ 'textAlign': 'center' }}>
                    <Card.Img variant="top" src={pokemon.sprites.front_default} />
                    <Card.Body>
                      <Card.Title> <Link to={{
                        pathname: `/pokemon/${pokemon.id}`,
                        state: {
                          detail: pokemon,
                          pageSize: pageSize,
                          offset: offset
                        }
                      }}> {pokemon.name} </Link></Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          }
        </Row>
      </Grid>
  );
}

export default PokemonList;