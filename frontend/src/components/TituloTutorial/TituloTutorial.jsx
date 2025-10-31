import React from "react";
import {BoxTituloDuvidas,TitulosAreasNavegacao,TituloDuvidas,ExplicacaoDuvidas,ExplicacaoDuvidasH2} from './styles'

const Titulo = () => {
    return (
    <BoxTituloDuvidas>
        <TituloDuvidas>
            <TitulosAreasNavegacao>
                SEM <b style={{ color: "var(--cor-verde_cana)" }}>DUVIDAS</b> SUA EXPERIÊNCIA <br />É MELHOR
            </TitulosAreasNavegacao>
        </TituloDuvidas>
        <ExplicacaoDuvidas>
            <ExplicacaoDuvidasH2>
                Essas perguntas foram selecionadas a partir do <br />
                atendimento realizado por nossa equipe de <br />
                assistência. E para esclarecer qualquer dúvida <br />
                pertinente separamos as três perguntas mais <br />
                recorrentes.
            </ExplicacaoDuvidasH2>
        </ExplicacaoDuvidas>
    </BoxTituloDuvidas>
    );
};

export default Titulo;
