import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function ArtistForm() {
  const [formData, setFormData] = useState({ name: '', about: '' });
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://ec2-44-204-53-62.compute-1.amazonaws.com/api/invoke/createAsset', {
        asset: [{
          "@assetType": "artist",
          "name": formData.name,
          "about": formData.about,
        }]
      });
      console.log('Artista criado com sucesso:', response.data);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
        router.push('/artist');
      }, 3000);
    } catch (error) {
      console.error('Erro ao criar artista:', error);
      let errorMessage = 'Erro desconhecido ao criar artista. Por favor, tente novamente.';
    
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          errorMessage = 'Já existe um artista com esse nome.';
        } else {
          errorMessage = 'Erro ao criar artista. Por favor, tente novamente.';
        }
      }
      setTimeout(() => {
        setErrorMessage(errorMessage);
      }, 3000);
    }
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="lg:mx-72 md:mx-0 md:px-24 max-2xl py-10" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-bold  leading-7 text-gray-900">Adicionar novo artista</h2>

          {successMessage && (
            <div className="p-4 my-4 max-w-xl text-sm text-lime-800 rounded-lg bg-lime-50" role="alert">
              <span className="font-medium">Artista criado com sucesso!</span> Você será redirecionado em alguns segundos.
            </div>
          )}

          {errorMessage && (
            <div className="p-4 my-4 max-w-xl text-sm text-red-800 rounded-lg bg-red-50" role="alert"> {/* Estilizar mensagem de erro */}
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Nome
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite o nome do artista"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Descrição
              </label>
              <div className="mt-2">
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Digite uma breve descrição sobre o artista"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600"> Você pode adicionar a biografia do artista</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href="/artist" type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancelar
        </a>
        <button
          type="submit"
          className="rounded-sm bg-orange-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Criar artista
        </button>
      </div>
    </form>
  );
}
