import * as Styles from './style';
import React from 'react';
import { Rate } from 'antd';

interface IPopularTourProps {
  title: string;
  img: string;
  salePercent: number;
  price: number;
  reviews: number;
  rate: number;
  time: string;
}

const PopularTour: React.FC<IPopularTourProps> = ({
  title,
  img,
  salePercent,
  price,
  reviews,
  rate,
  time,
}) => {
  return (
    <Styles.CardWrapper>
      <Styles.img src={img} alt={title} />
      {salePercent > 0 && <Styles.SaleOff>{salePercent}% Off</Styles.SaleOff>}
      <Styles.CardInfo>
        <Styles.Title>{title}</Styles.Title>
        <Styles.CardInfoContent className="card-info-content">
          <Styles.CardInfoContentLeft>
            <Styles.CardInfoContentDays>{time}</Styles.CardInfoContentDays>
            <Styles.CardInfoContentReviews>
              <Rate disabled defaultValue={rate} />
              <span>({reviews} Reviews)</span>
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
