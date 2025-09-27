import React from "react";
import { CartasTxtBox, TitulosAreasNavegacao, Detalhe, DetalheBolinha,BoxTextos, RecargaTxt, RecargaTxtB, BtPaginaCompra } from "./styles";
import { Link } from 'react-router-dom';

const TituloRecarga = () => {
  return (
    <CartasTxtBox>
      <TitulosAreasNavegacao>
        FAÇA A SUA <b style={{ color: "var(--cor-verde_cana)" }}>RECARGA</b> DE FORMA <br />
        RÁPIDA E FÁCIL AQUI
      </TitulosAreasNavegacao>
      <Detalhe>
        <DetalheBolinha />
        <DetalheBolinha />
        <DetalheBolinha />
        <DetalheBolinha />
      </Detalhe>
      <BoxTextos>
        <RecargaTxt id="titulo_recarga">
          Você deve clicar em <RecargaTxtB>comprar agora</RecargaTxtB> e será redirecionado para a página <br />
          de compra, lá você vai escolher para qual jogo deseja recarregar <br />
          clicando sobre uma carta como esta ao lado.
        </RecargaTxt>
        <RecargaTxt>
          Após selecionar a carta você deve <RecargaTxtB>escolher a quantidade</RecargaTxtB> de moedas <br />
          que deseja comprar, o cálculo é feito automaticamente e assim que escolher <br />
          você deve clicar em continuar para efetuar o pagamento.
        </RecargaTxt>
      </BoxTextos>
      
      <Link to="/compra" style={{textDecoration: "none"}}>
        <BtPaginaCompra>COMPRAR AGORA</BtPaginaCompra>
      </Link>
    </CartasTxtBox>
  );
};

export default TituloRecarga;