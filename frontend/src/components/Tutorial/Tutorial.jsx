import React from "react";
import {TutorialContainer,BoxPrincipaisDuvidas} from './styles'
import TituloTutorial from "../TituloTutorial/TituloTutorial";
import Duvida1 from "../Duvida1/Duvida1";
import Duvida2 from "../Duvida2/Duvida2";
import Duvida3 from "../Duvida3/Duvida3";

const Tutorial = () => {
    return (
        <TutorialContainer>
            <TituloTutorial/>
            <BoxPrincipaisDuvidas>
                <Duvida1/>
                <Duvida2/>
                <Duvida3/>
            </BoxPrincipaisDuvidas>
        </TutorialContainer>
    );
};

export default Tutorial;
