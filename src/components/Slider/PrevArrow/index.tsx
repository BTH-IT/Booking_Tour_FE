import { BsChevronLeft } from 'react-icons/bs';
import { PrevArrowStyled } from './styles';

const PrevArrow = ({ onClick }: any) => {
  return (
    <PrevArrowStyled onClick={onClick}>
      <div className="next-slick-arrow">
        <BsChevronLeft></BsChevronLeft>
      </div>
    </PrevArrowStyled>
  );
};

export default PrevArrow;
