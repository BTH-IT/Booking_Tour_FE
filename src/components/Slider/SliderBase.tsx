import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { SliderStyled } from './styles';

const responsive = [
  {
    breakpoint: 1500,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 1000,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: (
    <div>
      <div className="next-slick-arrow">
        <BsChevronRight></BsChevronRight>
      </div>
    </div>
  ),
  prevArrow: (
    <div>
      <div className="prev-slick-arrow">
        <BsChevronLeft></BsChevronLeft>
      </div>
    </div>
  ),
  responsive,
  autoplay: true,
  autoplaySpeed: 5000,
};

const SliderBase = ({
  children,
  config = {},
  configResponsive = [],
}: {
  children: React.ReactNode;
  config?: any;
  configResponsive?: any[];
}) => {
  const newConfig = {
    ...settings,
    ...config,
    responsive: configResponsive.length > 0 ? configResponsive : responsive,
  };
  return <SliderStyled {...newConfig}>{children}</SliderStyled>;
};

export default SliderBase;
