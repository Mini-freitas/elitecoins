import styled from 'styled-components';

export const CalculadoraContainer = styled.div`
  grid-area: calculadora;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;

  @media (max-width: 440px) {
    margin-top: 5rem;
  }
`;

export const ContainerCalculadora = styled.div`
  height: 60%;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 3rem;

   @media (max-width: 440px) {
    margin-top: 1rem;
    width:100%;
    flex-direction: column;
    align-items:center;

  }
`;

export const BoxCartaRange = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 440px) {
    margin-top: 1rem;
    width:85%;
  }
`;

export const CartaSaidaValores = styled.div`
  height: 85%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const CartaSelecionada = styled.div`
  height: 16rem;
  width: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  filter: contrast(150%);
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const BoxRangeCalcula = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
`;

export const RangeLabel = styled.div`
  height: 0.8rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--cor-verde_cana);
  border-radius: 10px;
  position: relative;
  padding: 0 5px;
  cursor: pointer;
`;

export const Step = styled.div`
  height: 0.6rem;
  width: 0.6rem;
  position: relative;
  border-radius: 50%;
  background-color: var(--cor-preto);
  cursor: pointer;

  h2 {
    position: absolute;
    top: -1.5rem;
    left: -0.5rem;
    z-index:1;
    color: var(--cor-cinza-escuro);
    font-family: var(--fonte-secundaria);
    font-size: 1rem;
    font-weight: 600;
    font-style: normal;

  @media (max-width: 440px) {
    font-size:10px;
    left: 0;
  }
  }
`;

export const Thumb = styled.div`
  height: 1.4rem;
  width: 1.4rem;
  background-color: var(--cor-verde_cana);
  border-radius: 50%;
  border: 1px solid var(--cor-preto);
  cursor: pointer;
  position: absolute;
  left: 0;
  z-index: 20;
  transition: left 0.1s;
`;

export const BoxValores = styled.div`
  height: 90%;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: linear-gradient(135deg, #333 0%, #111 100%);
  border-radius: 10px;

  @media (max-width: 440px) {
    position: relative;
    width:80%;
    height:10rem;
    margin-top:-2rem;
  }
`;

export const AutoTitulo = styled.div`
  height: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 5px;
  padding-right: 20px;
  background-color: var(--cor-preto);
  font-family: var(--fonte-secundaria);
  font-size: small;
  color: var(--cor-cinza);

`;

export const MoedasRecebidas = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0.2rem;
  margin-top: 1rem;
  margin-left: 3rem;
  text-align: start;

  h2 {
    font-family: var(--fonte-secundaria);
    font-size: 1rem;
    font-weight: 400;
    color: var(--cor-cinza);

  @media (max-width: 440px) {
    font-size: small;
  }
  }

  p {
    font-family: var(--fonte-secundaria);
    font-size: 2rem;
    font-weight: 400;
    color: var(--cor-verde_cana);

  @media (max-width: 440px) {
    font-size: large;
  }
  }
`;

export const DescontoBox = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-left: 3rem;

  @media (max-width: 440px) {
    position: absolute;
    right: 1.5rem;
    top: 3rem;
    width: auto;
  }

  #quant_desconto {
    font-family: var(--fonte-secundaria);
    font-size: small;
    font-weight: 400;
    color: var(--cor-cinza);
    
  @media (max-width: 440px) {
    font-size: small;
  }
  }

  #preco_real {
    font-family: var(--fonte-secundaria);
    font-size: small;
    font-weight: 400;
    color: var(--cor-verde_cana);
    text-decoration: line-through;
  }
`;

export const TotalPagamento = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0.3rem;
  margin-left: 3rem;

  @media (max-width: 440px) {
  margin-top:.5rem;
  gap:0;
  }

  h2 {
    font-family: var(--fonte-secundaria);
    font-size: 1rem;
    font-weight: 400;
    color: var(--cor-cinza);

  @media (max-width: 440px) {
    font-size: small;
  }
  }

  p {
    font-family: var(--fonte-secundaria);
    font-size: 2rem;
    font-weight: 400;
    color: var(--cor-branca);

  @media (max-width: 440px) {
    font-size: large;
  }

    b {
      color: var(--cor-verde_cana);

      @media (max-width: 440px) {
        font-size: large;
      }
    }
  }
`;

export const Economia = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-left: 3rem;

  @media (max-width: 440px) {
    position: absolute;
    right: 2.8rem;
    top: 5rem;
    width:auto;
    padding:.5rem;
  }

  h2 {
    font-family: var(--fonte-secundaria);
    font-size: 1rem;
    font-weight: 400;
    color: var(--cor-cinza);

    @media (max-width: 440px) {
      font-size: small;
    }
  }

  p {
    font-family: var(--fonte-secundaria);
    font-size: small;
    font-weight: 400;
    color: var(--cor-branca);
  }
`;

export const Confirmacao = styled.h3`
  font-family: var(--fonte-secundaria);
  font-size: small;
  font-weight: 400;
  color: var(--cor-cinza);

  @media (max-width: 440px) {
    font-size: 10px;
    width:100%;
    display:flex;
    justify-content:center;
    align-itens:center;  
  }
`;

export const CartaSelecionadaCalculadora = styled.img`
  height: 20rem;
  width: 20rem;

  @media (max-width: 440px) {
    height: 80%;
    width: 80%;  
  }
`;
export const BoxCartacalculadora = styled.div`
  position: absolute;
  left: 1.8rem;
  bottom: 2.4rem;
  font-family: var(--fonte-principal);

  @media (max-width: 440px) {
    left: 3.2rem;
    bottom: 4rem; 
    font-size: 11px;
  }
`;
export const Boxquantmoedas = styled.div`
  position: absolute;
  right: 2.2rem;
  bottom: 2.4rem;
  font-family: var(--fonte-principal);

    @media (max-width: 440px) {
      right: 3.5rem;
      bottom: 4rem;
      font-size: 11px;
  }
`;
