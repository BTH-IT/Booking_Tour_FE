import { InputProps } from 'antd'; // Nhập Select từ antd
import * as Styles from './styles';
import { TextareaProps } from '@/components/ui/textarea';

type CompoundedComponent = InputProps &
  TextareaProps & {
    label?: string;
    rules?: any;
    isPassword?: boolean;
    isTextArea?: boolean;
    isSelect?: boolean; // Thêm thuộc tính này
    options?: { value: string; label: string }[]; // Thêm thuộc tính cho các tùy chọn select
  };

const InputFormItem = ({
  name,
  label,
  rules,
  isPassword = false,
  isTextArea = false,
  isSelect = false,
  options = [],
  ...props
}: CompoundedComponent) => {
  return (
    <Styles.InputFormItemStyled name={name} label={label} rules={rules}>
      {isSelect ? (
        <Styles.InputSelectStyled options={options} />
      ) : isTextArea ? (
        <Styles.InputTextAreaStyled rows={4} />
      ) : isPassword ? (
        <Styles.InputPasswordStyled {...props} />
      ) : (
        <Styles.InputStyled {...props} />
      )}
    </Styles.InputFormItemStyled>
  );
};

export default InputFormItem;
