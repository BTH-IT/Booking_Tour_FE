import styled from 'styled-components';

export const TourDetailGalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  gap: 20px;
`;

export const TourDetailGalleryImagePrimary = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 430px;
  border-radius: 12px;

  img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TourDetailGalleryImageSecondary = styled.div`
  width: 100%;
  height: 100%;
  max-height: 210px;
  border-radius: 12px;
  img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TourDetailGalleryButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  align-items: center;
  bottom: 10px;
  left: 10px;
`;

export const TourDetailGalleryButton = styled.button`
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
