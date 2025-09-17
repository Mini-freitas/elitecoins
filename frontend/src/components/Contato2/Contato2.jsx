import React from 'react';
import {BoxContato2,IconeCirculo,IconeCirculoImg,IconeTxt,IconeTxtH3,IconeTxtH4 } from './styles';

import iconeTelefone from '../../images/icones/svg-icone_telefone.svg';

const Contato2 = () => {
    return (   
        <BoxContato2>
            <IconeCirculo>
                <IconeCirculoImg src={iconeTelefone} alt='Icone Telefone' />
            </IconeCirculo>
            <IconeTxt>
                <IconeTxtH3>Entre em contato por WhatsApp</IconeTxtH3>
                <IconeTxtH4>(27) 996494949 </IconeTxtH4>
            </IconeTxt>
        </BoxContato2>
    );
};

export default Contato2;
