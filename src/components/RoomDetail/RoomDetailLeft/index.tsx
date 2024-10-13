import { IRoom } from 'room';

import * as Styles from './styles';
import { Col, Row } from 'antd';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import {
  LuTv2,
  LuWifi,
  LuShowerHead,
  LuAirVent,
  LuPhone,
  LuParkingCircle,
  LuConciergeBell,
  LuCircleDot,
} from 'react-icons/lu';
import { BsSafe } from 'react-icons/bs';
import {
  MdOutlineHeatPump,
  MdOutlineRoomService,
  MdOutlineLocalLaundryService,
} from 'react-icons/md';
import { GiHeatHaze } from 'react-icons/gi';
import { CgGym } from 'react-icons/cg';
import { RiInkBottleLine } from 'react-icons/ri';
import { IoRestaurantOutline } from 'react-icons/io5';
import { FaSwimmingPool } from 'react-icons/fa';
import { PiDotFill } from 'react-icons/pi';

import Accordion from '@/components/Accordion';
import { useState } from 'react';
import useDidMount from '@/hooks/useDidMount';
import destinationService from '@/services/DestinationService';
import { IDestination } from 'destination';
import { faqList } from '@/utils/constants';
import { toast } from 'react-toastify';

const RoomDetailLeft = (props: IRoom) => {
  const hotelAmenities = [
    'Gym',
    'Parking',
    'Spa',
    'Restaurant',
    'Room Service',
    'Swimming Pool',
    '24 Hour Concierge',
    'In-house Laundry',
  ];

  const hotelRules = [
    'Smoking not allowed',
    'Pets not allowed',
    'Swimming pool closed from 8.00pm - 6.00am',
  ];

  const roomAmenitiesIcon: { [key: number]: JSX.Element } = {
    0: <LuTv2 />,
    1: <LuWifi />,
    2: <BsSafe />,
    3: <LuShowerHead />,
    4: <LuAirVent />,
    5: <MdOutlineHeatPump />,
    6: <LuPhone />,
    7: <GiHeatHaze />,
  };

  const hotelAmenitiesIcon: { [key: number]: JSX.Element } = {
    0: <CgGym />,
    1: <LuParkingCircle />,
    2: <RiInkBottleLine />,
    3: <IoRestaurantOutline />,
    4: <MdOutlineRoomService />,
    5: <FaSwimmingPool />,
    6: <LuConciergeBell />,
    7: <MdOutlineLocalLaundryService />,
  };

  // async function getDestination() {
  //   try {
  //     const data = await destinationService.getDestination(props.destination);

  //     if (!data) return;

  //     setDestination(data);
  //   } catch (error) {
  //     toast.error('Oops! Something is wrong');
  //   }
  // }

  // useDidMount(() => {
  //   getDestination();
  // });

  return (
    <>
      <Styles.RoomDetailLeftContent id='detail'>
        <Styles.RoomDetailLeftTitleWrapper>
          <Styles.RoomDetailLeftFirstTitle>
            From
            {props.salePercent > 0 ? (
              <>
                <Styles.OriginalPrice>
                  {' '}
                  ${props.price.toFixed(2)}
                </Styles.OriginalPrice>
                <Styles.ActualPrice>
                  $
                  {(
                    props.price -
                    (props.price * props.salePercent) / 100
                  ).toFixed(2)}
                </Styles.ActualPrice>
              </>
            ) : (
              <Styles.ActualPrice>${props.price.toFixed(2)}</Styles.ActualPrice>
            )}
          </Styles.RoomDetailLeftFirstTitle>
          <Styles.RoomDetailLeftSecondTitle>
            per night
          </Styles.RoomDetailLeftSecondTitle>
        </Styles.RoomDetailLeftTitleWrapper>
        <Styles.Separator />
        <Styles.RoomDetailLeftParagraph>
          {props.detail}
        </Styles.RoomDetailLeftParagraph>
        <Styles.Separator />
        <Styles.RoomDetailLeftAmenitiesTitle>
          Room Amenities
        </Styles.RoomDetailLeftAmenitiesTitle>
        <Styles.RoomDetailLeftAmenities>
          {props.roomAmenities.map((amenity, idx) => (
            <Styles.RoomDetailLeftAmenitiesItem key={amenity + idx}>
              {roomAmenitiesIcon[idx]} {/*Sau nay dung id cua amenity*/}
              <p>{amenity}</p>
            </Styles.RoomDetailLeftAmenitiesItem>
          ))}
        </Styles.RoomDetailLeftAmenities>
        <Styles.Separator />
        <Styles.RoomDetailLeftAmenitiesTitle>
          Hotel Amenities
        </Styles.RoomDetailLeftAmenitiesTitle>
        <Styles.RoomDetailLeftAmenities>
          {/* {props.priceExcludes.map((excludes, idx) => (
            <Styles.RoomDetailLeftAmenitiesItem key={excludes + idx}>
              <AiOutlineClose />
              <p>{excludes}</p>
            </Styles.RoomDetailLeftAmenitiesItem>
          ))} */}
          {hotelAmenities.map((amenity, idx) => (
            <Styles.RoomDetailLeftAmenitiesItem key={amenity + idx}>
              {hotelAmenitiesIcon[idx]} {/*Sau nay dung id cua amenity*/}
              <p>{amenity}</p>
            </Styles.RoomDetailLeftAmenitiesItem>
          ))}
        </Styles.RoomDetailLeftAmenities>
        <Styles.Separator />
        <Styles.RoomDetailLeftAmenitiesTitle>
          Hotel Rules
        </Styles.RoomDetailLeftAmenitiesTitle>
        <Styles.RoomDetailLeftRule>
          {hotelRules.map((rule, idx) => (
            <Styles.RoomDetailLeftRuleItem key={rule + idx}>
              <PiDotFill />
              <p>{rule}</p>
            </Styles.RoomDetailLeftRuleItem>
          ))}
        </Styles.RoomDetailLeftRule>
      </Styles.RoomDetailLeftContent>
    </>
  );
};

export default RoomDetailLeft;
