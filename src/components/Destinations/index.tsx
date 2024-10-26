import * as Styles from './styles';
import ButtonLink from '../ButtonLink';
import { Col } from 'antd';
import Destination from '../Card/Destination';
import { Container } from '@/constants';
import destinationService from '@/services/DestinationService';
import { useState } from 'react';
import { IDestination } from 'destination';
import { toast } from 'react-toastify';
import useDidMount from '@/hooks/useDidMount';
import { SkeletonImg } from '../Card/FreshlyAdded/style';
import { logError } from '@/utils/constants';

export const Destinations = () => {
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFetchDestinations() {
    setIsLoading(true);
    try {
      const res = await destinationService.getAllDestinations();

      setDestinations(res.result);
      setIsLoading(false);
    } catch (error) {
      logError(error);
    }
  }

  useDidMount(() => {
    handleFetchDestinations();
  });

  return (
    <Container>
      <Styles.DestinationsContainer>
        <Styles.DestinationsTop>
          <Styles.DestinationsTopTitle>
            Top <span>Destinations</span>
          </Styles.DestinationsTopTitle>
          <Styles.DestinationsTopDesc>
            Explore our top destinations voted by more than 100,000+ customers
            around the world.
          </Styles.DestinationsTopDesc>
          <ButtonLink
            href="/search"
            icon={true}
            $fontSize="1.4rem"
            $borderBottom={true}
            $hoverColorBottom="#5c98f2"
            color="black"
            $hoverColor="black"
          >
            All Destinations
          </ButtonLink>
        </Styles.DestinationsTop>
        <Styles.DestinationsBottom gutter={[30, 30]}>
          {!isLoading
            ? destinations.map((destination) => (
                <Col xs={24} sm={12} xl={8} key={destination.id}>
                  <Destination {...destination} />
                </Col>
              ))
            : [1, 2, 3, 4, 5, 6].map((item) => (
                <Col xs={24} sm={12} xl={8} key={item}>
                  <SkeletonImg active />
                </Col>
              ))}
        </Styles.DestinationsBottom>
      </Styles.DestinationsContainer>
    </Container>
  );
};
