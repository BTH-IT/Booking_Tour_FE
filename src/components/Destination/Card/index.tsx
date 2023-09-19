import * as Styles from './style';
import React from 'react';
import { ICards } from '../renderCard';

const Card: React.FC<ICards> = ({ title, subtitle, img, view, tours }) => {
  return (
    <Styles.CardWrapper>
      <Styles.img src={img} alt="" />
      <Styles.Title>{title}</Styles.Title>
      <Styles.subTitle>{subtitle}</Styles.subTitle>
      <Styles.View>{view}</Styles.View>
      <Styles.Tours>{tours}</Styles.Tours>
    </Styles.CardWrapper>
  );
};

export default Card;
