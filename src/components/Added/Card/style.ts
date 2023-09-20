import { styled } from "styled-components";

export const CardWrapper = styled.div`
    width: 280px;
    height: 434px;
    cursor: pointer;
    display: inline-block;
    margin-left: 45px;
    overflow: hidden;
    background-color: white;
    box-shadow: 1px 1px 4px 4px #e1e1e1;
    border-radius: 20px;
`

export const img = styled.img`
    width: 280px;
    height: 198px;
    background-size: cover;
    background-position: center;
    cursor: pointer;
`

export const Top = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

export const Title = styled.h2`
    padding: 60px 50px;
    font-size: 23px;
    width: 270px;
`

export const View = styled.h6`
    color: #8C8C8C;
    font-size: 11px;
    position: absolute;
    right: 100px;
    bottom: 32px;
`

export const Star = styled.h5`
    color: #ffa11a;
    position: absolute;
    left: 50px;
    bottom: 30px;
`

export const Bottom = styled.div`
    display: flex;
    justify-content: start;
    padding: 0 30px;
`

export const From = styled.h6`
    padding: 0 20px;
    margin-top: -20px;
    color: #8C8C8C;
`

export const Sale = styled.h6`
    margin-left: 10px;
    margin-top: -20px;
`

export const SaleOff = styled.h5`
    text-decoration: line-through;
    color: #e1e1e1;
    margin-left: -20px;
    margin-top: -20px;
`

