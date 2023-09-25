import * as Styles from './style';
import React from 'react';
import { Rate } from 'antd';
import CustomButton from '@/components/CustomButton';

interface IFreshlyAddedProps {
  title: string;
  img: string;
  salePercent: number;
  price: number;
  reviews: number;
  rate: number;
  max_width?: string;
}

const FreshlyAddedV2: React.FC<IFreshlyAddedProps> = ({
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
        <Styles.CardImg src={img} alt={title} />
      </a>
      {salePercent > 0 && <Styles.SaleOff>{salePercent}% Off</Styles.SaleOff>}
      <Styles.CardInfo>
        <Styles.Title>{title}</Styles.Title>
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
              <>
                <Styles.CardInfoContentPriceWithoutSale>
                  From <span>${price}</span>
                </Styles.CardInfoContentPriceWithoutSale>
              </>
            )}
          </Styles.CardInfoContentTop>
          <Styles.CardInfoContentReviews>
            <Rate allowHalf disabled defaultValue={rate} />
            <span>({reviews} Reviews)</span>
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
  );
};

export default FreshlyAddedV2;
