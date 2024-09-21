import * as Styles from "./styles";
import { SelectProps } from "antd";

interface ISelectFormItemProps extends SelectProps {
  label: string;
  name: string;
  rules?: any;
}

const SelectFormItem = ({
  name,
  label,
  rules,
  ...props
}: ISelectFormItemProps) => {
  return (
    <Styles.SelectFormItemStyled name={name} label={label} rules={rules}>
      <Styles.SelectStyled {...props} />
    </Styles.SelectFormItemStyled>
  );
};

export default SelectFormItem;
