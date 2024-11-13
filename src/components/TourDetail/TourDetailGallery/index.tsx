import { Col, Row } from 'antd';
import { useState } from 'react';
import { IoImagesOutline } from 'react-icons/io5';
import { LuVideo } from 'react-icons/lu';
import { ITour } from 'tour';

import * as Styles from './styles';

import ShowMediaModal from '@/components/ShowMediaModal';

const TourDetailGallery = (props: ITour) => {
  const [isImageGalleriesOpen, setIsImageGalleriesOpen] = useState(false);
  const [isVideoGalleriesOpen, setIsVideoGalleriesOpen] = useState(false);

  return (
    <>
      <Styles.TourDetailGalleryWrapper>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={16}>
            <Styles.TourDetailGalleryImagePrimary>
              <img src={props.imageList[0]} alt="" />
              <Styles.TourDetailGalleryButtonWrapper>
                <Styles.TourDetailGalleryButton
                  onClick={() => {
                    setIsImageGalleriesOpen(true);
                  }}
                >
                  <IoImagesOutline />
                  Gallery
                </Styles.TourDetailGalleryButton>
                <Styles.TourDetailGalleryButton
                  onClick={() => {
                    setIsVideoGalleriesOpen(true);
                  }}
                >
                  <LuVideo />
                  Video
                </Styles.TourDetailGalleryButton>
              </Styles.TourDetailGalleryButtonWrapper>
            </Styles.TourDetailGalleryImagePrimary>
          </Col>
          <Col xs={24} md={8}>
            <Styles.TourDetailGalleryRow>
              {props.imageList.slice(1).map((image, idx) => (
                <Styles.TourDetailGalleryimageListecondary key={idx}>
                  <img src={image} alt="image" />
                </Styles.TourDetailGalleryimageListecondary>
              ))}
            </Styles.TourDetailGalleryRow>
          </Col>
        </Row>
      </Styles.TourDetailGalleryWrapper>
      <ShowMediaModal
        isOpen={isImageGalleriesOpen}
        setIsOpen={setIsImageGalleriesOpen}
        media={props.imageList}
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

export default TourDetailGallery;
