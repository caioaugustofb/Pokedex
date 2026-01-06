"use client";

import { usePokemon } from "@/hooks/usePokemon";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PokemonLista } from "@/app/PokemonList";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Search, Loader2, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Home() {
  const { data: allPokemon, isLoading, isError } = usePokemon();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlTerm = searchParams.get("q")?.toString() || "";
  const [textInput, setTextInput] = useState(urlTerm);
  useEffect(() => {
    setTextInput(urlTerm);
  }, [urlTerm]);
  const searchUpdate = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (textInput) {
      params.set("q", textInput);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchUpdate();
    }
  };
  const filteredPokemon =
    allPokemon?.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(urlTerm.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-red-600">
        <Loader2 className="animate-spin text-white w-10 h-10" />
        <span className="text-white ml-2">Caching Pokémon...</span>
      </div>
    );
  }

  if (isError) return <div>Erro ao carregar.</div>;

  return (
    <div className="flex min-h-screen flex-col items-center bg-red-600 font-sans dark:bg-black py-10">
      <div className="flex items-center gap-4 mb-5 bg-white px-8 py-4 rounded-full shadow-xl">
        <Image src="/pokeball.svg" alt="Pokeball logo" width={40} height={40} />
        <h1 className="text-3xl font-bold text-red-600">
          Pokedéx do Prof. Caio
        </h1>
      </div>
      <div className="flex justify-center w-96 mb-5">
        <InputGroup className="bg-white rounded-full">
          <InputGroupInput
            placeholder="Buscar Pokémon..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {textInput && (
            <button
              onClick={() => {
                setTextInput("");
                router.replace(pathname);
              }}
              className="absolute right-12 top-1/2 -translate-y-1/2 p-1"
            >
              <X className="w-4 h-4 text-grey-500" />
            </button>
          )}
          <InputGroupAddon>
            <button onClick={searchUpdate}>
              <Search className="text-gray-500" />
            </button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="text-white mb-5">
        {urlTerm
          ? `Resultados para "${urlTerm}": ${filteredPokemon.length}`
          : `Exibindo todos: ${filteredPokemon.length}`}
      </div>
      <PokemonLista pokemons={filteredPokemon} />
    </div>
  );
}
