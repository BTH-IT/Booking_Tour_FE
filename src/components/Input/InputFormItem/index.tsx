import { InputProps } from 'antd';
import * as Styles from './styles';

type CompoundedComponent = InputProps & {
  label: string;
};

const InputFormItem = ({ name, label, ...props }: CompoundedComponent) => {
  return (
    <Styles.InputFormItemStyled name={name} label={label}>
      <Styles.InputStyled {...props} />
    </Styles.InputFormItemStyled>
  );
};

export default InputFormItem;
