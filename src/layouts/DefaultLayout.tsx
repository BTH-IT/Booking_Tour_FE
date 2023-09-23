import { Outlet } from 'react-router';
import styled from 'styled-components';
import { useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Overlay from './Overlay';

interface IDefaultStyledProps {
  isshow: 1 | 0;
}

const DefaultStyled = styled.div<IDefaultStyledProps>`
  position: relative;
  transition: all 0.3s ease;
  transform: ${({ isshow }) =>
    isshow ? 'translateX(-350px)' : 'translateX(0)'};
  background-color: #f8f8f8;
  z-index: 2;
`;

const DefaultLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <DefaultStyled isshow={showSidebar ? 1 : 0}>
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
      </DefaultStyled>
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)}></Sidebar>}
    </>
  );
};

export default DefaultLayout;
