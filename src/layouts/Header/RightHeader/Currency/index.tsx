import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import * as Styles from './styles';
const currencyList = ['USD', 'EUR', 'CHF'];

const Currency = ({ color, bgColor }: { color?: string; bgColor?: string }) => {
  const [value, setValue] = useState(currencyList[0]);
  const [show, setShow] = useState(false);

  return (
    <Styles.CurrencyWrapper
      color={color}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Styles.CurrencyTitle>
        <span>{value}</span>
        <AiFillCaretDown></AiFillCaretDown>
      </Styles.CurrencyTitle>
      {show && (
        <Styles.CurrencyDropdown
          bgcolor={bgColor}
          onClick={() => setShow(false)}
        >
          {currencyList
            .filter((currency) => currency != value)
            .map((currency) => (
              <Styles.CurrencyDropdownItem
                onClick={() => setValue(currency)}
                key={currency}
              >
                {currency}
              </Styles.CurrencyDropdownItem>
            ))}
        </Styles.CurrencyDropdown>
      )}
    </Styles.CurrencyWrapper>
  );
};

export default Currency;
