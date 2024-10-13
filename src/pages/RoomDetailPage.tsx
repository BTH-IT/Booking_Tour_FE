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
    // const data = await roomService.getARoom(roomId);
    const data: IRoom = {
      id: '1',
      area: 30,
      bed: '2 Kings Beds',
      detail:
        'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown',
      description: 'abcsd',
      roomAmenities: [
        'TV',
        'Free Wifi',
        'Safe',
        'Shower',
        'Air Conditioner',
        'Heater',
        'Phone',
        'Hair Dryer',
      ],
      hotelId: '1',
      name: 'Luxury Suite',
      maxRooms: 4,
      price: 100,
      rate: 4.5,
      reviewList: [],
      salePercent: 0,
      view: 'City View',
      roomimageList: [
        'https://www.lottehotel.com/content/dam/lotte-hotel/lotte/yangon/accommodation/hotel/suite/royalsuite/180712-49-2000-acc-yangon-hotel.jpg.thumb.768.768.jpg',
        'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/70/2016/11/22095538/suite-novotel-bangkok-ploenchit-sukhumvit-1.jpeg',
        'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/209/2023/01/07041216/5437-80-1024x683.jpg',
        'https://media.cntraveler.com/photos/5f89a04c832eef138f7b94e9/16:9/w_1280,c_limit/Dorado%20Beach,%20a%20Ritz-Carlton%20Reserve.jpg',
        'https://www.sybaris.com/wp-content/uploads/2020/05/IN_CH_100-1024x670-1.jpg',
      ],
      otherimageList: [
        'https://www.lottehotel.com/content/dam/lotte-hotel/lotte/yangon/accommodation/hotel/suite/royalsuite/180712-49-2000-acc-yangon-hotel.jpg.thumb.768.768.jpg',
        'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/70/2016/11/22095538/suite-novotel-bangkok-ploenchit-sukhumvit-1.jpeg',
        'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/209/2023/01/07041216/5437-80-1024x683.jpg',
        'https://media.cntraveler.com/photos/5f89a04c832eef138f7b94e9/16:9/w_1280,c_limit/Dorado%20Beach,%20a%20Ritz-Carlton%20Reserve.jpg',
        'https://www.sybaris.com/wp-content/uploads/2020/05/IN_CH_100-1024x670-1.jpg',
      ],
    };

    if (!data) return;

    // await fetchRoomList();
    setRoom(data);
    setRoomList([
      data,
      data,
      data,
      data,
      data,
      data,
      data,
      data,
      data,
      data,
      data,
      data,
    ]);
  });

  async function fetchRoomList() {
    try {
      const data = await roomService.getAllRoom();

      setRoomList(data.rooms);
    } catch (error) {
      toast.error("Sever isn't responding");
    }
  }

  return (
    room && (
      <>
        <Container className='container'>
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
            {room.otherimageList?.map((img, idx) => {
              return <img key={idx} src={img} alt='Other Image' />;
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
                  key={room.roomimageList[0]}
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
