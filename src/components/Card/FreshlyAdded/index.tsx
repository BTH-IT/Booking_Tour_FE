import * as Styles from './style';
import React from 'react';
import { Rate } from 'antd';

interface IFreshlyAddedProps {
  title: string;
  img: string;
  salePercent: number;
  price: number;
  reviews: number;
  rate: number;
  max_width?: string;
}

const FreshlyAdded: React.FC<IFreshlyAddedProps> = ({
  title,
  img,
  salePercent,
  price,
  reviews,
  rate,
  max_width,
}) => {
  return (
    <Styles.CardWrapper max_width={max_width}>
      <a href="/">
        <Styles.img src={img} alt={title} />
      </a>
      {salePercent > 0 && <Styles.SaleOff>{salePercent}% Off</Styles.SaleOff>}
      <Styles.CardInfo>
        <Styles.Title>{title}</Styles.Title>
        <Styles.CardInfoContent>
          <Styles.CardInfoContentReviews>
            <Rate disabled defaultValue={rate} />
            <span>({reviews} Reviews)</span>
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
  );
};

export default FreshlyAdded;
