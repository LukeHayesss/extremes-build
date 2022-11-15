import React from "react";
import styled from "styled-components";

const FooterBelow = () => {
    return (
        <Container>
            <Bar>
              <Copyright>© 2022 All Rights Reserved</Copyright>
              {/* <Email>info@currentlyhq.com</Email> */}
              <Email><a href="mailto:info@currentlyhq.com?subject=General Inquiry">info@currentlyhq.com</a></Email>
            </Bar>

        </Container>
    )
}

export default FooterBelow;

const Container = styled.div``

const Bar = styled.div`
display: flex;
padding: 15px;
color: #FFFFFF;
background-color: #000000;
border: none;
width: 100%;
border-top: 1px solid #696969;
height: 80px;
@media (max-width: 896px) {
       flex-direction: column-reverse;
}
`

const Copyright = styled.div`
    flex: 50%;
    color: white;
    font-size: 22px;
    text-align: justify;
    padding-left: 50px;
    margin: auto;

    @media (max-width: 896px) {
    padding-left: 0px;
    font-size: 12px;
    padding-top: 10px;
}
`
const Email = styled.div`
margin: auto;
a {
    flex: 50%;
    color: white;
    font-size: 22px;
    text-align: right;
    padding-right: 55px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        color: #F4C430;
    }
@media (max-width: 896px) {
padding-right: 0px;
}

@media (max-width: 320px) {
font-size: 18px;
}
}

`