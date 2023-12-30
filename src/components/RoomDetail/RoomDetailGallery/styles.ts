import { Row } from 'antd';
import styled from 'styled-components';

export const RoomDetailGalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  gap: 20px;
  margin-bottom: 20px;
`;

export const RoomDetailGalleryImagePrimary = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 450px;
  border-radius: 12px;

  img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RoomDetailGalleryImageSecondary = styled.div`
  width: calc(50% - 10px);
  height: calc(50% - 5px);
  border-radius: 12px;
  max-height: 225px;
  overflow: hidden;

  img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    max-height: 225px;
    object-fit: cover;
  }
`;

export const RoomDetailGalleryButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  align-items: center;
  bottom: 10px;
  left: 10px;
`;

export const RoomDetailGalleryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  outline: none;
  border: none;
  background-color: white;
  border-radius: 6px;
  font-size: 1.3rem;
  font-weight: 600;
  padding: 12px 14px;
  cursor: pointer;
`;

export const RoomDetailGalleryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-right: -10px;
  height: 100%;
`;
