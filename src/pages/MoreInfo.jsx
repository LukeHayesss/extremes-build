import styled from "styled-components";
import { FaArrowCircleDown } from 'react-icons/fa';

const MoreInfo = () => {
    
    return (
        <Wrapper>
            <Container>
                <Header>More Info</Header>
                <Icon>
                    <FaArrowCircleDown size={100}/>
                </Icon>
            </Container>
            
        </Wrapper>
    )
}
export default MoreInfo;

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

const Container = styled.div`
height: 20vh;
`

const Icon = styled.div`
color: #f4c430;
cursor: pointer;
`