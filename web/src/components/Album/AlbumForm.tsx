"use client";

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ArtistContext } from '@/context/Artist';

export default function AlbumForm() {
  const [formData, setFormData] = useState({ title: '', artistKey: '', rating: 0, releaseDate: '' });
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { artists, fetchArtists } = useContext(ArtistContext); // Use o contexto do artista aqui
  const router = useRouter();

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formattedReleaseDate = new Date(formData.releaseDate).toISOString();
      const response = await axios.post('http://ec2-44-204-53-62.compute-1.amazonaws.com/api/invoke/createAsset', {
        asset: [{
          "@assetType": "album",
          "artist": {
            "@assetType": "artist",
            "@key": formData.artistKey,
          },
          "rating": formData.rating,
          "releaseDate": formattedReleaseDate,
          "title": formData.title,
        }]
      });

      console.log('Álbum criado com sucesso:', response.data);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
        router.push('/albums');
      }, 3000);
    } catch (error) {
      console.log(formData);
      console.error('Erro ao criar álbum:', error);
      let errorMessage = 'Erro desconhecido ao criar álbum. Por favor, tente novamente.';
    
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          errorMessage = 'Já existe um álbum com esse título.';
        } else {
          errorMessage = 'Erro ao criar álbum. Por favor, tente novamente.';
        }
      }
      setTimeout(() => {
        setErrorMessage(errorMessage);
      }, 3000);
    }
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="lg:mx-72 md:mx-0 md:px-24 max-2xl py-10" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-bold  leading-7 text-gray-900">Adicionar novo álbum</h2>

          {successMessage && (
            <div className="p-4 my-4 max-w-xl text-sm text-lime-800 rounded-lg bg-lime-50" role="alert">
              <span className="font-medium">Álbum criado com sucesso!</span> Você será redirecionado em alguns segundos.
            </div>
          )}

          {errorMessage && (
            <div className="p-4 my-4 max-w-xl text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Título
              </label>
              <div className="mt-2">
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Digite o título do álbum"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                Classificação
              </label>
              <div className="mt-2">
                <input
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Digite a classificação do álbum"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="releaseDate" className="block text-sm font-medium leading-6 text-gray-900">
                Data de lançamento
              </label>
              <div className="mt-2">
                <input
                  name="releaseDate"
                  type="date"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  placeholder="Selecione a data de lançamento do álbum"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="artistKey" className="block text-sm font-medium leading-6 text-gray-900">
                Artista
              </label>
              <div className="mt-2">
                <select
                  name="artistKey"
                  value={formData.artistKey}
                  onChange={handleChange}
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled hidden>Selecione um artista</option>
                  {artists ? artists.map(artist => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  )) : null}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href="/albums" type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancelar
        </a>
        <button
          type="submit"
          className="rounded-sm bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Criar álbum
        </button>
      </div>
    </form>
  );
}
