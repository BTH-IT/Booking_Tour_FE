import styled from 'styled-components';

export const RightHeaderWrapper = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
`;

export const UserInfo = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 1.4rem;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    & > .dropdown {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const UserInfoImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserInfoFullname = styled.h4`
  font-size: 1.4rem;
  font-weight: 500;
  cursor: default;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const UserInfoDropdown = styled.ul`
  position: absolute;
  top: calc(100% + 10px);
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  width: 100%;
  visibility: hidden;
  opacity: 0;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: all 0.2s linear;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 0;
    background-color: transparent;
    width: 100%;
    height: 10px;
  }
`;

export const UserInfoDropdownItem = styled.a`
  font-size: 1.4rem;
  text-decoration: none;
  font-weight: 600;
  padding: 10px;
  color: inherit;
`;

export const UserInfoDropdownLogout = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 600;
  border-top: 1px solid #cecece;
  padding-top: 20px;
  margin-top: 10px;
`;
