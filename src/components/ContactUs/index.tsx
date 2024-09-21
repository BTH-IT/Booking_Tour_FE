import { Container } from '@/constants';
import * as Styles from './styles';
import { Col, Row } from 'antd';
import CustomButton from '../CustomButton';
import { useNavigate } from 'react-router';
import ContactUsForm from './ContactUsForm';

const ContactUs = () => {
  const navigator = useNavigate();
  return (
    <Container>
      <Styles.ContactUsContainer>
        <Row gutter={[20, 20]}>
          <Col xs={24} md={24} xl={12}>
            <Styles.ContactUsLeft>
              <Styles.ContactUsLeftTitle>
                Discover Special Deals!
              </Styles.ContactUsLeftTitle>
              <Styles.ContactUsLeftDesc>
                Make sure to check out these special promotions
              </Styles.ContactUsLeftDesc>
              <CustomButton
                width="150px"
                height="50px"
                onClick={() => navigator('/')}
              >
                See Tours
              </CustomButton>
            </Styles.ContactUsLeft>
          </Col>
          <Col xs={24} md={24} xl={12}>
            <Styles.ContactUsRight>
              <Styles.ContactUsRightTitle>
                Don’t miss a thing
              </Styles.ContactUsRightTitle>
              <Styles.ContactUsRightDesc>
                Get update to special deals and exclusive offers.
                <br></br>
                Sign up to our newsletter!
              </Styles.ContactUsRightDesc>
              <ContactUsForm></ContactUsForm>
            </Styles.ContactUsRight>
          </Col>
        </Row>
      </Styles.ContactUsContainer>
    </Container>
  );
};

export default ContactUs;
