import styled from "styled-components";
import React from "react";


// {/* hide the graphs on default, autoscroll into view when map clicked */}


const Graphs = () => {
    
    return (
        <Wrapper>
            <Container>
                <Header>Details</Header>
                {/* <Para>Hidden by default, visible once map clicked</Para> */}
            </Container>
            
        </Wrapper>
    )
}
export default Graphs;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-top: 1px solid #000000;
background-color: #EEEEEE;

`

const Header = styled.h1`
font-family: 'Rubik', sans-serif;
font-size: 55px;
padding-top: 30px;
`
// const Para = styled.div`
// font-family: Arial, Helvetica, sans-serif;
// font-size: 35px;
// `

const Container = styled.div`
/* height: 20vh; */
`