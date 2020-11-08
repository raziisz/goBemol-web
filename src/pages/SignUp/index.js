import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import axios from 'axios';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import InputText from '../../components/InputText';
import SelectInput from '../../components/SelectInput';
import Loading from '../../components/Loading';

const SignUp = () => {
  const [values, setValues] = useState({});
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
    const { cep } = values;
    if (!cep) return;
    setLoading(true);
    if (cep.length < 8) {
      toast.warning('Digite um CEP válido com 8 dígitos.');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
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
    } finally {
      setLoading(false);
    }
  }, [values.cep]);

  const clearForm = () => {
    setValues({});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (values.password !== values.confirmPassword) {
      toast.error('Senhas divergentes.');
      setLoading(false);
      return;
    }

    const data = {
      nome: values.nome,
      sobrenome: values.sobrenome,
      email: values.email,
      password: values.password,
      endereco: values.endereco,
      CEP: values.cep,
      numero: values.numero,
      cidade: values.cidade,
      estado: values.estado
    }

    try {
      const response = await api.post('users/signup', data);

      if (response.status === 200) {
        toast.info(response.data.message);
        setLoading(false);
        history.push('/');
        return;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
            toast.error(error.response.data.message);
        } else if (error.response.status === 500) {
            toast.error(error.response.data.message);
        }
      } else {
          toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
      }
      setLoading(false);
    }

  }
  return (
    <>
      <Loading load={loading}/>
      <main className="container-fluid">
        <h3 className="mt-3 title">Venha ser um Bemolover <span> <FiHeart color="#FF0000"/> </span> </h3>
        <p className="text-info">
          Faça a sua conta e tenha acesso em toda as nossas plataformas.
        </p>
        <form className="form-new card mt-3 py-3 px-5 row" onSubmit={handleSubmit}>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Login
          </Link>
          <InputText 
            label="Nome" 
            type="text"
            onChange={e => setValues(prev => ({...prev, nome: e.target.value}))}
            required
            value={values.nome}
          />
          <InputText 
            label="Sobrenome" 
            type="text"
            onChange={e => setValues(prev => ({...prev, sobrenome: e.target.value}))}
            value={values.sobrenome}
            required
          />
          <InputText 
            label="Email" 
            type="email"
            onChange={e => setValues(prev => ({...prev, email: e.target.value}))}
            value={values.email}
            required
          />
          <InputText 
            label="Senha" 
            type="password"
            onChange={e => setValues(prev => ({...prev, password: e.target.value}))}
            value={values.password}
            required
          />
          <InputText 
            label="Confirmar Senha" 
            type="password"
            onChange={e => setValues(prev => ({...prev, confirmPassword: e.target.value}))}
            value={values.confirmPassword}
            required
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
            <button className="btn btn-secondary" type="button" onClick={clearForm}>Limpar campos</button>
            <button className="btn btn-primary" type="submit">Salvar</button>
          </div>
        </form>
      </main>
    </>
  )
}

export default SignUp;