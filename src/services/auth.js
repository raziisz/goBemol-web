import { toast } from 'react-toastify'

export const isAuthenticated = () => {
  const authenticated = localStorage.getItem('token_key') !== null;

  if(!authenticated) {
      toast.error('Você precisa se autenticar');
      return false;
  }

  return authenticated
  
};

export const getToken = () => localStorage.getItem('token_key');

export const login = (token) => {
  localStorage.setItem('token_key', token);
}

export const logout = () => localStorage.clear();