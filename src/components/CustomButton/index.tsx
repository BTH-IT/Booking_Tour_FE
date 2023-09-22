import { Button } from 'antd';
import * as Styles from './styles';

interface ICustomButton {
  children: string;
  type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
}

const CustomButton = ({ children, type = 'primary' }: ICustomButton) => {
  return (
    <Styles.CustomButtonStyled type={type}>
      {children}
    </Styles.CustomButtonStyled>
  );
};

export default CustomButton;
