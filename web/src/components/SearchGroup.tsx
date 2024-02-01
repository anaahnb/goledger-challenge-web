"use client";

import React from "react";
import Link from "next/link";
import Button from "./Button";

interface SearchGroupProsps {
  onSearch: (term: string) => void; // Adicione uma prop para lidar com a busca
  placeholder: string; 
  hrefCreate: string;
}

export default function SearchGroup({ onSearch, placeholder, hrefCreate }: SearchGroupProsps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    onSearch(term); // Chame a função de busca com o termo digitado pelo usuário
  };

  return (
    <div className="flex gap-6 items-center pb-20">
      <input 
        className="w-96 bg-zinc-100 rounded-sm px-5 py-4 text-lg shadow-sm border-0 focus:ring-0 placeholder:text-zinc-500" 
        placeholder={placeholder} 
        type="text" 
        onChange={handleSearch} // Adicione um evento de mudança para capturar o texto digitado
      />
      <span className="font-bold text-zinc-900 text-lg">ou</span>
      <Link href={hrefCreate}>
        <Button text="Faça o seu próprio upload"/>
      </Link>
    </div>
  );
}
