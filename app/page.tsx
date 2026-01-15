import Image from "next/image";
import { PokemonLista } from "@/app/PokemonList";
import { type Pokemon } from "@/app/PokemonList";
import { SearchInput } from "./SearchInput";
import { searchParamsCache } from "./SearchParams";

async function getPokemon(): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
  const data = await res.json();
  const detailPromises = data.results.map(async (item: { url: string }) => {
    const response = await fetch(item.url);
    return response.json();
  });

  const pokemonDetails = await Promise.all(detailPromises);
  return pokemonDetails;
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const { q }: { q: string } = searchParamsCache.parse(resolvedParams);
  const allPokemon = await getPokemon();
  const filteredPokemon =
    allPokemon?.filter((pokemon) => pokemon.name.toLowerCase().includes(q)) ||
    [];

  return (
    <main className="relative min-h-screen w-full bg-red-600 font-sans dark:bg-black overflow-hidden">
      <div
        className="absolute top-[-60px] left-0 w-full h-[50vh] bg-cover bg-center opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url('/pikachu.svg')",
          backgroundSize: "1300px",
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center py-10 w-full">
        <Image
          src="/pokemon.svg"
          alt="Pokemon title"
          width={400}
          height={400}
        />
        <div className="flex items-center gap-4 my-5 bg-white px-8 py-4 rounded-full shadow-2xl">
          <Image
            src="/pokeball.svg"
            alt="Pokeball logo"
            width={40}
            height={40}
          />
          <h1 className="text-3xl font-bold text-red-600">Pokédex</h1>
        </div>

        <div className="flex justify-center w-96 mb-5 relative">
          <SearchInput />
        </div>

        <div className="text-white mb-5 font-semibold">
          {q
            ? `Resultados para "${q}": ${filteredPokemon.length}`
            : `Exibindo todos: ${filteredPokemon.length}`}
        </div>

        <PokemonLista pokemons={filteredPokemon} />
      </div>
    </main>
  );
}
