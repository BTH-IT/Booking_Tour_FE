import SearchTitle from '@/components/SearchTitle';
import TourDetailGallery from '@/components/TourDetail/TourDetailGallery';
import TourDetailHeader from '@/components/TourDetail/TourDetailHeader';
import TourDetailLeft from '@/components/TourDetail/TourDetailLeft';
import TourDetailNav from '@/components/TourDetail/TourDetailNav';
import TourDetailRight from '@/components/TourDetail/TourDetailRight';
import { Container } from '@/constants';
import useDidMount from '@/hooks/useDidMount';
import tourService from '@/services/TourService';
import { Col, Row } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ITour } from 'tour';

const TourDetailContentStyled = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
  padding: 20px;
`;

const TourDetailPage = () => {
  const [tour, setTour] = useState<ITour | null>(null);
  const { tourId } = useParams();
  const navigate = useNavigate();

  if (!tourId) {
    navigate('/');
    return <></>;
  }

  useDidMount(async () => {
    const data = await tourService.getATour('651e543d213d7221a0ac234a');

    if (!data) return;

    setTour(data);
  });

  return (
    tour && (
      <>
        <SearchTitle>{''}</SearchTitle>
        <Container>
          <TourDetailNav />
          <TourDetailHeader {...tour} />
          <TourDetailGallery {...tour} />
          <TourDetailContentStyled>
            <Row gutter={[10, 10]}>
              <Col xs={16}>
                <TourDetailLeft {...tour} />
              </Col>
              <Col xs={8}>
                <TourDetailRight {...tour} />
              </Col>
            </Row>
          </TourDetailContentStyled>
        </Container>
      </>
    )
  );
};

export default TourDetailPage;
