import * as Styles from './styles';

const Overlay = ({
  $isShow,
  onClose,
}: {
  $isShow: boolean;
  onClose: () => void;
}) => {
  return (
    <Styles.OverlayWrapper
      $isShow={$isShow}
      onClick={onClose}
    ></Styles.OverlayWrapper>
  );
};

export default Overlay;
