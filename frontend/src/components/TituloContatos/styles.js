import styled from 'styled-components'

export const ContatosContainerTitulo = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
export const TitulosAreasNavegacao = styled.h1`
    height: auto;
    width: auto;

    @media(max-width:440px){
    font-size: 1.2rem;
    text-align: center;
    word-spacing:0;

    br{
    display:none;
    }

  }
`
export const DetalheContato = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-right: .5rem;

  @media(max-width:440px){
    width:100%;
    br{
      display:none;
    }
  }
`;
export const DetalheTracinho = styled.div`
  height: 3rem;
  width: 5px;
  background-color: var(--cor-cinza);

  @media(max-width:440px){
    display:none;
  }
`;
export const DetalheContatoH4 = styled.h4`
  color: var(--cor-cinza);
  font-family: var(--fonte-principal);
  font-weight: 400;
  font-style: normal;
  font-size: medium;
  text-align: start;

  @media(max-width:440px){
    width:80%;
  }
`;
