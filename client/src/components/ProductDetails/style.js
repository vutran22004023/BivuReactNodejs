import styled from "styled-components";
import {Col, Image,Radio} from 'antd'
import {Link} from 'react-router-dom'

export const WapperStyleCollImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const WapperStyleButtonAddProduct = styled.h1`
    div.buttonAddProduct {
        display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding: 8px;
    gap: 8px;
    white-space: nowrap;
    width: 100%;
    height: 40px;
    cursor: pointer;
    background: rgb(255, 255, 255);
    font-size: 16px;
    line-height: 150%;
    color: rgb(10, 104, 255);
    border: 1px solid rgb(10, 104, 255);
    border-radius: 4px;

    }
`


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

export const WrapperRadioGroup = styled(Radio.Group)`
    display: none;
`
export const WrapperRadio = styled(Radio)`
`






