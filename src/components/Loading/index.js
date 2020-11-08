import React from 'react';

import './styles.css';
import LoadGif from '../../assets/loading.gif';

export default function Loading({ load }) {
    return (
        <>
            {load ?
                <div className='carregamento-container d-flex flex-column align-items-center justify-content-center'>
                     <img src={LoadGif} alt="Carregando" width="110px"/>
                    <h5>Carregando ...</h5>
                </div>
                :
                <div className='carregamento-container d-none'>
                    <p>Feito</p>
                </div>
            }
        </>
    )
}