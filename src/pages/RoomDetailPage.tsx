import { RoomReviews } from '@/components/Reviews';
import SliderBase from '@/components/Slider/SliderBase';
import RoomDetailGallery from '@/components/RoomDetail/RoomDetailGallery';
import RoomDetailHeader from '@/components/RoomDetail/RoomDetailHeader';
import RoomDetailLeft from '@/components/RoomDetail/RoomDetailLeft';
import RoomDetailRight from '@/components/RoomDetail/RoomDetailRight';
import { Container } from '@/constants';
import useDidMount from '@/hooks/useDidMount';
import roomService from '@/services/RoomService';
import { Col, Row } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { IRoom } from 'room';
import Room from '@/components/Card/Room';
import { AxiosError } from 'axios';
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
  font-family: 'DM Serif Display', sans-serif;
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

  useDidMount(async () => {
    try {
      const data = await roomService.getRoom(roomId);
      setRoom(data.result);
    } catch (error) {
      logError(error);
    }
  });

  async function fetchRoomList() {
    try {
      const data = await roomService.getAllRooms();

      setRoomList(data.result);
    } catch (error) {
      logError(error);
    }
  }

  return (
    room && (
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
          <OtherimageListWrapper>
            {room.images?.map((img, idx) => {
              return <img key={idx} src={img} alt="Other Image" />;
            })}
          </OtherimageListWrapper>
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
                <Room
                  {...room}
                  descriptionHeight={'40px'}
                  key={room.images[0]}
                />
              ))}
            </SliderBase>
          </RoomDetailContent>
          <RoomReviews {...room} />
        </Container>
      </>
    )
  );
};

export default RoomDetailPage;
