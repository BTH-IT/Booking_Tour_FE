import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Row } from "antd";

import { IRoom } from "room";
import roomService from "@/services/RoomService";
import * as RoomStyled from "../Card/Room/style";
import Room from "../Card/Room";
import * as Styles from "./styles";
import { Container } from "@/constants";

const RoomContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [roomList, setRoomList] = useState<IRoom[]>([]);

  const getRooms = async () => {
    try {
      const data = await roomService.getAllRoom();
      // const data: IRoom = {
      //   _id: '1',
      //   area: 30,
      //   bed: '2 Kings Beds',
      //   detail:
      //     'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown',
      //   description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown',
      //   roomAmenities: [
      //     'TV',
      //     'Free Wifi',
      //     'Safe',
      //     'Shower',
      //     'Air Conditioner',
      //     'Heater',
      //     'Phone',
      //     'Hair Dryer',
      //   ],
      //   hotelId: '1',
      //   name: 'Luxury Suite',
      //   maxGuests: 4,
      //   price: 100,
      //   rate: 4.5,
      //   reviews: ['good'],
      //   salePercent: 20,
      //   view: 'City View',
      //   roomImages: [
      //     'https://www.lottehotel.com/content/dam/lotte-hotel/lotte/yangon/accommodation/hotel/suite/royalsuite/180712-49-2000-acc-yangon-hotel.jpg.thumb.768.768.jpg',
      //     'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/70/2016/11/22095538/suite-novotel-bangkok-ploenchit-sukhumvit-1.jpeg',
      //     'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/209/2023/01/07041216/5437-80-1024x683.jpg',
      //     'https://media.cntraveler.com/photos/5f89a04c832eef138f7b94e9/16:9/w_1280,c_limit/Dorado%20Beach,%20a%20Ritz-Carlton%20Reserve.jpg',
      //     'https://www.sybaris.com/wp-content/uploads/2020/05/IN_CH_100-1024x670-1.jpg',
      //   ],
      //   otherImages: [
      //     'https://www.lottehotel.com/content/dam/lotte-hotel/lotte/yangon/accommodation/hotel/suite/royalsuite/180712-49-2000-acc-yangon-hotel.jpg.thumb.768.768.jpg',
      //     'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/70/2016/11/22095538/suite-novotel-bangkok-ploenchit-sukhumvit-1.jpeg',
      //     'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/209/2023/01/07041216/5437-80-1024x683.jpg',
      //     'https://media.cntraveler.com/photos/5f89a04c832eef138f7b94e9/16:9/w_1280,c_limit/Dorado%20Beach,%20a%20Ritz-Carlton%20Reserve.jpg',
      //     'https://www.sybaris.com/wp-content/uploads/2020/05/IN_CH_100-1024x670-1.jpg',
      //   ],
      // };
      // setRoomList([data, data, data, data, data, data, data, data, data]);
      setRoomList(data.rooms);
      setIsLoading(false);
    } catch (error) {
      toast.error("Oops!! Something is wrong");
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <Container>
      <Styles.RoomCardsWrapper>
        {!isLoading ? (
          <>
            <Row>
              {roomList.map((room, idx) => (
                <Col xs={24} lg={12} xl={8} key={room._id + idx}>
                  <Room {...room} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Row>
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <Col xs={24} lg={12} xl={8} key={idx}>
                <RoomStyled.CardWrapper>
                  <RoomStyled.SkeletonImg active />
                  <RoomStyled.CardInfo>
                    <RoomStyled.SkeletonTitle active />
                  </RoomStyled.CardInfo>
                </RoomStyled.CardWrapper>
              </Col>
            ))}
          </Row>
        )}
      </Styles.RoomCardsWrapper>
    </Container>
  );
};

export default RoomContent;
