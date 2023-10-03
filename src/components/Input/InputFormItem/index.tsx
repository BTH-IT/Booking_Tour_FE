import { InputProps } from 'antd';
import * as Styles from './styles';

type CompoundedComponent = InputProps & {
  label: string;
  rules?: any;
};

const InputFormItem = ({
  name,
  label,
  rules,
  ...props
}: CompoundedComponent) => {
  return (
    <Styles.InputFormItemStyled name={name} label={label} rules={rules}>
      <Styles.InputStyled {...props} />
    </Styles.InputFormItemStyled>
  );
};

export default InputFormItem;
