import * as Styles from './style';
import React from 'react';
import { ICards } from '../renderCard';

const Added: React.FC<ICards> = ({
  img,
  title,
  star,
  view,
  from,
  sale,
  saleOff,
}) => {
  return (
    <Styles.CardWrapper>
      <Styles.img src={img} />
      <Styles.Title>{title}</Styles.Title>
      <Styles.Top>
        <Styles.Star>{star}</Styles.Star>
        <Styles.View>{view}</Styles.View>
      </Styles.Top>
      <Styles.Bottom>
        <Styles.From>{from}</Styles.From>
        <Styles.SaleOff>{saleOff}</Styles.SaleOff>
        <Styles.Sale>{sale}</Styles.Sale>
      </Styles.Bottom>
    </Styles.CardWrapper>
  );
};

export default Added;
