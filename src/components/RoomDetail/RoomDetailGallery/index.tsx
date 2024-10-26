import { IRoom } from 'room';
import * as Styles from './styles';
import { Col, Row } from 'antd';
import { IoImagesOutline } from 'react-icons/io5';
import { LuVideo } from 'react-icons/lu';
import ShowMediaModal from '@/components/ShowMediaModal';
import { useState } from 'react';

const RoomDetailGallery = (props: IRoom) => {
  const [isImageGalleriesOpen, setIsImageGalleriesOpen] = useState(false);
  const [isVideoGalleriesOpen, setIsVideoGalleriesOpen] = useState(false);

  return (
    <>
      <Styles.RoomDetailGalleryWrapper>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={16}>
            <Styles.RoomDetailGalleryImagePrimary>
              <img src={props.images[0]} alt="" />
              <Styles.RoomDetailGalleryButtonWrapper>
                <Styles.RoomDetailGalleryButton
                  onClick={() => {
                    setIsImageGalleriesOpen(true);
                  }}
                >
                  <IoImagesOutline />
                  Gallery
                </Styles.RoomDetailGalleryButton>
                <Styles.RoomDetailGalleryButton
                  onClick={() => {
                    setIsVideoGalleriesOpen(true);
                  }}
                >
                  <LuVideo />
                  Video
                </Styles.RoomDetailGalleryButton>
              </Styles.RoomDetailGalleryButtonWrapper>
            </Styles.RoomDetailGalleryImagePrimary>
          </Col>
          <Col xs={24} md={8}>
            <Styles.RoomDetailGalleryRow>
              {props.images.slice(1).map((image, idx) => (
                <Styles.RoomDetailGalleryimageListecondary key={idx}>
                  <img src={image} alt="image" />
                </Styles.RoomDetailGalleryimageListecondary>
              ))}
            </Styles.RoomDetailGalleryRow>
          </Col>
        </Row>
      </Styles.RoomDetailGalleryWrapper>
      <ShowMediaModal
        isOpen={isImageGalleriesOpen}
        setIsOpen={setIsImageGalleriesOpen}
        media={props.images}
      />
      <ShowMediaModal
        isOpen={isVideoGalleriesOpen}
        setIsOpen={setIsVideoGalleriesOpen}
        media={[props.video]}
        video
      />
    </>
  );
};

export default RoomDetailGallery;
