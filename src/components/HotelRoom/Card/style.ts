import { styled } from "styled-components";

export const CardWrapper = styled.div`
    width: 280px;
    height: 400px;
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
    padding: 60px 40px;
    font-size: 23px;
    width: 300px;
`

export const Bed = styled.h2`
    margin-top: -10px;
    margin-left: 40px;
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
    left: 40px;
    bottom: 30px;
`

export const Bottom = styled.div`
    display: flex;
    justify-content: start;
    margin-top: 30px;
    margin-left: 30px;
`

export const From = styled.h6`
    padding: 0 20px;
    margin-top: -20px;
    margin-left: -10px;
    color: #333;
    font-size: 20px;
`

export const Sale = styled.h6`
    margin-left: 5px;
    margin-top: -21px;
    font-size: 20px;
`

export const SaleOff = styled.h5`
    text-decoration: line-through;
    color: #333;
    font-weight: 400;
    margin-left: -15px;
    margin-top: -17px;
`

