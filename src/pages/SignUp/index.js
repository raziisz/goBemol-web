import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import axios from 'axios';
import { FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';


import InputText from '../../components/InputText';
import SelectInput from '../../components/SelectInput';

const SignUp = () => {
  const [values, setValues] = useState({});
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => ({value: uf.sigla, label: uf.nome}));

      setUfs(ufInitials);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${values.estado}/municipios`).then(response => {
      const citiesIbge = response.data.map(city => ({value: city.nome, label: city.nome}));

      setCities(citiesIbge);
    }).catch(err => console.log(err));
  }, [values.estado]);

  const handleClickCep = useCallback(async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/69087054/json/`);
      const data = response.data;
      setValues(prev => {
        return {
          ...prev,
          endereco: `${data.logradouro}, ${data.bairro}`,
          estado: data.uf,
          cidade: data.localidade
        }
      })
    } catch (error) {
      console.log('errow', error);
      toast.error('houve um erro ao buscar os dados no CEP');
    }
  }, [])
  return (
    <main className="container-fluid">
      <h3 className="mt-3 title">Venha ser um Bemolover <span> <FiHeart color="#FF0000"/> </span> </h3>
      <p class="text-info">
        Faça a sua conta e tenha acesso em toda as nossas plataformas.
      </p>
      <form className="form-new card mt-3 py-3 px-5 row">
        <InputText 
          label="Nome" 
          type="text"
          onChange={e => setValues(prev => ({...prev, nome: e.target.value}))}
          value={values.nome}
        />
        <InputText 
          label="Sobrenome" 
          type="text"
          onChange={e => setValues(prev => ({...prev, sobrenome: e.target.value}))}
          value={values.sobrenome}
        />
        <InputText 
          label="Email" 
          type="email"
          onChange={e => setValues(prev => ({...prev, email: e.target.value}))}
          value={values.email}
        />
        <InputText 
          label="Senha" 
          type="text"
          onChange={e => setValues(prev => ({...prev, password: e.target.value}))}
          value={values.password}
        />
        <InputText 
          label="CEP" 
          type="text" 
          inputGroup 
          onChange={(e) => setValues(prev => ({...prev, cep: e}))}
          onClick={handleClickCep} 
          value={values.cep} 
          placeholder="Digite seu CEP"
          textUnder={"Ao digitar um CEP válido clique na lupa para carregar o restante do endereço."}
          maxLength={8}
        />
        <InputText 
          label="Endereço" 
          type="text"
          onChange={e => setValues(prev => ({...prev, endereco: e.target.value}))}
          value={values.endereco}
          />
        <InputText 
          label="Número" 
          type="text"
          onChange={e => setValues(prev => ({...prev, numero: e.target.value}))}
          value={values.numero}
        />
        <SelectInput 
          label="Estado" 
          onChange={e => setValues(prev => ({...prev, estado: e.target.value}))}
          value={values.estado}
          options={ufs}
        />
        <SelectInput 
          label="Cidade" 
          onChange={e => setValues(prev => ({...prev, cidade: e.target.value}))}
          value={values.cidade}
          options={cities}
        />
        <div className="buttons">
          <button className="btn btn-danger">Cancelar</button>
          <button className="btn btn-primary">Salvar</button>
        </div>
      </form>
    </main>
  )
}

export default SignUp;