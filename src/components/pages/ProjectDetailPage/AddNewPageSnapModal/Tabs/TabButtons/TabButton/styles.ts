import { styled } from 'styled-components';

export const ImageWrapper = styled.div<{ $isActive: boolean }>`
  img {
    filter: ${({ $isActive }) =>
      $isActive
        ? 'invert(34%) sepia(20%) saturate(1300%) hue-rotate(174deg) brightness(119%) contrast(119%)'
        : 'none'};
  }
`;
