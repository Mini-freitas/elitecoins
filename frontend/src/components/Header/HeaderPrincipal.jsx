import React from 'react';
import { HeaderContainer} from './styles';
import Logo from '../Logo/Logo';
import Ferramentas from '../Ferramentas/Ferramentas';

const HeaderPrincipal = ({ usuario, handleLogout }) => {
    return (
        <HeaderContainer>
            <Logo />
            <Ferramentas usuario={usuario} handleLogout={handleLogout} />
        </HeaderContainer>
    );
};

export default HeaderPrincipal;
