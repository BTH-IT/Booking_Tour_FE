import * as Styles from './styles';

interface ICustomButton {
  children: string;
  type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
  onClick?: () => void;
  width?: string;
  height?: string;
  borderRadius?: string;
}

const CustomButton = ({
  children,
  type = 'primary',
  onClick = () => {},
  width = '190px',
  height = '100%',
  borderRadius = '10px',
}: ICustomButton) => {
  return (
    <Styles.CustomButtonStyled
      type={type}
      onClick={onClick}
      width={width}
      height={height}
      borderRadius={borderRadius}
    >
      {children}
    </Styles.CustomButtonStyled>
  );
};

export default CustomButton;
