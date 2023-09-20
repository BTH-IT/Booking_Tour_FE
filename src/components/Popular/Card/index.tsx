import * as Styles from './style';
import React from 'react';
import { ICards } from '../renderCard';

const Popular: React.FC<ICards> = ({
  img,
  title,
  text,
  star,
  sale,
  saleoff,
}) => {
  return (
    <Styles.CardWrapper>
      <Styles.img src={img} />
      <Styles.Title>{title}</Styles.Title>
      <Styles.CardInfo>
        <Styles.Text>{text}</Styles.Text>
        <Styles.Star>{star}</Styles.Star>
        <Styles.Sale>{sale}</Styles.Sale>
        <Styles.SaleOff>{saleoff}</Styles.SaleOff>
      </Styles.CardInfo>
    </Styles.CardWrapper>
  );
};

export default Popular;
