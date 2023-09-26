import * as Styles from './style';
import React, { useEffect, useRef, useState } from 'react';
import { Rate, Skeleton } from 'antd';

interface IFreshlyAddedProps {
  title: string;
  img: string;
  salePercent: number;
  price: number;
  reviews: number;
  rate: number;
  maxWidth?: string;
}

const FreshlyAdded: React.FC<IFreshlyAddedProps> = ({
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
        if (entry.isIntersecting && !isLazyLoad) {
          setIsLazyLoad(entry.isIntersecting);
        }
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

  return (
    <Styles.CardWrapper $maxWidth={maxWidth} ref={elementRef}>
      {isLazyLoad && (
        <a href="/">
          <Styles.img src={img} alt={title} />
        </a>
      )}
      {salePercent > 0 && <Styles.SaleOff>{salePercent}% Off</Styles.SaleOff>}
      <Styles.CardInfo>
        <Styles.Title>{title}</Styles.Title>
        <Styles.CardInfoContent>
          <Styles.CardInfoContentReviews>
            <Rate allowHalf disabled defaultValue={rate} />
            <span>({reviews} Reviews)</span>
          </Styles.CardInfoContentReviews>
          <Styles.CardInfoContentBottom>
            {salePercent > 0 ? (
              <>
                <Styles.CardInfoContentSalePrice>
                  ${price}
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
          </Styles.CardInfoContentBottom>
        </Styles.CardInfoContent>
      </Styles.CardInfo>
    </Styles.CardWrapper>
  );
};

export default FreshlyAdded;
