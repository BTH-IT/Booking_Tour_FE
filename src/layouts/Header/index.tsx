import Logo from '@/components/Logo';
import * as Styles from './styles';
import NavHeader from './NavHeader';
import RightHeader from './RightHeader';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

interface IHeaderProps {
  onClick: () => void;
  handleShowModal: () => void;
  isShowSidebar: boolean;
}

const Header = ({ isShowSidebar, onClick, handleShowModal }: IHeaderProps) => {
  const [isScroll, setIsScroll] = useState(window.scrollY > 0);
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(() => {
    const pathSegments = location.pathname.split('/');

    return pathSegments[1] === 'tour' && pathSegments[2]?.length > 0;
  });

  const handleScroll = useCallback(() => {
    setIsScroll(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Styles.HeaderWrapper $isScroll={isScroll} $isSticky={isSticky}>
      <Styles.HeaderContainer $isScroll={isScroll}>
        <Logo />
        <Styles.HeaderResponsive>
          <NavHeader />
          <RightHeader handleShowModal={handleShowModal} />
        </Styles.HeaderResponsive>
        <Styles.HeaderResponsiveIcon onClick={onClick}>
          {isShowSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
        </Styles.HeaderResponsiveIcon>
      </Styles.HeaderContainer>
    </Styles.HeaderWrapper>
  );
};

export default Header;
