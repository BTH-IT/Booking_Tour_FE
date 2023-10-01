import { Form, Input, InputProps, InputRef } from 'antd';
import * as Styles from './styles';

// type CompoundedComponent = React.ForwardRefExoticComponent<
//   InputProps & React.RefAttributes<InputRef>
// > & {
//   Group: typeof Group;
//   Search: typeof Search;
//   TextArea: typeof TextArea;
//   Password: typeof Password;
// };

interface IInputFormItemProps {
  label: string;
  name: string;
  placeholder?: string;
  bordered?: boolean;
  allowClear?: boolean;
  type?: string;
}

const InputFormItem = ({ name, label, ...props }: IInputFormItemProps) => {
  return (
    <Styles.InputFormItemStyled name={name} label={label}>
      <Styles.InputStyled {...props} />
    </Styles.InputFormItemStyled>
  );
};

export default InputFormItem;
