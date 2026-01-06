"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  height: number;
}

interface PokemonListaProps {
  pokemons: Pokemon[];
}

export function PokemonLista({ pokemons }: PokemonListaProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handlePokemonClick = (pokemonsName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pokemon", pokemonsName);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!pokemons) return <p>Pokémon não encontrado.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
      {pokemons.map((pokemon) => (
        <Card
          onClick={() => handlePokemonClick(pokemon.name)}
          key={pokemon.id || pokemon.name}
          className="flex flex-col items-center hover:scale-105 transition-transform border-none shadow-xl dark:bg-zinc-900"
        >
          <CardHeader className="items-center justify-center w-full">
            <div className="relative w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center border-4 border-red-500 mb-2">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-32 h-32 rendering-pixelated"
              />
            </div>
            <CardTitle className="text-center capitalize text-3xl font-bold text-black dark:text-white">
              {pokemon.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center w-full gap-4">
            <div className="flex gap-2">
              {pokemon.types.map((item) => (
                <span
                  key={item.type.name}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-1 text-sm uppercase"
                >
                  {item.type.name}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-8 text-zinc-600 dark:text-zinc-400 w-full text-center border-t pt-4">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-black dark:text-white">
                  {pokemon.weight / 10}kg
                </span>
                <span className="text-xs uppercase">Peso</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-black dark:text-white">
                  {pokemon.height / 10}m
                </span>
                <span className="text-xs uppercase">Altura</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
