import { BaseButtonProps } from 'antd/es/button/button';
import * as Styles from './styles';

import React from 'react';

interface CustomButtonProps extends BaseButtonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  onClick?: () => void;
}

export const CustomButton = (
  props: CustomButtonProps,
): React.ReactElement<CustomButtonProps> => {
  const { children, ...rest } = props;
  return (
    <Styles.CustomButtonStyled {...rest}>{children}</Styles.CustomButtonStyled>
  );
};

export default CustomButton;
