import styled, { css } from "styled-components";

export interface IButtonLinkWrapperProps {
  $borderBottom?: boolean;
  $colorBottom?: string;
  $hoverColorBottom?: string;
  $fontWeight?: number;
  color?: string;
  $hoverColor?: string;
  $fontSize?: string;
}

export const ButtonLinkWrapper = styled.a<IButtonLinkWrapperProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 5px;
  text-decoration: none;
  font-size: ${({ $fontSize }) => $fontSize || "1rem"};
  border-bottom: 2px solid
    ${({ $borderBottom, $colorBottom }) =>
      $borderBottom ? $colorBottom || "#cecece" : "transparent"};

  font-weight: ${({ $fontWeight }) => $fontWeight || "400"};
  color: ${({ color }) => color || "black"};
  transition: all 0.2s linear;

  &:hover {
    color: ${({ $hoverColor }) => $hoverColor || "#cecece"};

    border-color: ${({ $hoverColorBottom, $borderBottom }) =>
      $borderBottom ? $hoverColorBottom || "#cecece" : ""};
  }
`;
