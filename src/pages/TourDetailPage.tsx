import FreshlyAdded from '@/components/Card/FreshlyAdded';
import { TourReviews } from '@/components/Reviews';
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
import { toast } from 'react-toastify';
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

  console.log(tourId);

  if (!tourId) {
    navigate('/');
    return <></>;
  }

  useDidMount(async () => {
    const res = await tourService.getATour(tourId);

    if (!res) return;

    await fetchTourList();
    setTour(res.result);
  });

  async function fetchTourList() {
    try {
      const data = await tourService.getAllTour();

      setTourList(data.result);
    } catch (error) {
      toast.error('Sever is wrong');
    }
  }

  return (
    tour && (
      <>
        <SearchTitle>{''}</SearchTitle>
        <Container className='container'>
          <TourDetailNav />
          <TourDetailHeader {...tour} />
          <TourDetailGallery {...tour} />
          <TourDetailContentStyled>
            <Row gutter={[10, 10]}>
              <Col xs={24} md={16}>
                <TourDetailLeft {...tour} />
              </Col>
              <Col xs={24} md={8}>
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
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 1150,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
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
                  maxWidth='325px'
                  key={freshlyAdded.imageList[0]}
                />
              ))}
            </SliderBase>
          </TourDetailContent>
          {/* <TourReviews {...tour} /> */}
        </Container>
      </>
    )
  );
};

export default TourDetailPage;
