import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

//a scroll-to-top bar at the space just above the footer

const BottomBar = () => {
const [showButton, setShowButton] = useState(false);

useEffect(() => {
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 10) {
            setShowButton(true)
        } else {
            setShowButton(false);
        }
    });
}, []);

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

    return (
        <Wrapper>
        {showButton && (
            <Button onClick={scrollToTop} className='back-to-top'>
            Back to top</Button>)}
            </Wrapper>
        )}

export default BottomBar;


const Wrapper = styled.div``

const Button = styled.button`
display: block;
text-align: center;
padding: 15px;
line-height: 19px;
font-size: 18px;
font-family: 'Rubik', sans-serif;
color: #ffffff;
background-color: #1a1a1a;
border-top: 1px solid #000000;
border-left: none;
border-right: none;
border-bottom: 1px solid #696969;
cursor: pointer;
/* border: none; */
width: 100%;
&:hover {
    background-color: #262626;
}
`