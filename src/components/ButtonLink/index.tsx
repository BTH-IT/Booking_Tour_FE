import { BsArrowRight } from 'react-icons/bs';
import * as Styles from './styles';

interface IButtonLinkProps extends Styles.IButtonLinkWrapperProps {
  href: string;
  children: string;
  icon?: boolean;
}

const ButtonLink = ({
  border_bottom,
  color_bottom,
  hover_color_bottom,
  font_weight,
  color,
  hover_color,
  font_size,
  children,
  href,
  icon = false,
}: IButtonLinkProps) => {
  return (
    <Styles.ButtonLinkWrapper
      href={href}
      border_bottom={border_bottom}
      color_bottom={color_bottom}
      hover_color_bottom={hover_color_bottom}
      font_weight={font_weight}
      color={color}
      hover_color={hover_color}
      font_size={font_size}
    >
      {children}
      {icon && <BsArrowRight></BsArrowRight>}
    </Styles.ButtonLinkWrapper>
  );
};

export default ButtonLink;
