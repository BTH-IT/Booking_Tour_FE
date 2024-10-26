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
      <Styles.RoomDetailLeftContent id="detail">
        <Styles.RoomDetailLeftTitleWrapper>
          <Styles.RoomDetailLeftFirstTitle>
            From
            <Styles.ActualPrice>
              {props.price.toFixed(0)} VND
            </Styles.ActualPrice>
          </Styles.RoomDetailLeftFirstTitle>
          <Styles.RoomDetailLeftSecondTitle>
            per night
          </Styles.RoomDetailLeftSecondTitle>
        </Styles.RoomDetailLeftTitleWrapper>
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
    </>
  );
};

export default RoomDetailLeft;
