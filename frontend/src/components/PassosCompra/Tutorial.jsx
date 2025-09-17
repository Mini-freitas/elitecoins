import React from 'react';
import { TutorialContainer, Alinhatelaid, BoxTituloTutorial, BoxImgTutorial, TitulosAreasNavegacao, TitulosAreasNavegacaoB, ImgTutorial, ImgTutorialImg, ContainerTutorial, ContainerTutorialH2, ContainerTutorialH2B, BoxBtTutorial, BtIrACompra, BtIrACalculadora } from './styles';
import iconeTutorial from '../../images/fundo/imagem_tutorial.svg'; // Certifique-se de importar corretamente sua imagem

const Tutorial = () => {
    const scrollToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth',block: "center"  });
        }
      };
    return (
        <TutorialContainer>
            <BoxTituloTutorial>
                <TitulosAreasNavegacao>
                    SIGA O <TitulosAreasNavegacaoB>TUTORIAL</TitulosAreasNavegacaoB> DE COMPRA AUTOMÁTICA E APROVEITE
                </TitulosAreasNavegacao>
            </BoxTituloTutorial>

            <BoxImgTutorial>
                <ImgTutorial>
                <Alinhatelaid id="titulo_duvidas"></Alinhatelaid>
                    <ImgTutorialImg src={iconeTutorial} alt="imagem de tutorial" />
                </ImgTutorial>

                <ContainerTutorial>
                    <ContainerTutorialH2>
                        É muito simples realizar sua compra, siga o <br />
                        <ContainerTutorialH2B>tutorial explicativo</ContainerTutorialH2B>, em três passos você finaliza <br />
                        sua compra.
                    </ContainerTutorialH2>

                    <ContainerTutorialH2>
                        Lembre-se de que a recarga é feita apenas por <br />
                        <ContainerTutorialH2B>método automático</ContainerTutorialH2B>, ou seja, ao realizar sua compra <br />
                        o processo de transferência se inicia.
                    </ContainerTutorialH2>

                    <BoxBtTutorial>
                        <BtIrACompra onClick={() => scrollToElement('titulo_recarga')}>
                            COMPRAR AGORA
                        </BtIrACompra>
                        <BtIrACalculadora onClick={() => scrollToElement('titulo_calculadora')}>
                            VER CALCULADORA
                        </BtIrACalculadora>
                    </BoxBtTutorial>
                </ContainerTutorial>
            </BoxImgTutorial>
        </TutorialContainer>
    );
};

export default Tutorial;
