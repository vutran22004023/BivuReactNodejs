import styled from "styled-components";
import {Link} from 'react-router-dom'

export const WrapperContainerLeft = styled.div`
flex:1;
padding: 40px 45px 24px;
`

export const WrapperContainerRight = styled.div`
width: 300px;
background: linear-gradient(136deg, rgb(240,248,255) -1%, rgb(219,238,255) 85%);
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`

export const WrapperTextLight = styled(Link)`
    color: rgb(13,92,182);
    font-size: 13px;
`