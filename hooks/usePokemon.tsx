import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "@/app/PokemonList";

async function fetchPokemon(): Promise<Pokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();
  const detailPromises = data.results.map(async (item: { url: string }) => {
    const response = await fetch(item.url);
    return response.json();
  });

  return Promise.all(detailPromises);
}

export function usePokemon() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemon,
    staleTime: 1000 * 60 * 5,
  });
}
