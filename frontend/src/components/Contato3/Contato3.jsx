import React from 'react';
import {BoxContato3,IconeCirculo,IconeCirculoImg,IconeTxt,IconeTxtH3,IconeTxtH4 } from './styles';

import iconeTelefone from '../../images/icones/svg-icone_telefone.svg';

const Contato3 = () => {
    return (   
        <BoxContato3>
            <IconeCirculo>
                <IconeCirculoImg src={iconeTelefone} alt='Icone Telefone' />
            </IconeCirculo>
            <IconeTxt>
                <IconeTxtH3 id='titulo_contato'>Entre em contato por telefone</IconeTxtH3>
                <IconeTxtH4>(27) 996494949 </IconeTxtH4>
            </IconeTxt>
        </BoxContato3>
    );
};

export default Contato3;
