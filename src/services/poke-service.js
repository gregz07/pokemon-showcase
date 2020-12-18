import axios from 'axios'

function pokeService() {

  return {
    "GET_POKEMONS": new Promise((resolve, reject) => {
      let url = 'https://pokeapi.co/api/v2/pokemon/';
      axios
        .get(url)
        .then(response => {
          let promises = response.data.results.map(r => axios.get(`https://pokeapi.co/api/v2/pokemon/${r.name}/`));
          axios
            .all(promises)
            .then(responses => {
              let result = { 
                data: responses.map(r => r.data), 
                next: response.data.next, 
                previous: response.data.previous 
              };
              resolve(result);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    })
  } 
}

export default pokeService;