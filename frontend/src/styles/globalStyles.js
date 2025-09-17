import { createGlobalStyle } from "styled-components";

const MyGlobalStyle = createGlobalStyle`
  /******** variaveis da pagina principal *********/
  :root {
    /******** cores do body *********/
    --cor-preto: rgb(0, 0, 0);
    --cor-verde_cana: rgb(99, 248, 0);
    --cor-cinza: rgb(167, 167, 167);
    --cor-branca: rgb(255, 241, 241);
    --cor-cinza-escuro: rgb(83, 83, 83);

    /******** fonte do header *********/
    --fonte-principal: "Abel", sans-serif;
    --fonte-secundaria: "League Spartan", sans-serif;
  }

  /* Estilo Global */
  * {
    margin: 0;
    padding: 0;
  }

  #root {
  min-height: 100vh;
  min-width: 100vw;

  display: grid;
  grid-template-areas: "h" 
                       "m"
                       "f";
  grid-template-columns: 1fr;
  grid-template-rows: 5rem auto 15rem;
  background-color: var(--cor-preto);
  color: white;
  font-family: var(--fonte-principal);
  overflow-y: auto;
}

/* Tablet grande */
@media (max-width: 1024px) {
  #root {
    grid-template-rows: 4.5rem auto 15rem;
  }
}

/* Tablet médio */
@media (max-width: 768px) {
  #root {
    grid-template-rows: 4rem auto 15rem;
  }
}

/* Celular grande */
@media (max-width: 600px) {
  #root {
    grid-template-rows: 3.5rem auto 15rem;
  }
}

/* Celular pequeno */
@media (max-width: 480px) {
  #root {
    grid-template-rows: 3rem auto 15rem;
  }
}


  /******** estilo da barra de rolagem *********/
  ::-webkit-scrollbar-track {
    background-color: #464646;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #000000;
  }
`;

export default MyGlobalStyle;
