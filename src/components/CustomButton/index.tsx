import { BaseButtonProps } from 'antd/es/button/button';
import * as Styles from './styles';

import React from 'react';

interface CustomButtonProps extends BaseButtonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  onClick?: () => void;
}
interface ICustomButton {
  children: string;
  type?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
  onClick?: () => void;
  width?: string;
  height?: string;
  borderRadius?: string;
}

// const CustomButton = ({
//   children,
//   type = 'primary',
//   onClick = () => {},
//   width = '190px',
//   height = '100%',
//   borderRadius = '10px',
// }: ICustomButton) => {
//   return (
//     <Styles.CustomButtonStyled
//       type={type}
//       onClick={onClick}
//       width={width}
//       height={height}
//       borderRadius={borderRadius}
//     >
//       {children}
//     </Styles.CustomButtonStyled>
//   );
// };
const CustomButton = (
  props: CustomButtonProps,
): React.ReactElement<CustomButtonProps> => {
  const { children, ...rest } = props;
  return (
    <Styles.CustomButtonStyled {...rest} >{children}</Styles.CustomButtonStyled>
  );
};

export default CustomButton;
