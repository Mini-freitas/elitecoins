// src/components/Recarga/Recarga.jsx
import React, { useEffect, useState } from "react";
import { 
  RecargaContainer, 
  Alinhatelaid, 
  RecargaContainerH1,
  RecargaContainerH2, 
  ContainerCartasRecarga, 
  Carta1, 
  Carta2, 
  Carta3,
  QuantCoins,
  PrecoCoins

} from './styles';
import api from "../../services/api"; // ← usa api.js padronizado

const Recarga = ({ setCartaSelecionada }) => {
  const [valores, setValores] = useState({ play: 0, xbox: 0, pc: 0 });

  useEffect(() => {
    const fetchValores = async () => {
      try {
        const res = await api.get("/moedas"); // rota atualizada sem /api
        setValores({
          play: res.data.play || 0,
          xbox: res.data.xbox || 0,
          pc: res.data.pc || 0
        });
      } catch (err) {
        console.error("Erro ao buscar valores das moedas:", err);
      }
    };

    fetchValores();
  }, []);

  const handleCartaClick = (carta) => {
    setCartaSelecionada(carta);

    // Rola até a calculadora
    document.getElementById("titulo_calculadora")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };

  return (
    <RecargaContainer>
      <RecargaContainerH1>
        SELECIONE A <b>CARTA</b> COM A OPÇÃO DE RECARGA DESEJADA
      </RecargaContainerH1>

      <RecargaContainerH2>
        Selecione a carta que deseja comprar, caso selecione e deseje mudar basta clicar novamente em outra carta e a <br />
        seleção antiga será deletada.
      </RecargaContainerH2>

      <ContainerCartasRecarga>
        <Alinhatelaid id="titulo_recarga"></Alinhatelaid>

        <Carta1 data-carta="carta1" onClick={() => handleCartaClick("xbox")}>
          <PrecoCoins>
            {valores.xbox},00
          </PrecoCoins>
          <QuantCoins>
            100k
          </QuantCoins>
        </Carta1>

        <Carta2 data-carta="carta2" onClick={() => handleCartaClick("play")}>
          <PrecoCoins >
            {valores.play},00
          </PrecoCoins>
          <QuantCoins>
            100k
          </QuantCoins>
        </Carta2>

        <Carta3 data-carta="carta3" onClick={() => handleCartaClick("pc")}>
          <PrecoCoins>
            {valores.pc},00
          </PrecoCoins>
          <QuantCoins>
            100k
          </QuantCoins>
        </Carta3>
      </ContainerCartasRecarga>
    </RecargaContainer>
  );
};

export default Recarga;
