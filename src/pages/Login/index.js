import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/bemol.png';
import './styles.css';

const Login = () => {
    return (
        <section className="container">
            <h1>Go Bemol</h1>
            <div className="row">
                <form className="card p-4 mt-5 col-5"> 
                    <h2 className="pl-3 pt-3">Conecte já!</h2>
                    <div className="card-body">
                        <input type="text" className="form-control mb-2" placeholder="Seu email"/>
                        <input type="text" className="form-control mb-2" placeholder="Sua senha"/>
                        <button className="btn btn-primary mt-2 mb-5" type="submit">Entrar</button>
                        <p>Não tem conta? <Link to="/signup">Clique aqui</Link> para criar uma!!</p>
                    </div>
                </form>
                <div className="mt-5 image-logo col-7">
                    <img src={Logo} alt="Bemol"/>
                </div>
            </div>
        </section>
    )
}

export default Login;