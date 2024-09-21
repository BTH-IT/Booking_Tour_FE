import { SliderStyled } from './styles';
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import { useState } from 'react';

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

const SliderBase = ({
  children,
  config = {},
  configResponsive = [],
}: {
  children: React.ReactNode;
  config?: any;
  configResponsive?: any[];
}) => {
  const [sliderRef, setSliderRef] = useState<any>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow onClick={sliderRef?.slickPrev} />,
    nextArrow: <NextArrow onClick={sliderRef?.slickNext} />,
    responsive,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const newConfig = {
    ...settings,
    ...config,
    responsive: configResponsive.length > 0 ? configResponsive : responsive,
  };
  return (
    <SliderStyled ref={setSliderRef} {...newConfig}>
      {children}
    </SliderStyled>
  );
};

export default SliderBase;
