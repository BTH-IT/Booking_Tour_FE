import Logo from '@/components/Logo';
import * as Styles from './styles';
import NavHeader from './NavHeader';
import RightHeader from './RightHeader';

const Header = () => {
  return (
    <Styles.HeaderWrapper>
      <Styles.HeaderContainer>
        <Logo></Logo>
        <NavHeader></NavHeader>
        <RightHeader></RightHeader>
      </Styles.HeaderContainer>
    </Styles.HeaderWrapper>
  );
};

export default Header;
