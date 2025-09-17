import React, { useState } from "react";
import { MainContainerCompra } from './stylesCompra';

import Slider from '../Slider/Slider';
import Tutorial from '../PassosCompra/Tutorial';
import Contatos from '../Contatos/Contatos';
import Recarga from '../RecargaCompra/RecargaCompra';
import Calculadora from '../Calculadora/Calculadora';
import NavegaLateralCompra from "../NavegaLateral/NavegaLateralCompra";
import Whattsapp from '../Whattsapp/Whattsapp';

const MainCompra = ({usuario}) => {
  // Estado elevado para a carta selecionada
  const [cartaSelecionada, setCartaSelecionada] = useState(null);
  return (
    <MainContainerCompra>
      <Slider />
      <NavegaLateralCompra />
      <Whattsapp />
      <Tutorial />
      <Recarga setCartaSelecionada={setCartaSelecionada} />
      <Calculadora cartaSelecionada={cartaSelecionada} usuario={usuario} />
      <Contatos />
    </MainContainerCompra>
  );
};

export default MainCompra;
