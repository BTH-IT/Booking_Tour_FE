import { BaseButtonProps, ButtonProps } from 'antd/es/button/button';
import * as Styles from './styles';

import React from 'react';

interface CustomButtonProps extends ButtonProps {
  width?: string;
  height?: string;
  border_radius?: string;
  onClick?: () => void;
}

const CustomButton = (
  props: CustomButtonProps,
): React.ReactElement<CustomButtonProps> => {
  const { children, ...rest } = props;
  return (
    <Styles.CustomButtonStyled {...rest}>{children}</Styles.CustomButtonStyled>
  );
};

export default CustomButton;
