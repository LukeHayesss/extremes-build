import styled from "styled-components";


const Contact = () => {
    return (
        <Container>
            <LeftSection>
            Placeholder
            </LeftSection>

            <RightSection>
            Placeholder    
            </RightSection>
            
        </Container>
    )
}
export default Contact;

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
height: 300px;
background-color: #EEEEEE;
`

const LeftSection = styled.div`
font-family: 'Rubik', sans-serif;
font-size: 56px;
flex: 1 33%;
width: 33%;
height: auto;
padding-top: 35px;
font-weight: 600;
/* margin: 0 60px 0 60px; */
text-align: justify;
`

const RightSection = styled.div`
font-family: 'Rubik', sans-serif;
font-size: 56px;
flex: 1 33%;
width: 33%;
height: auto;
padding-top: 35px;
font-weight: 600;
/* margin: 0 60px 0 60px; */
text-align: justify;
/* background-color: #F4C430; */
`