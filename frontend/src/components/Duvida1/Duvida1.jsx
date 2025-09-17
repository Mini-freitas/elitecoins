import React from "react";
import {Duvida1Container,Duvida1H3,Duvida1H4,NumeroPergunta1} from './styles'

const Duvida1 = () => {
    return (
        
    <Duvida1Container>
        <NumeroPergunta1>01</NumeroPergunta1>
        <Duvida1H3>
            Quanto tempo leva para realizar <br />
            a transferência das moedas?
        </Duvida1H3>
        <Duvida1H4>
            A transferência varia de acordo com a <br />
            quantidade de moedas, levando no <br />
            máximo 24h para estar na sua conta.
        </Duvida1H4>
    </Duvida1Container>
);
};

export default Duvida1;
