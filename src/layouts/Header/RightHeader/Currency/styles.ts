import styled from 'styled-components';

export const CurrencyWrapper = styled.div`
  position: relative;
  font-size: 1.2rem;
`;

export const CurrencyTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1.4rem;
  font-weight: 500;
  color: black;

  span {
    font-size: 1.4rem;
    font-weight: 500;
    color: black;
  }
`;

export const CurrencyDropdown = styled.ul`
  position: absolute;
  list-style: none;
  padding: 15px 25px;
  margin: 0px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const CurrencyDropdownItem = styled.li`
  cursor: pointer;
`;
