import axios from 'axios'

export type AddressData = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

export async function fetchAddressByCep(cep: string): Promise<AddressData> {
  try {
    const cleanedCep = cep.replace(/\D/g, '')
    const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`)
    
    if (response.data.erro) {
      throw new Error('CEP não encontrado')
    }
    
    return response.data
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    throw new Error('Erro, verifique o CEP digitado.')
  }
}