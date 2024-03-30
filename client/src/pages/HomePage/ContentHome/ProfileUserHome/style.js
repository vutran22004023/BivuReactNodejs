import styled from "styled-components";
import {Upload} from 'antd'

export const  WrapperHeader = styled.h1`
    color: #000;
    font-size: 20px;

`

export const  WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 900px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    gap: 10px;
`

export const  WapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    width: 50px;
`

export const  WapperInput = styled.div`
    display: flex;
    align-items: center;
    gap:10px;
    line-height: 30px;
    font-weight: 600;
`


export const WapperUpload = styled(Upload)`
    & .ant-upload-list-item-container {
        display: none;
    }
`

