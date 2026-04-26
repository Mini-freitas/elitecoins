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

const Footer = ({ usuario, handleLogout }) => {
  // ===============================
  // SCROLL POR ID (NÃO ALTERAR)
  // ===============================
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // ===============================
  // VOLTAR AO TOPO (usa menu como fallback)
  // ===============================
  const scrollToTop = () => {
    const menu = document.getElementById("titulo_menu");

    if (menu) {
      menu.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
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
                alt="Facebook"
              />
            </CirculoIconeFooter>

            {/* SVG CORRIGIDO (SEM d quebrado) */}
            <CirculoIconeFooter href="https://www.instagram.com/elitecoinsfc26?igsh=ZmhxdTQzd2szM2Ez">
              <CirculoIconeFooterSvg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42C12.73.222 12.148.087 11.297.048 10.444.01 10.172 0 8 0z"/>
              </CirculoIconeFooterSvg>
            </CirculoIconeFooter>

            <CirculoIconeFooter href="">
              <CirculoIconeFooterImg
                src={iconeYoutoobe}
                alt="YouTube"
              />
            </CirculoIconeFooter>
          </BoxIconesFooter>
        </ContainerRedesSociais>

        {/* ================= NAVEGAÇÃO ================= */}
        <ContainerFooter1>
          <List>
            Navegação
            <ListItem onClick={() => scrollToSection("titulo_menu")}>Menu</ListItem>
            <ListItem onClick={() => scrollToSection("titulo_duvidas")}>Principais dúvidas</ListItem>
            <ListItem onClick={() => scrollToSection("titulo_recarga")}>Recarga</ListItem>
            <ListItem onClick={() => scrollToSection("titulo_sobre")}>Sobre</ListItem>
            <ListItem onClick={() => scrollToSection("titulo_contato")}>Contato</ListItem>
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

            <VoltarTopo onClick={scrollToTop}>
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