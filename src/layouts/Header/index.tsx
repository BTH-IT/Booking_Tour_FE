import Logo from '@/components/Logo';
import * as Styles from './styles';
import NavHeader from './NavHeader';
import RightHeader from './RightHeader';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useCallback, useEffect, useState } from 'react';

interface IHeaderProps {
  onClick: () => void;
  $isShowSidebar: boolean;
}

const Header = ({ $isShowSidebar, onClick }: IHeaderProps) => {
  const [$isScroll, set$isScroll] = useState(window.scrollY > 0);

  const handleScroll = useCallback(() => {
    set$isScroll(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Styles.HeaderWrapper $isScroll={$isScroll}>
      <Styles.HeaderContainer $isScroll={$isScroll}>
        <Logo></Logo>
        <Styles.HeaderResponsive>
          <NavHeader></NavHeader>
          <RightHeader></RightHeader>
        </Styles.HeaderResponsive>
        <Styles.HeaderResponsiveIcon onClick={onClick}>
          {!$isShowSidebar && <AiOutlineMenu></AiOutlineMenu>}
          {$isShowSidebar && <AiOutlineClose></AiOutlineClose>}
        </Styles.HeaderResponsiveIcon>
      </Styles.HeaderContainer>
    </Styles.HeaderWrapper>
  );
};

export default Header;
