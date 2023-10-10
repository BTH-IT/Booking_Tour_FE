import * as Styles from './style';
import React, { useEffect, useRef, useState } from 'react';
import { Rate } from 'antd';
import { ITour } from 'tour';

interface IFreshlyAddedProps extends ITour {
  maxWidth?: string;
}

const FreshlyAdded: React.FC<IFreshlyAddedProps> = ({ maxWidth, ...props }) => {
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
          <a href="/">
            <Styles.img src={props.images[0]} alt={props.images[0]} />
          </a>
          {props.salePercent > 0 && (
            <Styles.SaleOff>{props.salePercent}% Off</Styles.SaleOff>
          )}
          <Styles.CardInfo>
            <Styles.Title>{props.name}</Styles.Title>
            <Styles.CardInfoContent>
              <Styles.CardInfoContentReviews>
                <Rate allowHalf disabled defaultValue={props.rate} />
                <span>({props.reviews.length} Reviews)</span>
              </Styles.CardInfoContentReviews>
              <Styles.CardInfoContentBottom>
                {props.salePercent > 0 ? (
                  <>
                    <Styles.CardInfoContentSalePrice>
                      ${props.price}
                    </Styles.CardInfoContentSalePrice>
                    <Styles.CardInfoContentPrice>
                      ${props.price - props.price * (props.salePercent / 100)}
                    </Styles.CardInfoContentPrice>
                  </>
                ) : (
                  <>
                    <Styles.CardInfoContentPriceWithoutSale>
                      From <span>${props.price}</span>
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
