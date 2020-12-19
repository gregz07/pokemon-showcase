import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from "react-dom/test-utils";
import PokemonList from './../components/pokemon-list';

it("renders user data", async () => {
  const fakePokemons = [{name: 'charizard', sprites:{front_default: ''}}, {name: 'bulbasaur', sprites:{front_default: ''}}];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakePokemons)
    })
  );

  const jsx = (
    <Router>
      <PokemonList pokemons={fakePokemons} />
      </Router>
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(jsx);
  });

  const linkElement = screen.getByText(/charizard/i);
  expect(linkElement).toBeInTheDocument();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});