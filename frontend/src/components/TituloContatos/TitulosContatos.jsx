import React from 'react';
import { ContatosContainerTitulo,TitulosAreasNavegacao,DetalheContato,DetalheTracinho,DetalheContatoH4 } from './styles';


const TituloContatos = () => {
    return (
        <ContatosContainerTitulo>
            <TitulosAreasNavegacao>
                ENTRE EM <b style={{ color: "var(--cor-verde_cana)" }}>CONTATO</b> COM A NOSSA <br />
                EQUIPE
            </TitulosAreasNavegacao>
            <DetalheContato>
                <DetalheTracinho></DetalheTracinho>
                <DetalheContatoH4>
                    Nossa equipe está 24h à sua disposição, entre em contato para <br />
                    resolver qualquer problema ou tirar qualquer dúvida
                </DetalheContatoH4>
            </DetalheContato>
        </ContatosContainerTitulo>
    );
};

export default TituloContatos;
