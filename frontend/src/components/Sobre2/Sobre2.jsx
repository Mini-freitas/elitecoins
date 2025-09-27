import React from "react";
import {BoxSobre2,CirculoIconeSobre2Img,CirculoIconeSobre2,BoxSobre2H3,BoxSobre2H4,BtLerMais,BtLerMaisSvg} from "./styles";

import iconeSeguranca from '../../images/icones/svg_icone_seguranca.svg';

const Sobre2 = () => {
  return (
    
      <BoxSobre2>
        <CirculoIconeSobre2>
          <CirculoIconeSobre2Img  id="titulo_sobre" src={iconeSeguranca} alt="Icone de Segurança" />
        </CirculoIconeSobre2>
        <BoxSobre2H3>
          Site seguro e verificado
        </BoxSobre2H3>
        <BoxSobre2H4>
          Informações criptografadas e <br />
          verificadas pelo sistema de <br />
          segurança SSL
        </BoxSobre2H4>
        <BtLerMais href="/lerMais.html">
          Ler mais
          <BtLerMaisSvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
          </BtLerMaisSvg>
        </BtLerMais>
      </BoxSobre2>
  );
};

export default Sobre2;
