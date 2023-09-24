import * as Styles from './styles';

const Logo = ({ src = './logo.png' }: { src?: string }) => {
  return (
    <Styles.LogoWrapper href="/">
      <Styles.LogoImage src={src} />
    </Styles.LogoWrapper>
  );
};

export default Logo;
