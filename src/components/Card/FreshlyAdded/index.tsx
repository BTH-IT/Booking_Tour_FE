import * as Styles from './style';
import React, { useEffect, useRef, useState } from 'react';
import { Rate } from 'antd';
import { ITour } from 'tour';

interface IFreshlyAddedProps extends ITour {
  maxWidth?: string;
}

const FreshlyAdded: React.FC<IFreshlyAddedProps> = ({ maxWidth, ...props }) => {
  const { id, imageList, salePercent, name, rate, reviewList, price } = props;
  const [isLazyLoad, setIsLazyLoad] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIsLazyLoad(entries[0].isIntersecting);
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
    <div ref={elementRef}>
      {isLazyLoad ? (
        <Styles.CardWrapper $maxWidth={maxWidth}>
          <Styles.Img href={`/tour/${id}`}>
            <img src={imageList[0]} alt={imageList[0]} />
          </Styles.Img>
          {salePercent > 0 && (
            <Styles.SaleOff>{salePercent}% Off</Styles.SaleOff>
          )}
          <Styles.CardInfo>
            <Styles.Title href={`/tour/${id}`}>{name}</Styles.Title>
            <Styles.CardInfoContent>
              <Styles.CardInfoContentReviews>
                <Rate allowHalf disabled defaultValue={rate} />
                <span>({reviewList.length} Reviews)</span>
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
      ) : (
        <Styles.CardWrapper $maxWidth={maxWidth}>
          <Styles.SkeletonImg active />
          <Styles.CardInfo>
            <Styles.SkeletonTitle active />
          </Styles.CardInfo>
        </Styles.CardWrapper>
      )}
    </div>
  );
};

export default FreshlyAdded;
