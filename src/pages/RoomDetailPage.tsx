import { Col, Row } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IRoom } from 'room';
import styled from 'styled-components';

import Room from '@/components/Card/Room';
import Loading from '@/components/Loading';
import { RoomReviews } from '@/components/Reviews';
import RoomDetailGallery from '@/components/RoomDetail/RoomDetailGallery';
import RoomDetailHeader from '@/components/RoomDetail/RoomDetailHeader';
import RoomDetailLeft from '@/components/RoomDetail/RoomDetailLeft';
import RoomDetailRight from '@/components/RoomDetail/RoomDetailRight';
import SliderBase from '@/components/Slider/SliderBase';
import { Container } from '@/constants';
import useDidMount from '@/hooks/useDidMount';
import roomService from '@/services/RoomService';
import { logError } from '@/utils/constants';

const RoomDetailContentStyled = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
  padding: 20px;
`;

const RoomDetailContent = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
`;

const RoomDetailTitle = styled.h2`
  line-height: 1.2;
  font-size: 2.3rem;
  color: black;
  display: flex;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Separator = styled.div`
  border-bottom: 1px solid #e1e1e1;
  margin-block: 30px;
  margin-inline: 40px;
`;

const OtherimageListWrapper = styled.div`
  width: 98%;
  display: flex;
  margin: 0px 20px 80px 20px;
  padding-bottom: 20px;
  gap: 10px;
  overflow-x: scroll;

  img {
    border-radius: inherit;
    width: 100%;
    height: 450px;
    object-fit: cover;
  }
`;
interface IRoomProps {
  descriptionHeight?: string;
}

const RoomDetailPage = () => {
  const [room, setRoom] = useState<IRoom | null>(null);
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const { roomId } = useParams();
  const navigate = useNavigate();

  if (!roomId) {
    navigate('/');
    return <></>;
  }

  async function fetchRoomList() {
    try {
      const params = {
        locationCode: [room?.hotel.locationCode],
      };

      const data = await roomService.getRoomSearch(params);

      // Remove the current room from the list and set the first 20 rooms
      setRoomList(
        data.result.rooms.filter((r) => r.id !== roomId).slice(0, 20)
      );
    } catch (error) {
      logError(error);
    }
  }

  useDidMount(async () => {
    try {
      fetchRoomList();

      const data = await roomService.getRoom(roomId);
      setRoom(data.result);
    } catch (error) {
      logError(error);
    }
  });

  console.log(roomList);

  return room ? (
    <>
      <Container className="container">
        <RoomDetailHeader {...room} />
        <RoomDetailGallery {...room} />
        <RoomDetailContentStyled>
          <Row gutter={[10, 10]}>
            <Col md={24} xl={17}>
              <RoomDetailLeft {...room} />
            </Col>
            <Col md={24} xl={7}>
              <RoomDetailRight {...room} />
            </Col>
          </Row>
        </RoomDetailContentStyled>
        <Separator />
        <RoomDetailContent>
          <RoomDetailTitle>More Rooms</RoomDetailTitle>
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
            {roomList.map((room) => (
              <Room {...room} descriptionHeight={'40px'} key={room.images[0]} />
            ))}
          </SliderBase>
        </RoomDetailContent>
        <RoomReviews {...room} />
      </Container>
    </>
  ) : (
    <Loading />
  );
};

export default RoomDetailPage;
