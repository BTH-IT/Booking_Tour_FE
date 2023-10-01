import React from 'react';
import * as Styles from './styles';
import { SelectProps } from 'antd';

interface ISelectFormItemProps {
  label: string;
  name: string;
  size?: string;
  options?: any;
  bordered?: boolean;
}

const SelectFormItem = ({ name, label, ...props }: any) => {
  return (
    <Styles.SelectFormItemStyled name={name} label={label}>
      <Styles.SelectStyled {...props} />
    </Styles.SelectFormItemStyled>
  );
};

export default SelectFormItem;
