import * as Styles from './style';
import React from 'react';
import { Rate } from 'antd';
import { ITour } from 'tour';

const PopularTour: React.FC<ITour> = ({
  name,
  imageList,
  salePercent,
  price,
  reviewList,
  rate,
  dayList,
  id,
}) => {
  return (
    <Styles.CardWrapper href={'/' + id}>
      <Styles.Img src={imageList[0]} alt={name} />
      {salePercent > 0 && <Styles.SaleOff>{salePercent}% Off</Styles.SaleOff>}
      <Styles.CardInfo>
        <Styles.Title>{name}</Styles.Title>
        <Styles.CardInfoContent className='card-info-content'>
          <Styles.CardInfoContentLeft>
            <Styles.CardInfoContentDays>
              {`${dayList.length} Days ${dayList.length - 1} Nights`}
            </Styles.CardInfoContentDays>
            <Styles.CardInfoContentReviews>
              <Rate allowHalf disabled defaultValue={rate} />
              <span>({reviewList.length} Reviews)</span>
            </Styles.CardInfoContentReviews>
          </Styles.CardInfoContentLeft>
          <Styles.CardInfoContentRight>
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
                <p> </p>
                <Styles.CardInfoContentPrice>
                  ${price}
                </Styles.CardInfoContentPrice>
              </>
            )}
          </Styles.CardInfoContentRight>
        </Styles.CardInfoContent>
      </Styles.CardInfo>
    </Styles.CardWrapper>
  );
};

export default PopularTour;
