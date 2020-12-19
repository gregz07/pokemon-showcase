import React from 'react'; 
import { Row, Col, Grid } from 'react-flexbox-grid';
import { useHistory } from "react-router-dom";

const PokemonDetail = (props) => {
  const { detail } = props.location.state;

  // Save previous pagination state
  const history = useHistory();
  function goBack() {
    history.replace('/', {
      pageSize: props.location.state.pageSize,
      offset: props.location.state.offset
    })
    history.goBack();
  }

  return (
    <div>
      <Row>
        <Col xsOffset={1} xs={11} > <button onClick={goBack}>back</button> </Col>
      </Row>
      <Row center="md" >
        <Col xs={12}>
          <Row  center="xs" bottom="xs">
            <div>
              <img src={detail.sprites.front_default} height='300px' width='300px'></img>
              <h1> {detail.name.toUpperCase()}</h1>
            </div>
          </Row>
          <Row center="xs">
            <Grid fluid>
              <Row center="xs"> <h3>Type</h3> </Row>
              <Row between="xs" center="xs">
                {
                  detail.types.map(function(t) {
                    let colSize = 12 / detail.types.length;
                    return (
                      <Col xs={colSize} className={`type ${t.type.name} type-text`}> {t.type.name} </Col>
                    )
                  })
                }
              </Row>
              <Row center="xs"> <h3>Measurements</h3> </Row>
              <Row between="xs" center="xs">
                <Col xs={6}>{detail.height/10}m</Col>
                <Col xs={6}>{detail.weight}kg</Col>
              </Row>
              <Row center="xs"> <h3>Abilities</h3> </Row>
              <Row between="xs" center="xs">
                {
                  detail.abilities.map(function(a) {
                    let colSize = 12 / detail.abilities.length;
                    return (
                      <Col xs={colSize}> {a.ability.name} </Col>
                    )
                  })
                }
              </Row>
              <Row center="xs"> <h3>Stats</h3> </Row>
              <Row >
                <Col xs={4} className="stat_hp">
                  {detail.stats[0].base_stat}
                  <br/>
                  <small>HP</small>
                </Col>
                <Col xs={4} className="stat_atk"> 
                  {detail.stats[1].base_stat}
                  <br/>
                  <small>Atk</small>
                </Col>
                <Col xs={4} className="stat_def">
                  {detail.stats[2].base_stat}
                  <br/>
                  <small>Def</small>
                </Col>
              </Row>
              <Row>
              <Col xs={4} className="stat_spatk">
                  {detail.stats[3].base_stat}
                  <br/>
                  <small>Sp.Atk</small>
                </Col>
                <Col xs={4} className="stat_spdef"> 
                  {detail.stats[4].base_stat}
                  <br/>
                  <small>Sp.Def</small>
                </Col>
                <Col xs={4} className="stat_speed">
                  {detail.stats[5].base_stat}
                  <br/>
                  <small>Speed</small>
                </Col> 
              </Row>
            </Grid>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default PokemonDetail;