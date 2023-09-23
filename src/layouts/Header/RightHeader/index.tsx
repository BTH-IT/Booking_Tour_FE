import CustomButton from '@/components/CustomButton';
import Currency from './Currency';
import Language from './Language';
import * as Styles from './styles';

const RightHeader = () => {
  return (
    <Styles.RightHeaderWrapper>
      <Language></Language>
      <Currency></Currency>
      <CustomButton>Login</CustomButton>
    </Styles.RightHeaderWrapper>
  );
};

export default RightHeader;
