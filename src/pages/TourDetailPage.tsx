import FreshlyAdded from '@/components/Card/FreshlyAdded';
import Reviews from '@/components/Reviews';
import SearchTitle from '@/components/SearchTitle';
import SliderBase from '@/components/Slider/SliderBase';
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

const TourDetailContent = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
`;

const TourDetailTitle = styled.h2`
  line-height: 1.2;
  font-size: 2.3rem;
  color: black;
  font-family: 'DM Serif Display', sans-serif;
  font-weight: 500;
  margin-bottom: 20px;
`;

const TourDetailPage = () => {
  const [tour, setTour] = useState<ITour | null>(null);
  const [tourList, setTourList] = useState<ITour[]>([]);
  const { tourId } = useParams();
  const navigate = useNavigate();

  if (!tourId) {
    navigate('/');
    return <></>;
  }

  useDidMount(async () => {
    const data = await tourService.getATour(tourId);

    if (!data) return;

    await fetchTourList();
    setTour(data);
  });

  async function fetchTourList() {
    try {
      const data = await tourService.getAllTour();

      setTourList(data);
    } catch (error) {
      console.log(error);
    }
  }

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
          <TourDetailContent>
            <TourDetailTitle>Related Tours</TourDetailTitle>
            <SliderBase
              config={{
                slidesToShow: 3,
              }}
              configResponsive={[
                {
                  breakpoint: 1500,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
                {
                  breakpoint: 1150,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  },
                },
                {
                  breakpoint: 1000,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              {tourList.map((freshlyAdded) => (
                <FreshlyAdded
                  {...freshlyAdded}
                  key={freshlyAdded.images[0]}
                ></FreshlyAdded>
              ))}
            </SliderBase>
          </TourDetailContent>
          <Reviews />
        </Container>
      </>
    )
  );
};

export default TourDetailPage;
