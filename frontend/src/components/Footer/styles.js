import styled from 'styled-components';

export const FooterContainer = styled.footer`
  grid-area: f;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 2px solid var(--cor-cinza);
  background-color: var(--cor-preto);

  @media(max-width:440px){
    margin-top:4rem;
    width:100vw;
  }
`;

export const AlinhaFooter = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;

  @media(max-width:440px){
    height:100%;
    margin:2rem;
    align-items: center;
    gap:1rem;

  }
`;

export const ContainerRedesSociais = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0.5rem;
  text-align: start;

  @media(max-width:440px){
    height:100%;
  }
`;

export const LogoFooter = styled.div`
  font-family: var(--fonte-principal);
  font-style: normal;
  font-weight: 1000;
  font-size: 2.5rem;
  color: var(--cor-verde_cana);

  @media(max-width:440px){
    font-size:1rem;
  }
`;

export const RedesSociaisTitle = styled.h3`
  font-family: var(--fonte-secundaria);
  font-style: normal;
  font-weight: 600;
  line-height: 1.5;
  font-size: 10px;
  color: var(--cor-branca);

  @media(max-width:440px){
    font-size:7px;
  }
`;

export const BoxIconesFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const CirculoIconeFooter = styled.a`
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--cor-verde_cana);
  border-radius: 50%;
  text-decoration: none;
  cursor: pointer;

  @media(max-width:440px){
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const CirculoIconeFooterSvg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  text-decoration: none;
  color: var(--cor-preto);

  @media(max-width:440px){
    height: 1rem;
    width: 1rem;
  }
`;

export const CirculoIconeFooterImg = styled.img`
  height: 3rem;
  width: 3rem;
  text-decoration: none;

  @media(max-width:440px){
    height: 2rem;
    width: 2rem;
  }
`;

export const ContainerFooter = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media(max-width:440px){
    height:60%;
    justify-content: start;
    align-items: start;
  }
`;

export const ContainerFooter1 = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media(max-width:440px){
    display:none;
  }
`;

export const List = styled.ul`
  color: var(--cor-branca);
  font-family: var(--fonte-secundaria);
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;

   @media(max-width:440px){
    font-size:10px;
  }
`;

export const ListItem = styled.li`
  color: var(--cor-cinza-escuro);
  font-family: var(--fonte-secundaria);
  font-size: small;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;

   @media(max-width:440px){
    font-size:9px;
  }

  &:hover {
    color: var(--cor-branca);
    cursor: pointer;
    transition: 0.5s;
  }
`;

export const ContainerAgradecimentos = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;

  h4{
  @media(max-width:440px){
    font-size:11px;
    
  }
  }
`;

export const AgradecimentosTitle = styled.h3`
  color: var(--cor-branca);
  font-family: var(--fonte-secundaria);
  font-weight: 400;
  font-style: normal;
  font-size: medium;

   @media(max-width:440px){
    display:none;
  }
`;

export const BtsFooter = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;

`;

export const Logoff = styled.button`
  color: var(--cor-cinza-escuro);
  font-family: var(--fonte-secundaria);
  font-weight: 600;
  font-size: medium;
  padding: 0.8rem;
  border: 1px solid var(--cor-branca);
  border-right: none;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  background-color:transparent;

   @media(max-width:440px){
      padding: 7px;
      font-size:9px;
  }
`;

export const VoltarTopo = styled.div`
  background-color: var(--cor-verde_cana);
  color: var(--cor-preto);
  font-family: var(--fonte-secundaria);
  font-weight: 600;
  font-size: medium;
  padding: 0.8rem;
  border: 1px solid var(--cor-verde_cana);
  border-radius: 0 10px 10px 0;
  cursor: pointer;

  @media(max-width:440px){
      padding: 7px;
      font-size:9px;
  }
`;

export const AgradecimentosSubtitle = styled.h4`
  color: var(--cor-branca);
  font-family: var(--fonte-secundaria);
  font-weight: 400;
  font-style: normal;
  font-size: medium;
  text-align: start;
  margin-top: 0.5rem;

   @media(max-width:440px){
    display:none;
  }
`;

export const AgradecimentosBold = styled.b`
  color: var(--cor-verde_cana);

   @media(max-width:440px){
    display:none;
  }
`;

export const FooterAfter = styled.footer`
  content: "@ venda de moedas-2024";
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 4px;
  background-color: black;
  width: 100%;
  height: 1rem;
  color: var(--cor-cinza);
  text-align: center;
  font-family: var(--fonte-secundaria);
  font-size: 12px;
`;