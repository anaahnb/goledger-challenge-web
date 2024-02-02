import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { CreateSong } from '@/utils/data';
import { ArtistContext } from '@/context/Artist';
import { AlbumContext } from '@/context/Album';

export default function SongForm() {
  const [formData, setFormData] = useState<CreateSong>({ title: '', albumKey: '', artistKeys: [], explicit: false });

  const { artists, fetchArtists } = useContext(ArtistContext);
  const { albums, fetchAlbums } = useContext(AlbumContext);

  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(''); 
  const router = useRouter();

  useEffect(() => {
    fetchArtists();
    fetchAlbums();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.artistKeys.length === 0) {
        throw new Error('Selecione pelo menos um artista.');
      }
  
      const response = await axios.post('http://ec2-44-204-53-62.compute-1.amazonaws.com/api/invoke/createAsset', {
        asset: [{
          "@assetType": "song",
          "album": {
            "@assetType": "album",
            "@key": formData.albumKey,
          },
          "artists": Array.isArray(formData.artistKeys) ? formData.artistKeys.map(artistKey => ({
            "@assetType": "artist",
            "@key": artistKey,
          })) : [],
          "explicit": formData.explicit,
          "title": formData.title,
        }]
      });
  
      console.log('Música criada com sucesso:', response.data);
      setSuccessMessage(true);
  
      setTimeout(() => {
        setSuccessMessage(false);
        router.push('/songs');
      }, 3000);
    } catch (error) {
      console.error('Erro ao criar música:', error);
      let errorMessage = 'Erro desconhecido ao criar música. Por favor, tente novamente.';
  
      if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      setTimeout(() => {
        setErrorMessage(errorMessage);
      }, 3000);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  
    if (name === 'artistKeys') {
      const selectElement = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(selectElement.selectedOptions).map((option: HTMLOptionElement) => option.value);
      setFormData(prevState => ({
        ...prevState,
        [name]: selectedOptions
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  return (
    <form className="lg:mx-72 md:mx-0 md:px-24 max-2xl py-10" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-bold  leading-7 text-gray-900">Adicionar nova música</h2>

          {successMessage && (
            <div className="p-4 my-4 max-w-xl text-sm text-lime-800 rounded-lg bg-lime-50" role="alert">
              <span className="font-medium">Música criada com sucesso!</span> Você será redirecionado em alguns segundos.
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
                  placeholder="Digite o título da música"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="albumKey" className='block text-sm font-medium leading-6 text-gray-900'>
                Álbum 
              </label>
              <div className='mt-2'>
                <select 
                  name="albumKey" 
                  value={formData.albumKey} 
                  onChange={handleChange} 
                  className='block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6'>
                  
                  <option value="" disabled hidden>Selecione um álbum</option>
                  { albums ? albums.map(album => (
                    <option key={album.id} value={album.id}>
                      {album.title}
                    </option>
                    )) : null}
                </select>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="artistKeys" className="block text-sm font-medium leading-6 text-gray-900">
                Artista
              </label>
              <div className="mt-2">
              <select
                name="artistKeys"
                value={formData.artistKeys}
                onChange={handleChange}
                multiple 
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
            <div className="sm:col-span-2">
              <label htmlFor="explicit" className="block text-sm font-medium leading-6 text-gray-900">
                Explícita
              </label>
              <div className="mt-2 flex items-center">
                <input
                  name="explicit"
                  type="checkbox"
                  checked={formData.explicit}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-700 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Sim, é uma música explícita.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href="/song" type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancelar
        </a>
        <button
          type="submit"
          className="rounded-sm bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Criar música
        </button>
      </div>
    </form>
  );
}
