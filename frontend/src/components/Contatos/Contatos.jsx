import React from 'react';
import { ContatosContainer,ContatosContainerColuna,BoxIconesContato,BoxIconesCirculos } from './styles';

import TituloContatos from '../TituloContatos/TitulosContatos';
import Contato1 from '../Contato1/Contato1';
import Contato2 from '../Contato2/Contato2';
import Contato3 from '../Contato3/Contato3';
import Contato4 from '../Contato4/Contato4';
import ImgContatos from '../ImgContatos/ImgContatos';


const Contatos = () => {
    return (
        <ContatosContainer>
            <ContatosContainerColuna>
                <TituloContatos/>
                <BoxIconesContato>
                    <BoxIconesCirculos>
                        <Contato1/>
                        <Contato2/>
                    </BoxIconesCirculos>
                    <BoxIconesCirculos>
                        <Contato3/>
                        <Contato4/>
                    </BoxIconesCirculos>
                </BoxIconesContato>
            </ContatosContainerColuna>
            <ImgContatos>
            </ImgContatos>
        </ContatosContainer>
    );
};

export default Contatos;
