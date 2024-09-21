import { BsArrowRight } from "react-icons/bs";
import * as Styles from "./styles";

interface IButtonLinkProps extends Styles.IButtonLinkWrapperProps {
  href: string;
  children: string;
  icon?: boolean;
}

const ButtonLink = ({ children, icon, ...props }: IButtonLinkProps) => {
  return (
    <Styles.ButtonLinkWrapper {...props}>
      {children}
      {icon && <BsArrowRight />}
    </Styles.ButtonLinkWrapper>
  );
};

export default ButtonLink;
