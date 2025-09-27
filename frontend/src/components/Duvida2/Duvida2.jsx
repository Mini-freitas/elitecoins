import React from "react";
import {Duvida2Container,Duvida2H3,Duvida2H4,Duvida2H5,NumeroPergunta2} from './styles';
import { Link } from 'react-router-dom';

const Duvida2 = () => {
    return (
    <Duvida2Container>
        <NumeroPergunta2 id="titulo_duvidas">02</NumeroPergunta2>
        <Duvida2H3>Este site realmente é seguro?</Duvida2H3>
        <Duvida2H4>
            Sim, esse site é abrangido por uma <br />
            política de segurança e todas as <br />
            informações pessoais são criptografadas
        </Duvida2H4>
        <Duvida2H5>
            <Link to="https://www.elitecoinsfc.com.br" target="_blank" rel="noopener noreferrer"  style={{ textDecoration: "none", color: "inherit" }}>
            Ler mais sobre
            </Link>
        </Duvida2H5>
        
    </Duvida2Container>     
    );
};

export default Duvida2;
