import React from 'react';
import { MainContainer } from './styles';

import Slider from '../Slider/Slider'; 
import Tutorial from '../Tutorial/Tutorial';
import Recarga from '../Recarga/Recarga';
import Sobre from '../Sobre/Sobre';
import Contatos from '../Contatos/Contatos';
import NavegaLateral from '../NavegaLateral/NavegaLateral';
import Whattsapp from '../Whattsapp/Whattsapp';

const MainPrincipal = () => {
    return (
        <MainContainer>
            <Slider />
            <NavegaLateral />
            <Whattsapp />
            <Tutorial />
            <Recarga />
            <Sobre />
            <Contatos />
        </MainContainer>
    );
};

export default MainPrincipal;
