import { styled } from "styled-components";

export const CardWrapper = styled.div`
    width: 383px;
    height: 100%;
    position: relative;
    display: inline-block;
    cursor: pointer;
    overflow: hidden;

    &:hover{
        img{
            filter: brightness(0.3);
        }
        h2{
            bottom: 150px;
        }
        h5{
            bottom: 80px;
        }
        h6{
            left: -10px;
            bottom: 100px;
        }
        div {
            transform: translateY(20px);
        }
    }
`

export const img = styled.img`
    width: 380px;
    height: 450px;
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    filter: brightness(0.6);
    transition: all 0.3s linear;
`

export const CardInfo = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: start;
    text-align: center;
    position: relative;
`

export const Title = styled.h2`
    width: 300px;
    position: absolute;
    bottom: 50px;
    left: 28px;
    font-size: 27px;
    color: white;
`

export const Text = styled.h6`
    font-weight: 700;
    position: absolute;
    left: -100px;
    width: 200px;
    color: white;
`

export const Star = styled.h5`
    color: #ffa11a;
    position: absolute;
    left: 27px;
`

export const Sale = styled.h6`
    text-decoration: line-through;
    font-weight: 500;
    color: #e1e1e1;
    position: absolute;
    right: -220px;
`

export const SaleOff = styled.h5`
    font-weight: 700;
    color: white;
    position: absolute;
    right: 60px;
`

