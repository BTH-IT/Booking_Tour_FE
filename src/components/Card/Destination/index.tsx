import { ICard } from '@/components/Destinations';
import * as Styles from './style';
import React from 'react';
import ButtonLink from '@/components/ButtonLink';

const Destination: React.FC<ICard> = ({
  title,
  subtitle,
  img,
  view,
  tours,
}) => {
  return (
    <Styles.CardWrapper>
      <Styles.Img src={img} alt="" />
      <Styles.Tours>{tours}</Styles.Tours>
      <Styles.CardInfo>
        <Styles.Title>{title}</Styles.Title>
        <Styles.subTitle>{subtitle}</Styles.subTitle>
        <ButtonLink
          href="/"
          icon={false}
          $fontSize="1.4rem"
          color="#5c98f2"
          $hoverColor="#7cb0fc"
          $fontWeight={600}
          $borderBottom={false}
        >
          {view}
        </ButtonLink>
      </Styles.CardInfo>
    </Styles.CardWrapper>
  );
};

export default Destination;
