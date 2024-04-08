import {Divider, Row} from 'antd'
import styled from 'styled-components'
import Anh from  '../../assets/font-end/imgs/logo/go1.png';
import {Link} from 'react-router-dom'
export const WrapperHeaderTop = styled(Row)`
    background-color: #dee2e6;
    padding: 10px 20px;
    align-items:center;
    width: 100%;
`

export const WrapperHeaderMid = styled(Row)`
    background-color: #dee2e6;
    padding: 15px 100px;
    background-image: url('../../assets/font-end/imgs/logo/go1.png');
    background-image: url(${Anh});
    align-items:center;
    width: 100.5%;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items:center;
    gap:5px;
`

export const WrapperHeaderCart = styled.div`
    margin-left: 15px;
`

export const WrapperHeaderLink = styled(Link)`
    font-size: 14px;
`
export const WrapperHeaderSpan = styled.span`
    font-size: 14px;
`

export const WrapperHeaderTypeProduct = styled.div`
    /* align-items: center;
    gap: 16px;
    justify-content: flex-start;
    padding: 0 130px;
    background-color: #60609B;
    height: 50px;
    color: #fff */
`



