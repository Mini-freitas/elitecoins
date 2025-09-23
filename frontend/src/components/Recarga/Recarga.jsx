import React from "react";
import {RecargaContainer, BoxRecarga, BoxRecargaManual, Detalhebox, Detalhebox2, H4} from "./styles";
import { Link } from 'react-router-dom';
import Cartas from "../CarrosselCartas/Cartas";
import TituloRecarga from "../TituloRecarga/TituloRecarga";

const Recarga = () => {
  return (
    <RecargaContainer>
      <BoxRecarga>
        <Cartas />
        <BoxRecargaManual>
          <Detalhebox href="https://wa.me/message/3TYYSNTDMYC7B1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>
            </svg>
          </Detalhebox>
          <Detalhebox2 href="https://wa.me/message/3TYYSNTDMYC7B1">
            <H4>
             CLIQUE AQUI PARA FAZER A RECARGA <br /> <b style={{ color: "var(--cor-verde_cana)" }}> MANUALMENTE</b> PELO WHATSAPP
            </H4>
          </Detalhebox2>
        </BoxRecargaManual>
      </BoxRecarga>
      <TituloRecarga/>
    </RecargaContainer>
  );
};

export default Recarga;
