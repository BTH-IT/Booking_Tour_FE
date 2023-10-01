import * as Styles from './styles';
import { SelectProps } from 'antd';

interface ISelectFormItemProps extends SelectProps {
  label: string;
  name: string;
}

const SelectFormItem = ({ name, label, ...props }: ISelectFormItemProps) => {
  return (
    <Styles.SelectFormItemStyled name={name} label={label}>
      <Styles.SelectStyled {...props} />
    </Styles.SelectFormItemStyled>
  );
};

export default SelectFormItem;
