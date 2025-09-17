import React from "react";
import {TituloSobreContainer,TitulosAreasNavegacao,TxtSobre} from "./styles";



const TituloSobre = () => {
  return (
    <TituloSobreContainer>
        <TitulosAreasNavegacao>
        CONSTRUIR <b style={{color: "var(--cor-verde_cana)" }}>CONFIANÇA</b> É ESSENCIAL PARA NÓS
        </TitulosAreasNavegacao>
        <TxtSobre>
        Explore pelo site antes de comprar e veja tudo o que temos a oferecer, com certeza você vai encontrar segurança <br />
        conforto, ótimo atendimento e rapidez, para que sua experiência seja a melhor
        </TxtSobre>
    </TituloSobreContainer>
  );
};

export default TituloSobre;
