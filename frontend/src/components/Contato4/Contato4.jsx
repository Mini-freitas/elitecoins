import React from 'react';
import {BoxContato4,IconeCirculo,IconeCirculoImg,IconeTxt,IconeTxtH3,IconeTxtH4 } from './styles';

import iconeLocal from '../../images/icones/svg_icone_local.svg';

const Contato4 = () => {
    return (   
        <BoxContato4>
            <IconeCirculo>
                <IconeCirculoImg src={iconeLocal} alt='Icone Local' />
            </IconeCirculo>
            <IconeTxt>
                <IconeTxtH3>Conheça a sede empresarial</IconeTxtH3>
                <IconeTxtH4>Monte Belo, Vitória - ES</IconeTxtH4>
            </IconeTxt>
        </BoxContato4>
    );
};

export default Contato4;
