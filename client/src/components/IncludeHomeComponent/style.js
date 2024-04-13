import styled from 'styled-components'

export const WapperContentPopup = styled.p`
    cursor: pointer;
    margin: 10px 0;
    &:hover {
        color: rgb(26,148,255);
    }
`

export const StickyHeader = styled.div`
  position: relative;
  z-index: 999; /* Đảm bảo phần tử này hiển thị trên tất cả các phần tử khác */
`;

