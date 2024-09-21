import { IRoom } from "room";
import * as Styles from "./styles";
import { Col, Row } from "antd";
import { IoImagesOutline } from "react-icons/io5";
import { LuVideo } from "react-icons/lu";

const RoomDetailGallery = (props: IRoom) => {
  return (
    <Styles.RoomDetailGalleryWrapper>
      <Row gutter={[10, 10]}>
        <Col xs={24} md={16}>
          <Styles.RoomDetailGalleryImagePrimary>
            <img src={props.roomImages[0]} alt="" />
            <Styles.RoomDetailGalleryButtonWrapper>
              <Styles.RoomDetailGalleryButton>
                <IoImagesOutline />
                Gallery
              </Styles.RoomDetailGalleryButton>
              <Styles.RoomDetailGalleryButton>
                <LuVideo />
                Video
              </Styles.RoomDetailGalleryButton>
            </Styles.RoomDetailGalleryButtonWrapper>
          </Styles.RoomDetailGalleryImagePrimary>
        </Col>
        <Col xs={24} md={8}>
          <Styles.RoomDetailGalleryRow>
            {props.roomImages.slice(1).map((image, idx) => (
              <Styles.RoomDetailGalleryImageSecondary key={idx}>
                <img src={image} alt="image" />
              </Styles.RoomDetailGalleryImageSecondary>
            ))}
          </Styles.RoomDetailGalleryRow>
        </Col>
      </Row>
    </Styles.RoomDetailGalleryWrapper>
  );
};

export default RoomDetailGallery;
