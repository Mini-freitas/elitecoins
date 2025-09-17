import React from 'react';
import MainCompra from '../../components/Main/MainCompra';
import FooterCompra from '../../components/Footer/FooterCompra';
import MyGlobalStyle from '../../styles/globalStyles';
import HeaderPrincipal from '../../components/Header/HeaderPrincipal';

const Compra = ({ usuario, handleLogout }) => {
  return (
    <>
      <MyGlobalStyle />
      <HeaderPrincipal usuario={usuario} handleLogout={handleLogout} />
      <MainCompra usuario={usuario} />
      <FooterCompra usuario={usuario} handleLogout={handleLogout} />
    </>
  );
};
export default Compra;
