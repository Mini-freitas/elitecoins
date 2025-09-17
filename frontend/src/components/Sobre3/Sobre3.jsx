import React from "react";
import {BoxSobre3,CirculoIconeSobre3,CirculoIconeSobre3Img,BoxSobre3H3,BoxSobre3H4} from "./styles";


import iconeRapidez from '../../images/icones/svg_icone_rapidez.svg';

const Sobre3 = () => {
  return (
      <BoxSobre3>
        <CirculoIconeSobre3>
          <CirculoIconeSobre3Img src={iconeRapidez} alt="Icone Rapidez" />
        </CirculoIconeSobre3>
        <BoxSobre3H3>
          Transação rápida
        </BoxSobre3H3>
        <BoxSobre3H4>
          Compre no nosso site de forma <br />
          simples, fácil e obtenha suas <br />
          moedas em 30min
        </BoxSobre3H4>
      </BoxSobre3>
  );
};

export default Sobre3;
