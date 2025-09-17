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
`;

export const RecargaContainerH1 = styled.h1`
  color: var(--cor-branca);
  font-family: var(--fonte-principal);

  b {
    color: var(--cor-verde_cana);
  }
`;
export const RecargaContainerH2 = styled.h2`
  color: var(--cor-cinza);
  font-family: var(--fonte-secundaria);
  font-size: 1.2rem;
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
`;

export const Carta1 = styled.div`
  height: 19rem;
  width: 14rem;
  border-radius: 4rem;
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
`;

export const Carta2 = styled.div`
  height: 19rem;
  width: 14rem;
  border-radius: 4rem;
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
`;

export const Carta3 = styled.div`
  height: 19rem;
  width: 14rem;
  border-radius: 4rem;
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
`;
