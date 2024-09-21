import { useState } from 'react';
import * as Styles from './styles';

const Accordion = ({ title, content }: { title: string; content: string }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Styles.AccordionWrap>
      <Styles.AccordionTitle
        $isShow={isShow}
        onClick={() => setIsShow(!isShow)}
      >
        {title}
      </Styles.AccordionTitle>
      <Styles.AccordionContent $isShow={isShow}>
        {content}
      </Styles.AccordionContent>
    </Styles.AccordionWrap>
  );
};

export default Accordion;
