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
border-top: 1px solid #E0E0E0;
height: 80px;
`

const Copyright = styled.div`
    flex: 50%;
    color: white;
    font-size: 22px;
    text-align: justify;
    padding-left: 1.2rem;
    margin: auto;
`
const Email = styled.div`
margin: auto;
a {
    flex: 50%;
    color: white;
    font-size: 22px;
    text-align: right;
    padding-right: 1.2rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        color: #F4C430;
    }
}
`