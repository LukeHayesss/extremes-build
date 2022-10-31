import styled from "styled-components";


// {/* hide the graphs on default, autoscroll into view when map clicked */}


const Graphs = () => {
    
    return (
        <Wrapper>
            <Container>
                <Header>Graphs and Plots</Header>
                <Para>Hidden by default, visible once map clicked</Para>
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
`

const Header = styled.h1`
font-family: 'Rubik', sans-serif;
font-size: 45px;
`
const Para = styled.div`
font-family: Arial, Helvetica, sans-serif;
font-size: 35px;
`

const Container = styled.div`
height: 80vh;
`