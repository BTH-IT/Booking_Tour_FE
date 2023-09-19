import { styled } from 'styled-components';


export const CardWrapper = styled.div`
    display: inline-block;
    padding: 10px 10px;
    width: 370px;
    height: 250px;
    margin-left: 40px;
    position: relative;
`

export const Title = styled.h3`
    position: absolute;
    top: 50px;
    left: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    font-weight: 700;
`

export const subTitle = styled.h4`
    text-align: center;
    width: 300px;
    position: absolute;
    bottom: 60px;
    left: 15%;
    color: white;
`

export const img = styled.img`
    width: 380px;
    height: 250px;
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    margin-right: 20px;
`
export const View = styled.h2`
    color: #5c98f2;
    font-weight: 700;
    position: absolute;
    bottom: 20px;
    left: 33%;

    &:hover{
        text-decoration: underline;
    }
`

export const Tours = styled.button`
    position: absolute ;
    top: 20px;
    right: 20px;
    background-color: #5c98f2;
    padding: 10px 15px;
    border-radius: 3px;
    border: none;
    color: white;
    font-weight: 700;
`
