import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    background-color: black;
    align-items: center;
    justify-content: center;


    h1 {
        color: white;
    }

    p {
        color: white;
        display: flex;
        position: fixed;
        right: 0;
        margin-right: 15px;
    }
`

export const DonateContainer = styled.div`
    display: flex;
    width: 100%;
    background-color: black;
    justify-content: center;
    align-items: center;

    img {
        height: 50px;
        width: 200%;
    }

    button {
        display: flex;
        position: absolute;
        height: 40px;
        padding: 10px;
        backdrop-filter: blur(10px);
        background: none;
        border-radius: 4px;
        border: 2px solid black;
        text-align: center;
        cursor: pointer;
    }
`