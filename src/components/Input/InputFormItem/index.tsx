import { InputProps } from "antd";
import * as Styles from "./styles";

type CompoundedComponent = InputProps & {
  label?: string;
  rules?: any;
  isPassword?: boolean;
};

const InputFormItem = ({
  name,
  label,
  rules,
  isPassword = false,
  ...props
}: CompoundedComponent) => {
  return (
    <Styles.InputFormItemStyled name={name} label={label} rules={rules}>
      {isPassword ? (
        <Styles.InputPasswordStyled {...props} />
      ) : (
        <Styles.InputStyled {...props} />
      )}
    </Styles.InputFormItemStyled>
  );
};

export default InputFormItem;
