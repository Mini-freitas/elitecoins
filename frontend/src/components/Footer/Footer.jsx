import React from "react";
import { Link } from "react-router-dom";
import {
  FooterContainer,
  AlinhaFooter,
  ContainerRedesSociais,
  LogoFooter,
  RedesSociaisTitle,
  BoxIconesFooter,
  CirculoIconeFooter,
  CirculoIconeFooterSvg,
  CirculoIconeFooterImg,
  ContainerFooter,
  ContainerFooter1,
  List,
  ListItem,
  ContainerAgradecimentos,
  BtsFooter,
  Logoff,
  VoltarTopo,
  FooterAfter,
} from "./styles";

import iconeFacebook from "../../images/icones/svg_icone_facebook.svg";
import iconeYoutoobe from "../../images/icones/svg_icone_youtoobe.svg";

const Footer = ({ usuario, handleLogout, scrollToTop }) => {
  // ===============================
  // scroll por ID (NÃO MEXER)
  // ===============================
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // ===============================
  // fallback caso não venha por props
  // ===============================
  const handleScrollTop = () => {
    if (scrollToTop) {
      scrollToTop();
      return;
    }

    // fallback: volta pro menu
    scrollToSection("titulo_menu");
  };

  return (
    <FooterContainer>
      <AlinhaFooter>
        {/* ================= REDES SOCIAIS ================= */}
        <ContainerRedesSociais>
          <LogoFooter>ELITE COINS</LogoFooter>

          <RedesSociaisTitle>
            SIGA NOSSAS REDES SOCIAIS E FIQUE <br />
            POR DENTRO DE TODAS AS NOVIDADES
          </RedesSociaisTitle>

          <BoxIconesFooter>
            <CirculoIconeFooter href="https://www.facebook.com/profile.php?id=61580413455992&locale=pt_BR">
              <CirculoIconeFooterImg
                src={iconeFacebook}
                alt="Icone Facebook"
              />
            </CirculoIconeFooter>

            <CirculoIconeFooter href="https://www.instagram.com/elitecoinsfc26?igsh=ZmhxdTQzd2szM2Ez">
              <CirculoIconeFooterSvg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048..." />
              </CirculoIconeFooterSvg>
            </CirculoIconeFooter>

            <CirculoIconeFooter href="">
              <CirculoIconeFooterImg
                src={iconeYoutoobe}
                alt="Icone Youtube"
              />
            </CirculoIconeFooter>
          </BoxIconesFooter>
        </ContainerRedesSociais>

        {/* ================= NAVEGAÇÃO ================= */}
        <ContainerFooter1>
          <List>
            Navegação
            <ListItem onClick={() => scrollToSection("titulo_menu")}>
              Menu
            </ListItem>
            <ListItem onClick={() => scrollToSection("titulo_duvidas")}>
              Principais dúvidas
            </ListItem>
            <ListItem onClick={() => scrollToSection("titulo_recarga")}>
              Recarga
            </ListItem>
            <ListItem onClick={() => scrollToSection("titulo_sobre")}>
              Sobre
            </ListItem>
            <ListItem onClick={() => scrollToSection("titulo_contato")}>
              Contato
            </ListItem>
          </List>
        </ContainerFooter1>

        {/* ================= FUNCIONAMENTO ================= */}
        <ContainerFooter>
          <List>
            Funcionamento
            <ListItem>Plataforma automática</ListItem>
            <ListItem>Compra 24 horas</ListItem>
            <ListItem>Atendimento horário comercial</ListItem>
            <ListItem onClick={() => scrollToSection("titulo_duvidas")}>
              Principais dúvidas
            </ListItem>
          </List>
        </ContainerFooter>

        {/* ================= CONTATO ================= */}
        <ContainerFooter>
          <List>
            Fale conosco
            <ListItem onClick={() => scrollToSection("titulo_contato")}>
              Contato
            </ListItem>
            <ListItem>FAQ</ListItem>
          </List>
        </ContainerFooter>

        {/* ================= FINAL ================= */}
        <ContainerAgradecimentos>
          <BtsFooter>
            {usuario ? (
              <Logoff onClick={handleLogout}>
                Sair da conta
              </Logoff>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Logoff>Entrar na conta</Logoff>
              </Link>
            )}

            {/* 🔥 BOTÃO VOLTAR AO TOPO */}
            <VoltarTopo onClick={handleScrollTop}>
              Voltar ao topo
            </VoltarTopo>
          </BtsFooter>

          <h4>
            A <b>ELITE COINS</b> agradece por sua <br />
            preferência.
          </h4>
        </ContainerAgradecimentos>
      </AlinhaFooter>

      <FooterAfter />
    </FooterContainer>
  );
};

export default Footer;