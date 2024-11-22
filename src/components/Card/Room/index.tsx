import { Rate } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { IRoom } from 'room';

import * as Styles from './style';

interface IRoomProps extends IRoom {
  descriptionHeight?: string;
}

const Room: React.FC<IRoomProps> = ({ descriptionHeight, ...props }) => {
  const { name, images, price, reviews, detail, id } = props;
  const [isLazyLoad, setIsLazyLoad] = useState(false);

  const rate =
    reviews.length > 0
      ? reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
      : 5;

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
        <Styles.CardWrapper href={`/room/${id}`}>
          <Styles.ImgWrapper>
            <Styles.Img src={images[0]} alt={name} />
            <Styles.Price>From&nbsp; &nbsp;${price}</Styles.Price>
          </Styles.ImgWrapper>
          <Styles.CardInfo>
            <Styles.CardInfoTitle>{name}</Styles.CardInfoTitle>
            <Styles.CardInfoDescription descriptionHeight={descriptionHeight}>
              {detail}
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
