import CustomButton from '@/components/CustomButton';
import Currency from './Currency';
import Language from './Language';
import * as Styles from './styles';

const RightHeader = ({ onShowModal }: { onShowModal: () => void }) => {
  return (
    <Styles.RightHeaderWrapper>
      <Language></Language>
      <Currency></Currency>
      <CustomButton onClick={onShowModal}>Login</CustomButton>
    </Styles.RightHeaderWrapper>
  );
};

export default RightHeader;
