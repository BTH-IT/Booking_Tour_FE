import styled from 'styled-components';

export const CurrencyWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  color: black;
  cursor: pointer;
`;

export const CurrencyTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 1.2rem;
  font-weight: 500;
  span {
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: 3px;
  }
`;

export const CurrencyDropdown = styled.ul`
  position: absolute;
  top: calc(100%);
  left: 50%;
  transform: translateX(-50%);
  list-style: none;
  padding: 15px 25px;
  margin: 0px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 25px;
    background-color: transparent;
  }
`;

export const CurrencyDropdownItem = styled.li`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 10px;
  cursor: pointer;
`;
