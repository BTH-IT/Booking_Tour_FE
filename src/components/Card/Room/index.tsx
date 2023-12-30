import React, { useEffect, useRef, useState } from 'react';
import { Rate } from 'antd';
import * as Styles from './style';

import { IRoom } from 'room';

const Room: React.FC<IRoom> = ({
  name,
  roomImages,
  price,
  reviews,
  rate,
  description,
  salePercent,
  _id,
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
        <Styles.CardWrapper href={`/room/${_id}`}>
          <Styles.ImgWrapper>
            <Styles.Img src={roomImages[0]} alt={name} />
            {salePercent > 0 && (
              <Styles.SaleOff>{salePercent}% Off</Styles.SaleOff>
            )}
            <Styles.Price>
              From&nbsp;
              {salePercent > 0 && (
                <span> ${price - (price * salePercent) / 100} </span>
              )}
              &nbsp;${price}
            </Styles.Price>
          </Styles.ImgWrapper>
          <Styles.CardInfo>
            <Styles.CardInfoTitle>{name}</Styles.CardInfoTitle>
            <Styles.CardInfoDescription>
              {description}
            </Styles.CardInfoDescription>
            <Styles.CardInfoReviews>
              <Rate allowHalf disabled defaultValue={rate} />
              <span>({reviews.length} Reviews)</span>
            </Styles.CardInfoReviews>
            <Styles.CardInfoBookNow>
              <span>
                BOOK NOW <Styles.CustomRightOutlined />
              </span>
            </Styles.CardInfoBookNow>
          </Styles.CardInfo>
        </Styles.CardWrapper>
      ) : (
        <Styles.CardWrapper>
          <Styles.SkeletonImg active />
          <Styles.CardInfo>
            <Styles.SkeletonTitle active />
          </Styles.CardInfo>
        </Styles.CardWrapper>
      )}
    </div>
  );
};

export default Room;
