import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import * as Styles from './styles';
const currencyList = ['USD', 'EUR', 'CHF'];

const Currency = () => {
  const [value, setValue] = useState(currencyList[0]);

  return (
    <Styles.CurrencyWrapper>
      <Styles.CurrencyTitle>
        <span>{value}</span>
        <AiFillCaretDown></AiFillCaretDown>
      </Styles.CurrencyTitle>
      <Styles.CurrencyDropdown>
        {currencyList
          .filter((currency) => currency != value)
          .map((currency) => (
            <Styles.CurrencyDropdownItem onClick={() => setValue(currency)}>
              {currency}
            </Styles.CurrencyDropdownItem>
          ))}
      </Styles.CurrencyDropdown>
    </Styles.CurrencyWrapper>
  );
};

export default Currency;
