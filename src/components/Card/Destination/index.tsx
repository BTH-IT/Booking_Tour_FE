import * as Styles from './style';
import React, { useState } from 'react';
import ButtonLink from '@/components/ButtonLink';
import { IDestination } from 'destination';
import useDidMount from '@/hooks/useDidMount';
import tourService from '@/services/TourService';
import { toast } from 'react-toastify';

const Destination: React.FC<IDestination> = ({ id, name, desc, image }) => {
  const [tours, setTours] = useState<number>(0);

  async function handleFetchTourLength() {
    try {
      const data = await tourService.getAllTours({ destination: id });

      setTours(data.result.length);
    } catch {
      toast.error('Oops!! Something is wrong');
    }
  }

  useDidMount(() => {
    handleFetchTourLength();
  });
  return (
    <Styles.CardWrapper>
      <Styles.Img src={image} alt={name} />
      <Styles.Tours>{tours} Tours</Styles.Tours>
      <Styles.CardInfo>
        <Styles.Title>{name}</Styles.Title>
        <Styles.subTitle>{desc}</Styles.subTitle>
        <ButtonLink
          href={'/search?destination=' + id}
          icon={false}
          $fontSize='1.4rem'
          color='#5c98f2'
          $hoverColor='#7cb0fc'
          $fontWeight={600}
          $borderBottom={false}
        >
          View all tours
        </ButtonLink>
      </Styles.CardInfo>
    </Styles.CardWrapper>
  );
};

export default Destination;
