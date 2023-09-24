import styled, { css } from 'styled-components';

export interface IButtonLinkWrapperProps {
  border_bottom?: 1 | 0;
  color_bottom?: string;
  hover_color_bottom?: string;
  font_weight?: number;
  color?: string;
  hover_color?: string;
  font_size?: string;
}

export const ButtonLinkWrapper = styled.a<IButtonLinkWrapperProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 5px;
  text-decoration: none;
  font-size: ${({ font_size }) => (font_size ? font_size : '1rem')};
  border-bottom: 2px solid
    ${({ border_bottom, color_bottom }) =>
      border_bottom ? color_bottom || '#cecece' : 'transparent'};

  font-weight: ${({ font_weight }) => font_weight || '400'};
  color: ${({ color }) => color || 'black'};
  transition: all 0.2s linear;

  &:hover {
    color: ${({ hover_color }) => hover_color || '#cecece'};

    border-color: ${({ hover_color_bottom, border_bottom }) =>
      border_bottom ? hover_color_bottom || '#cecece' : ''};
  }
`;
