import styled from 'styled-components';
import cartaXbox from '../../images/cartas/cartaXbox.svg';
import cartaPlaystation from '../../images/cartas/cartaPLAYSTATION.svg';
import cartaPC from '../../images/cartas/cartaPC.svg';

export const RecargaContainer = styled.div`
  grid-area: recarga;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;
  align-items: center;
  text-align: center;

 @media (max-width: 440px) {
    margin-top: 8rem;
  }
`;

export const RecargaContainerH1 = styled.h1`
  color: var(--cor-branca);
  font-family: var(--fonte-principal);

  b {
    color: var(--cor-verde_cana);
  }

  @media (max-width: 440px) {
    font-size:medium;
    text-align:center;
  }
`;
export const RecargaContainerH2 = styled.h2`
  font-family: var(--fonte-principal);
  font-style: normal;
  font-weight: 400;
  color: var(--cor-branca);
  font-size: large;

    @media (max-width: 440px) {
      font-size:small;
      text-align:center;
      margin: 1rem 1rem;
  }
`;
export const Alinhatelaid = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  z-index: 7;
  transform: translate(-50%, -50%);
  background-color: transparent;
`;

export const ContainerCartasRecarga = styled.div`
  position: relative;
  height: 65%;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5rem;

  @media (max-width: 440px) {
    height: auto;
    width: 100%;
    gap: 1rem;
  }
`;

export const Carta1 = styled.div`
  height: 19rem;
  width: 14rem;
  filter: contrast(150%);
  cursor: pointer;
  background-image: url(${cartaXbox});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  &:hover {
    transform: scale(1.04);
    transition: 0.5s;
  }

  @media (max-width: 440px) {
     height: 10rem;
    width: 6.9rem;
  }
`;

export const Carta2 = styled.div`
  height: 19rem;
  width: 14rem;
  filter: contrast(150%);
  cursor: pointer;
  background-image: url(${cartaPlaystation});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  &:hover {
    transform: scale(1.04);
    transition: 0.5s;
  }

   @media (max-width: 440px) {
    height: 10rem;
    width: 6.9rem;
  }
`;

export const Carta3 = styled.div`
  height: 19rem;
  width: 14rem;
  filter: contrast(150%);
  cursor: pointer;
  background-image: url(${cartaPC});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  &:hover {
    transform: scale(1.04);
    transition: 0.5s;
  }

   @media (max-width: 440px) {
    height: 10rem;
    width: 6.9rem;
  }
`;

export const QuantCoins = styled.div`
    position: absolute;
    bottom: 4rem;
    right: 3.3rem;
    font-size:15px;
    color: #fff;

  @media (max-width: 440px) {
    bottom: 2.2rem;
    right: 1.5rem;
    font-size: 8px;
  }
`;
export const PrecoCoins = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 2.9rem;
  font-size: 15px;
  color: #fff;

  @media (max-width: 440px) {
    position: absolute;
    bottom: 2.2rem;
    left: 1.4rem;
    font-size: 8px;
  }
`;