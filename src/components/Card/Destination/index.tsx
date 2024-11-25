import { IDestination } from 'destination';
import React, { useState } from 'react';

import * as Styles from './style';

import ButtonLink from '@/components/ButtonLink';
import useDidMount from '@/hooks/useDidMount';
import tourService from '@/services/TourService';
import { logError } from '@/utils/constants';

const Destination: React.FC<IDestination> = ({ id, name }) => {
  const [tours, setTours] = useState<number>(0);

  async function handleFetchTourLength() {
    try {
      const data = await tourService.getAllTours({ destination: id });

      setTours(data.result.length);
    } catch (error) {
      logError(error);
    }
  }

  useDidMount(() => {
    handleFetchTourLength();
  });
  return (
    <Styles.CardWrapper>
      <Styles.Tours>{tours} Tours</Styles.Tours>
      <Styles.CardInfo>
        <Styles.Title>{name}</Styles.Title>
        <ButtonLink
          href={'/search?destination=' + id}
          icon={false}
          $fontSize="1.4rem"
          color="#5c98f2"
          $hoverColor="#7cb0fc"
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
