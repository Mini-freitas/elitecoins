import React from 'react';
import {BoxTituloTutorial, TituloCalculadorap} from './styles';

const TituloCalculadora = () => {
  return (
      <BoxTituloTutorial>
        <TituloCalculadorap>
          ESCOLHA A <b style={{ color: "var(--cor-verde_cana)" }}>QUANTIDADE</b> DE MOEDAS QUE DESEJA <br />
          RECARREGAR
        </TituloCalculadorap>
      </BoxTituloTutorial>
  )
};

export default TituloCalculadora;
