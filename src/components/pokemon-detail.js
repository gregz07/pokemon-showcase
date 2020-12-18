import React from 'react'

const PokemonDetail = (props) => {
  const { detail } = props.location.state;
  console.log(detail)
  return (
    <div>
      <h1> Detail </h1>
  
    </div>
  )
}

export default PokemonDetail;