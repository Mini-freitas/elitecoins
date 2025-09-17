import React from 'react';
import {BoxContato1,IconeCirculo,IconeCirculoImg,IconeTxt,IconeTxtH3,IconeTxtH4 } from './styles';

import iconeEmail from '../../images/icones/svg_icone_email.svg';

const Contato1 = () => {
    return (   
        <BoxContato1>
            <IconeCirculo>
                <IconeCirculoImg src={iconeEmail} alt='Icone Email' />
            </IconeCirculo>
            <IconeTxt>
                <IconeTxtH3>Entre em contato por Email</IconeTxtH3>
                <IconeTxtH4>elitecoins26@gmail.com</IconeTxtH4>
            </IconeTxt>
        </BoxContato1>
    );
};

export default Contato1;
