import * as Styles from './style';
import React, { useEffect, useRef, useState } from 'react';
import { Rate, Skeleton } from 'antd';
import CustomButton from '@/components/CustomButton';

interface IFreshlyAddedProps {
  title: string;
  img: string;
  salePercent: number;
  price: number;
  reviews: number;
  rate: number;
  maxWidth?: string;
}

const FreshlyAddedV2: React.FC<IFreshlyAddedProps> = ({
  title,
  img,
  salePercent,
  price,
  reviews,
  rate,
  maxWidth,
}) => {
  const [isLazyLoad, setIsLazyLoad] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsLazyLoad(entry.isIntersecting);
      });
    });

    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [elementRef.current]);

  return isLazyLoad ? (
    <Styles.CardWrapper $maxWidth={maxWidth} ref={elementRef}>
      <a href="/">
        <Styles.CardImg src={img} alt={title} />
      </a>
      {salePercent > 0 && <Styles.SaleOff>{salePercent}% Off</Styles.SaleOff>}
      <Styles.CardInfo>
        <Styles.Title>{title}</Styles.Title>
        <Styles.CardInfoContent>
          <Styles.CardInfoContentTop>
            {salePercent > 0 ? (
              <>
                <Styles.CardInfoContentSalePrice>
                  From <span> ${price}</span>
                </Styles.CardInfoContentSalePrice>
                <Styles.CardInfoContentPrice>
                  ${price - price * (salePercent / 100)}
                </Styles.CardInfoContentPrice>
              </>
            ) : (
              <>
                <Styles.CardInfoContentPriceWithoutSale>
                  From <span>${price}</span>
                </Styles.CardInfoContentPriceWithoutSale>
              </>
            )}
          </Styles.CardInfoContentTop>
          <Styles.CardInfoContentReviews>
            <Rate allowHalf disabled defaultValue={rate} />
            <span>({reviews} Reviews)</span>
          </Styles.CardInfoContentReviews>
          <CustomButton
            type="primary"
            width="100%"
            border_radius="0"
            height="50px"
          >
            View Detail
          </CustomButton>
        </Styles.CardInfoContent>
      </Styles.CardInfo>
    </Styles.CardWrapper>
  ) : (
    <Styles.CardWrapper $maxWidth={maxWidth} ref={elementRef}>
      <Styles.SkeletonImg active />
      <Styles.CardInfo>
        <Styles.SkeletonTitle active />
      </Styles.CardInfo>
    </Styles.CardWrapper>
  );
};

export default FreshlyAddedV2;
