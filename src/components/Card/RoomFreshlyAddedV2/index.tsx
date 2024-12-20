import * as Styles from './style';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Rate } from 'antd';
import CustomButton from '@/components/CustomButton';
import { IRoom } from 'room';

interface IRoomFreshlyAddedProps extends IRoom {
  maxWidth?: string;
}

const RoomFreshlyAddedV2 = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<IRoomFreshlyAddedProps>
>((props, ref) => {
  const { maxWidth, id, name, images, price, reviews } = props;
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

  const rate =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div ref={ref}>
      <div ref={elementRef}>
        {isLazyLoad ? (
          <Styles.CardWrapper $maxWidth={maxWidth}>
            <Styles.CardImg href={`/room/${id}`}>
              <img src={images[0]} alt={images[0]} />
            </Styles.CardImg>
            <Styles.CardInfo>
              <Styles.Title href={`/room/${id}`}>{name}</Styles.Title>
              <Styles.CardInfoContent>
                <Styles.CardInfoContentTop>
                  <Styles.CardInfoContentPriceWithoutSale>
                    From <span>${price}</span>
                  </Styles.CardInfoContentPriceWithoutSale>
                </Styles.CardInfoContentTop>
                <Styles.CardInfoContentReviews>
                  <Rate allowHalf disabled defaultValue={rate} />
                  <span>({reviews.length} Reviews)</span>
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
    </div>
  );
});

export default RoomFreshlyAddedV2;
