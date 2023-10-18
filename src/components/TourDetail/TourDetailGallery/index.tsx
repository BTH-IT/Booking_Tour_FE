import { ITour } from 'tour';
import * as Styles from './styles';
import { Col, Row } from 'antd';
import { IoImagesOutline } from 'react-icons/io5';
import { LuVideo } from 'react-icons/lu';

const TourDetailGallery = (props: ITour) => {
  return (
    <Styles.TourDetailGalleryWrapper>
      <Row gutter={[10, 10]}>
        <Col xs={24} md={16}>
          <Styles.TourDetailGalleryImagePrimary>
            <img src={props.images[0]} alt="" />
            <Styles.TourDetailGalleryButtonWrapper>
              <Styles.TourDetailGalleryButton>
                <IoImagesOutline />
                Gallery
              </Styles.TourDetailGalleryButton>
              <Styles.TourDetailGalleryButton>
                <LuVideo />
                Video
              </Styles.TourDetailGalleryButton>
            </Styles.TourDetailGalleryButtonWrapper>
          </Styles.TourDetailGalleryImagePrimary>
        </Col>
        <Col xs={24} md={8}>
          <Styles.TourDetailGalleryRow>
            {props.images.slice(1).map((image, idx) => (
              <Styles.TourDetailGalleryImageSecondary key={idx}>
                <img src={image} alt="image" />
              </Styles.TourDetailGalleryImageSecondary>
            ))}
          </Styles.TourDetailGalleryRow>
        </Col>
      </Row>
    </Styles.TourDetailGalleryWrapper>
  );
};

export default TourDetailGallery;
