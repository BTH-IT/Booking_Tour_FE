import Logo from '@/components/Logo';
import * as Styles from './styles';
import NavHeader from './NavHeader';
import RightHeader from './RightHeader';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
  return (
    <Styles.HeaderWrapper>
      <Styles.HeaderContainer>
        <Logo></Logo>
        <Styles.HeaderResponsive>
          <NavHeader></NavHeader>
          <RightHeader></RightHeader>
        </Styles.HeaderResponsive>
        <Styles.HeaderResponsiveIcon>
          <AiOutlineMenu></AiOutlineMenu>
        </Styles.HeaderResponsiveIcon>
      </Styles.HeaderContainer>
    </Styles.HeaderWrapper>
  );
};

export default Header;
