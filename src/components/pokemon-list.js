import React from 'react'
import Card from 'react-bootstrap/Card'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';

const PokemonList = (props) => {
  const { pokemons } = props; 
  if (!pokemons || pokemons.length === 0) {
    return <p> 0 pokemons found .. </p>;
  }
  
  return (
      <Grid fluid >
        <Row  middle="md" center="md" style={{ height: '100vh' }}> 
          {
            pokemons.map(pokemon => {
              return (
                <Col xs={6} md={3}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={pokemon.sprites.front_default} />
                    <Card.Body>
                      <Card.Title> <Link to={{
                        pathname: `/pokemon/${pokemon.id}`,
                        state: {
                          detail: pokemon
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