import * as Styles from './styles';

const Overlay = ({
  isShow,
  onClose,
}: {
  isShow: boolean;
  onClose: () => void;
}) => {
  return (
    <Styles.OverlayWrapper
      isshow={isShow ? 1 : 0}
      onClick={onClose}
    ></Styles.OverlayWrapper>
  );
};

export default Overlay;
