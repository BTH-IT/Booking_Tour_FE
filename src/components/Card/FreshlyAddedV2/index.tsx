import * as Styles from './style';
import React, { useEffect, useRef, useState } from 'react';
import { Rate, Skeleton } from 'antd';
import CustomButton from '@/components/CustomButton';
import { ITour } from 'tour';
import tourService from '@/services/TourService';
import useDidMount from '@/hooks/useDidMount';

interface IFreshlyAddedProps extends ITour {
  maxWidth?: string;
}

const FreshlyAddedV2: React.FC<IFreshlyAddedProps> = ({
  maxWidth,
  ...props
}) => {
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
            <Styles.CardImg src={props.images[0]} alt={props.images[0]} />
          </a>
          {props.salePercent > 0 && (
            <Styles.SaleOff>{props.salePercent}% Off</Styles.SaleOff>
          )}
          <Styles.CardInfo>
            <Styles.Title>{props.name}</Styles.Title>
            <Styles.CardInfoContent>
              <Styles.CardInfoContentTop>
                {props.salePercent > 0 ? (
                  <>
                    <Styles.CardInfoContentSalePrice>
                      From <span> ${props.price}</span>
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
              </Styles.CardInfoContentTop>
              <Styles.CardInfoContentReviews>
                <Rate allowHalf disabled defaultValue={props.rate} />
                <span>({props.reviews.length} Reviews)</span>
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

export default FreshlyAddedV2;
