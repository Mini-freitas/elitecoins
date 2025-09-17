import React from "react";
import {BoxSobre1,CirculoIconeSobre,CirculoIconeSobreImg,BoxSobre1H3,BoxSobre1H4} from "./styles";

import iconeAtendimento from '../../images/icones/svg_icone_atendimento.svg';


const Sobre1 = () => {
  return (
      <BoxSobre1>
        <CirculoIconeSobre>
          <CirculoIconeSobreImg src={iconeAtendimento} alt="Icone Atendimento" />
            
        </CirculoIconeSobre>
        <BoxSobre1H3>
          Atendimento ao cliente
        </BoxSobre1H3>
        <BoxSobre1H4>
          Nossa equipe está disponível <br />
          24h para te atender e tirar <br />
          suas dúvidas
        </BoxSobre1H4>
      </BoxSobre1>
  );
};

export default Sobre1;
