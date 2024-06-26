import {Divider, Row} from 'antd'
import styled from 'styled-components'
import Anh from  '../../assets/font-end/imgs/logo/go1.png';
import {Link} from 'react-router-dom'

export const WrapperHeaderMid = styled(Row)`
    /* background-color: #dee2e6; */
    /* padding: 15px 100px; */
    background-image: url(${Anh});
    /* align-items:center; */
    /* width: 100.5%; */
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




