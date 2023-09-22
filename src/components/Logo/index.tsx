import * as Styles from './styles';

const Logo = () => {
  return (
    <Styles.LogoWrapper>
      <Styles.LogoLink href="/">
        <Styles.LogoImage src="./logo.png" />
      </Styles.LogoLink>
    </Styles.LogoWrapper>
  );
};

export default Logo;
