import React from "react";
import {Servicos,BoxInfoSobre} from "./styles";

import TituloSobre from '../TituloSobre/TituloSobre'
import Sobre1 from "../Sobre1/Sobre1";
import Sobre2 from "../Sobre2/Sobre2";
import Sobre3 from "../Sobre3/Sobre3";



const Sobre = () => {
  return (
    <Servicos>
        <TituloSobre />
    <BoxInfoSobre>
      <Sobre1 />
      <Sobre2 />
      <Sobre3 />
    </BoxInfoSobre>
  </Servicos>

  );
};

export default Sobre;
