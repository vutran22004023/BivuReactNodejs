import styled from "styled-components";
import {Col, Image} from 'antd'
import {Link} from 'react-router-dom'
export const WapperProductDetailImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`

export const WapperStyleCollImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`
export const WapperStyleBlockProduct = styled.div`
    display: flex;
    flex-direction: column;
    background: #ece9e9;
    border-radius: 8px;
    padding: 16px;
    gap: 4px;
`
export const WapperStyleBlockProductBottom = styled.div`
    display: flex;
    flex-direction: column;
    background: #ece9e9;
    border-radius: 8px;
    padding: 16px;
    gap: 4px;
    margin-top: 10px;
`

export const WapperStyleNameProduct = styled.h1`
    color: rgb(36,36,36);
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    word-wrap:break-word;
    margin-bottom: 5px;
`

export const WapperStylePriceProduct = styled.div`
    background-color: #ece9e9;
    border-radius: 4px;
`

export const WapperStyleTextPriceProduct = styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-bottom: 10px;
    color: #f00;
`

export const WapperStyleAddressProduct = styled.div`
    div.addressheader {
        font-weight: 600;
        font-size: 16px;
        line-height: 150%;
        color: rgb(39, 39, 42);
    }
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow:hidden;
        text-overflow: ellipsis;
    }
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






