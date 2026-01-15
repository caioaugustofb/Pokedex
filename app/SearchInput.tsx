"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, X } from "lucide-react";

export function SearchInput() {
  const [urlSearch, setUrlSearch] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ shallow: false, scroll:false })
  );

  const [localTerm, setLocalTerm] = useState("");

  useEffect(() => {
    setLocalTerm(urlSearch || "");
  }, [urlSearch]);

  const handleSearch = () => {
    setUrlSearch(localTerm || null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  return (
    <InputGroup className="bg-white border-none mb-5 rounded-full w-full max-w-sm">
      <InputGroupInput
        placeholder="Buscar Pokémon..."
        value={localTerm}
        onChange={(e) => setLocalTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pr-10"
      />
      {localTerm && (
        <button
          onClick={() => {
            setLocalTerm("");
            setUrlSearch(null);
          }}
          className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors p-1"
        >
          <X size={16} />
        </button>
      )}
      <InputGroupAddon>
        <button
          onClick={handleSearch}
          className="hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <Search className="text-gray-500" />
        </button>
      </InputGroupAddon>
    </InputGroup>
  );
}
