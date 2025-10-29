// src/components/Calculadora/Calculadora.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api"; // usa api.js padronizado
import { 
  CalculadoraContainer,
  ContainerCalculadora,
  BoxCartaRange,
  CartaSaidaValores,
  CartaSelecionada,
  BoxRangeCalcula,
  RangeLabel,
  Step,
  Thumb,
  BoxValores,
  AutoTitulo,
  MoedasRecebidas,
  DescontoBox,
  TotalPagamento,
  Economia,
  Confirmacao,
  CartaSelecionadaCalculadora,
  BoxCartacalculadora,
  Boxquantmoedas,
} from './styles';
import TituloCalculadora from '../TituloCalculadora/TituloCalculadora';
import cartaPC from "../../images/cartas/cartaPC.svg";
import cartaXBOX from "../../images/cartas/cartaXbox.svg";
import cartaPLAYSTATION from "../../images/cartas/cartaPLAYSTATION.svg";
import BtContinuaCompra from "../BtContinuaCompra/BtContinuaCompra";

const Calculadora = ({ cartaSelecionada, usuario }) => {
  const [precos, setPrecos] = useState({ play: 0, xbox: 0, pc: 0 });
  const [quantMoedas, setQuantMoedas] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [desconto, setDesconto] = useState(0);

  useEffect(() => {
    setQuantMoedas(0);
    setValorTotal(0);
    setDesconto(0);
    const thumb = document.querySelector('.thumb');
    if (thumb) thumb.style.left = "0%";
  }, [cartaSelecionada]);

  useEffect(() => {
    const fetchPrecos = async () => {
      try {
        const res = await api.get("/moedas"); // padronizado para api.js
        setPrecos({
          play: res.data.play || 0,
          xbox: res.data.xbox || 0,
          pc: res.data.pc || 0,
        });
      } catch (err) {
        console.error("Erro ao buscar valores das moedas:", err);
      }
    };
    fetchPrecos();
  }, []);

  const calcularValores = (moedas) => {
    if (!cartaSelecionada) {
      setQuantMoedas(0);
      setValorTotal(0);
      setDesconto(0);
      return;
    }

    const precoPor1000Moedas =
      cartaSelecionada === "xbox" ? precos.xbox
      : cartaSelecionada === "play" ? precos.play
      : precos.pc;

    const valorEmReal = (moedas / 100000) * precoPor1000Moedas;

    let desc = 0;
    if (moedas >= 100000 && moedas < 500000) desc = 1;
    else if (moedas >= 500000 && moedas < 7000000) desc = 2;
    else if (moedas >= 7000000) desc = 3;

    const valorComDesconto = valorEmReal * (1 - desc / 100);

    setQuantMoedas(moedas);
    setValorTotal(valorComDesconto);
    setDesconto(desc);
  };

  useEffect(() => {
    if (!cartaSelecionada) return;

    const thumb = document.querySelector('.thumb');
    const steps = document.querySelectorAll('.rangeLabel .step');
    const stepsValues = Array.from(steps).map(step => parseInt(step.getAttribute('data-value')));
    const thumbSize = 1.4;

    function updateThumbPosition(value) {
      const step = document.querySelector(`#step${stepsValues.indexOf(value) + 1}`);
      if (!step || !thumb) return;

      const stepRect = step.getBoundingClientRect();
      const stepCenter = stepRect.left + stepRect.width / 2;
      const rangeLabel = document.querySelector('.rangeLabel');
      const rangeLabelRect = rangeLabel.getBoundingClientRect();
      const thumbPosition = ((stepCenter - rangeLabelRect.left) / rangeLabelRect.width) * 100;
      const thumbOffset = (thumbSize / 2) * (rangeLabelRect.width / 150);
      thumb.style.left = `${thumbPosition - thumbOffset}%`;

      calcularValores(value);
    }

    steps.forEach(step => {
      step.addEventListener('click', () => {
        const value = parseInt(step.getAttribute('data-value'));
        updateThumbPosition(value);
      });
    });

    updateThumbPosition(0);

    return () => {
      steps.forEach(step => step.replaceWith(step.cloneNode(true)));
    };
  }, [cartaSelecionada, precos.play, precos.xbox, precos.pc]);

  const formatMoedas = (valor) => {
    if (valor >= 1000000) return (valor / 1000000).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "KK";
    if (valor >= 1000) return (valor / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 0 }) + "K";
    return valor.toString();
  };

  return (
    <CalculadoraContainer>
      <TituloCalculadora />

      <ContainerCalculadora>
        <BoxCartaRange>
          <CartaSaidaValores>
            <CartaSelecionada>
              {cartaSelecionada === "xbox" && <CartaSelecionadaCalculadora src={cartaXBOX} alt="Carta Xbox" />}
              {cartaSelecionada === "play" && <CartaSelecionadaCalculadora src={cartaPLAYSTATION} alt="Carta PlayStation" />}
              {cartaSelecionada === "pc" && <CartaSelecionadaCalculadora src={cartaPC} alt="Carta PC" />}

              {cartaSelecionada && (
                <>
                  <BoxCartacalculadora>
                    {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </BoxCartacalculadora>
                  <Boxquantmoedas className="boxquantmoedas">
                    {formatMoedas(quantMoedas)}
                  </Boxquantmoedas>
                </>
              )}
            </CartaSelecionada>
          </CartaSaidaValores>

          <BoxRangeCalcula>
            <RangeLabel className="rangeLabel">
              <Step className="step" id="step1" data-value="20000"><h2>20K</h2></Step>
              <Step className="step" id="step2" data-value="100000"><h2>100K</h2></Step>
              <Step className="step" id="step3" data-value="200000"><h2>200K</h2></Step>
              <Step className="step" id="step4" data-value="300000"><h2>300K</h2></Step>
              <Step className="step" id="step5" data-value="500000"><h2>500K</h2></Step>
              <Step className="step" id="step6" data-value="2000000"><h2>2KK</h2></Step>
              <Step className="step" id="step7" data-value="5000000"><h2>5KK</h2></Step>
              <Step className="step" id="step8" data-value="7000000"><h2>7KK</h2></Step>
              <Step className="step" id="step9" data-value="10000000"><h2>10KK</h2></Step>
              <Thumb className="thumb" />
            </RangeLabel>
          </BoxRangeCalcula>
        </BoxCartaRange>

        <BoxValores>
          <AutoTitulo>Automático</AutoTitulo>

          <MoedasRecebidas>
            <h2>Você receberá</h2>
            <p id="out_quant_moedas">{quantMoedas.toLocaleString()}</p>
          </MoedasRecebidas>

          <DescontoBox id="titulo_calculadora">
            <p id="quant_desconto">{desconto}% de desconto</p>
            <p id="preco_real">R$ {(valorTotal / (1 - desconto/100)).toFixed(2).replace('.', ',')}</p>
          </DescontoBox>

          <TotalPagamento>
            <h2>Total a pagar</h2>
            <p id="out_pagamento">R$<b>{valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></p>
          </TotalPagamento>

          <Economia>
            <h2>Economize</h2>
            <p id="out_economia">{(valorTotal / (1 - desconto/100) - valorTotal).toFixed(2).replace('.', ',')}</p>
          </Economia>
        </BoxValores>
      </ContainerCalculadora>

      <Confirmacao>
        Ao clicar em continuar você está confirmando o valor selecionado
      </Confirmacao>

      <BtContinuaCompra 
        usuario={usuario} 
        valorTotal={valorTotal} 
        quantMoedas={quantMoedas} 
        cartaSelecionada={cartaSelecionada}  
      />
    </CalculadoraContainer>
  );
};

export default Calculadora;
