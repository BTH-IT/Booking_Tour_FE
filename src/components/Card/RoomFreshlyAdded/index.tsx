import * as Styles from './style';
import React, { useEffect, useRef, useState } from 'react';
import { Rate } from 'antd';
import { IRoom } from 'room';

interface IRoomFreshlyAddedProps extends IRoom {
  maxWidth?: string;
}

const RoomFreshlyAdded: React.FC<IRoomFreshlyAddedProps> = ({
  maxWidth,
  ...props
}) => {
  const { id, images, name, reviews, price, isAvailable, maxGuests } = props;
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
    <div ref={elementRef}>
      {isLazyLoad ? (
        <Styles.CardWrapper $maxWidth={maxWidth}>
          <Styles.Img href={`/room/${id}`}>
            <img src={images[0]} alt={images[0]} />
          </Styles.Img>
          <Styles.CardInfo>
            <Styles.Title href={`/room/${id}`}>{name}</Styles.Title>
            <Styles.CardInfoContent>
              <Styles.CardInfoContentReviews>
                <Rate allowHalf disabled defaultValue={rate} />
                <span>({reviews.length} Reviews)</span>
              </Styles.CardInfoContentReviews>
              <Styles.CardInfoContentBottom>
                <Styles.CardInfoContentPriceWithoutSale>
                  From <span>${price}</span>
                </Styles.CardInfoContentPriceWithoutSale>
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

export default RoomFreshlyAdded;
