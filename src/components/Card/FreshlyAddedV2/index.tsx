import * as Styles from './style';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Rate } from 'antd';
import CustomButton from '@/components/CustomButton';
import { ITour } from 'tour';

interface IFreshlyAddedProps extends ITour {
  maxWidth?: string;
}

const FreshlyAddedV2 = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<IFreshlyAddedProps>
>((props, ref) => {
  const {
    maxWidth,
    id,
    name,
    imageList,
    salePercent,
    price,
    rate,
    reviewList,
  } = props;
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
    <div ref={ref}>
      <div ref={elementRef}>
        {isLazyLoad ? (
          <Styles.CardWrapper $maxWidth={maxWidth}>
            <Styles.CardImg href={`/${id}`}>
              <img src={imageList[0]} alt={imageList[0]} />
            </Styles.CardImg>
            {salePercent > 0 && (
              <Styles.SaleOff>{salePercent}% Off</Styles.SaleOff>
            )}
            <Styles.CardInfo>
              <Styles.Title href={`/${id}`}>{name}</Styles.Title>
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
                    <Styles.CardInfoContentPriceWithoutSale>
                      From <span>${price}</span>
                    </Styles.CardInfoContentPriceWithoutSale>
                  )}
                </Styles.CardInfoContentTop>
                <Styles.CardInfoContentReviews>
                  <Rate allowHalf disabled defaultValue={rate} />
                  <span>({reviewList.length} Reviews)</span>
                </Styles.CardInfoContentReviews>
                <CustomButton
                  type='primary'
                  width='100%'
                  border_radius='0'
                  height='50px'
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
    </div>
  );
});

export default FreshlyAddedV2;
