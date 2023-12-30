import * as Styles from './styles';

const Logo: React.FC<{ src?: string }> = ({ src = '../logo.png' }) => {
  return (
    <Styles.LogoWrapper href="/">
      <Styles.LogoImage src={src} />
    </Styles.LogoWrapper>
  );
};

export default Logo;
