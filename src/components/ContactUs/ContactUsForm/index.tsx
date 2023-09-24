import CustomButton from '@/components/CustomButton';
import { BsFillSendFill } from 'react-icons/bs';

import * as Styles from './styles';

const ContactUsForm = () => {
  return (
    <Styles.ContactUsForm>
      <Styles.ContactUsFormContent>
        <BsFillSendFill></BsFillSendFill>
        <Styles.ContactUsFormField
          type="email"
          placeholder="Your Email Address"
        />
      </Styles.ContactUsFormContent>
      <CustomButton type="primary" borderRadius="50px">
        SUBCRIBE
      </CustomButton>
    </Styles.ContactUsForm>
  );
};

export default ContactUsForm;
