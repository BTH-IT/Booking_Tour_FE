import { Container } from '@/constants';
import { Col, Row } from 'antd';

import * as Styles from './styles';

const AboutUs = () => {
  return (
    <Container>
      <Styles.AboutUsContainer>
        <Row gutter={[20, 20]}>
          <Col xs={24} md={8}>
            <Styles.AboutUsCard>
              <Styles.AboutUsCardLeft>
                <Styles.AboutUsCardImage>
                  <Styles.AboutUsCardImg src="./icon-earth.png" />
                </Styles.AboutUsCardImage>
              </Styles.AboutUsCardLeft>
              <Styles.AboutUsCardRight>
                <Styles.AboutUsCardTitle>
                  700 Destinations
                </Styles.AboutUsCardTitle>
                <Styles.AboutUsCardDesc>
                  Our expert team handpicked all destinations in this site
                </Styles.AboutUsCardDesc>
              </Styles.AboutUsCardRight>
            </Styles.AboutUsCard>
          </Col>
          <Col xs={24} md={8}>
            <Styles.AboutUsCard>
              <Styles.AboutUsCardLeft>
                <Styles.AboutUsCardImage>
                  <Styles.AboutUsCardImg src="./logo-02.png" />
                </Styles.AboutUsCardImage>
              </Styles.AboutUsCardLeft>
              <Styles.AboutUsCardRight>
                <Styles.AboutUsCardTitle>
                  Best Price Gurantee
                </Styles.AboutUsCardTitle>
                <Styles.AboutUsCardDesc>
                  Price match within 48 hours of order confirmation
                </Styles.AboutUsCardDesc>
              </Styles.AboutUsCardRight>
            </Styles.AboutUsCard>
          </Col>
          <Col xs={24} md={8}>
            <Styles.AboutUsCard>
              <Styles.AboutUsCardLeft>
                <Styles.AboutUsCardImage>
                  <Styles.AboutUsCardImg src="./logo-03.png" />
                </Styles.AboutUsCardImage>
              </Styles.AboutUsCardLeft>
              <Styles.AboutUsCardRight>
                <Styles.AboutUsCardTitle>
                  Top Notch Support
                </Styles.AboutUsCardTitle>
                <Styles.AboutUsCardDesc>
                  We are here to help, before, during, and even after your trip.
                </Styles.AboutUsCardDesc>
              </Styles.AboutUsCardRight>
            </Styles.AboutUsCard>
          </Col>
        </Row>
      </Styles.AboutUsContainer>
    </Container>
  );
};

export default AboutUs;
