import { useEffect, useState } from 'react';
import { PiDotFill } from 'react-icons/pi';
import { IRoom } from 'room';

import * as Styles from './styles';

const RoomDetailLeft = (props: IRoom) => {
  const [inWishList, setInWishList] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const roomJSON = localStorage.getItem('room-wish-list');
    if (roomJSON) {
      const roomList: IRoom[] = JSON.parse(roomJSON);
      setInWishList(roomList.some((room) => room.id === props.id));
    }
    setMounted(true);
  }, [props.id]);

  const addToWishListHandler = () => {
    const roomJSON = localStorage.getItem('room-wish-list');
    if (roomJSON) {
      const roomList: IRoom[] = JSON.parse(roomJSON);
      if (roomList.some((room) => room.id === props.id)) {
        return;
      }
      roomList.push(props);
      localStorage.setItem('room-wish-list', JSON.stringify(roomList));
    } else {
      localStorage.setItem('room-wish-list', JSON.stringify([props]));
    }
    setInWishList(true);
  };
  return (
    <>
      {mounted && (
        <Styles.RoomDetailLeftContent id="detail">
          <Styles.HeaderWrapper>
            <Styles.RoomDetailLeftTitleWrapper>
              <Styles.RoomDetailLeftFirstTitle>
                From
                <Styles.ActualPrice>
                  {props.price.toFixed(0)} $
                </Styles.ActualPrice>
              </Styles.RoomDetailLeftFirstTitle>
              <Styles.RoomDetailLeftSecondTitle>
                per night
              </Styles.RoomDetailLeftSecondTitle>
            </Styles.RoomDetailLeftTitleWrapper>
            <Styles.WishListButton
              disabled={inWishList}
              onClick={addToWishListHandler}
            >
              <>
                {inWishList ? (
                  <>
                    <span>In Wish List</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#00ff4c"
                        d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Add to Wish List</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ff0000"
                        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
                      />
                    </svg>
                  </>
                )}
              </>
            </Styles.WishListButton>
          </Styles.HeaderWrapper>
          <Styles.Separator />
          <Styles.RoomDetailLeftParagraph
            dangerouslySetInnerHTML={{ __html: props.detail }}
          />
          <Styles.Separator />
          <Styles.RoomDetailLeftAmenitiesTitle>
            Room Amenities
          </Styles.RoomDetailLeftAmenitiesTitle>
          <Styles.RoomDetailLeftAmenities>
            {props.roomAmenities.map((amenity, idx) => (
              <Styles.RoomDetailLeftRuleItem key={idx}>
                <PiDotFill />
                <p>{amenity}</p>
              </Styles.RoomDetailLeftRuleItem>
            ))}
          </Styles.RoomDetailLeftAmenities>
          <Styles.Separator />
          <Styles.RoomDetailLeftAmenitiesTitle>
            Hotel Amenities
          </Styles.RoomDetailLeftAmenitiesTitle>
          <Styles.RoomDetailLeftAmenities>
            {props.hotel.hotelAmenities.map((amenity, idx) => (
              <Styles.RoomDetailLeftRuleItem key={idx}>
                <PiDotFill />
                <p>{amenity}</p>
              </Styles.RoomDetailLeftRuleItem>
            ))}
          </Styles.RoomDetailLeftAmenities>
          <Styles.Separator />
          <Styles.RoomDetailLeftAmenitiesTitle>
            Hotel Rules
          </Styles.RoomDetailLeftAmenitiesTitle>
          <Styles.RoomDetailLeftRule>
            {props.hotel.hotelRules.map((rule, idx) => (
              <Styles.RoomDetailLeftRuleItem key={rule + idx}>
                <PiDotFill />
                <p>{rule}</p>
              </Styles.RoomDetailLeftRuleItem>
            ))}
          </Styles.RoomDetailLeftRule>
        </Styles.RoomDetailLeftContent>
      )}
    </>
  );
};

export default RoomDetailLeft;
