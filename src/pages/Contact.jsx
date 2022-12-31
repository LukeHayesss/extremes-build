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
@media (max-width: 896px) {
  flex-direction: column;
}
`

const LeftSection = styled.div`
font-family: 'Rubik', sans-serif;
font-size: 56px;
flex: 1 33%;
width: 33%;
height: auto;
padding-top: 35px;
font-weight: 600;
text-align: center;
@media (max-width: 896px) {
    font-size: 38px;
    margin: auto;
    width: auto;
}
`

const RightSection = styled.div`
font-family: 'Rubik', sans-serif;
font-size: 56px;
flex: 1 33%;
width: 33%;
height: auto;
padding-top: 35px;
font-weight: 600;
text-align: center;
@media (max-width: 896px) {
    font-size: 38px;
    margin: auto;
    width: auto;
}
`