import { Outlet } from 'react-router';
import styled from 'styled-components';
import { useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Overlay from './Overlay';

interface IMainLayoutStyledProps {
  isshow: 1 | 0;
}

const MainLayoutStyled = styled.div<IMainLayoutStyledProps>`
  position: relative;
  transition: all 0.3s ease;
  transform: ${({ isshow }) =>
    isshow ? 'translateX(-350px)' : 'translateX(0)'};
  background-color: #f8f8f8;
  z-index: 2;
`;

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <MainLayoutStyled isshow={showSidebar ? 1 : 0}>
        <Header
          isShowSidebar={showSidebar}
          onClick={() => setShowSidebar((prev) => !prev)}
        ></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        <Overlay
          isShow={showSidebar}
          onClose={() => setShowSidebar(false)}
        ></Overlay>
      </MainLayoutStyled>
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)}></Sidebar>}
    </>
  );
};

export default MainLayout;
