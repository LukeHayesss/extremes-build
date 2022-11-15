import styled from "styled-components";
import { FaArrowCircleDown } from 'react-icons/fa';

const MoreInfo = () => {
    
    return (
        <Wrapper>
            <Container>
                <Header>More Info</Header>
                <Icon>
                    <FaArrowCircleDown size={100} className="hvr-hang"/>
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
`

const Header = styled.h1`
font-family: 'Rubik', sans-serif;
font-size: 45px;
padding-top: 20px;
color: black;
@media (max-width: 896px) {
  width: auto;
  margin: 0 25px 0 25px;
  font-size: 38px;
}

@media (max-width: 425px) {
  font-size: 28px;
  padding-top: 10px;
}
`

const Container = styled.div`
height: auto;
`

const Icon = styled.div`
color: #f4c430;
cursor: pointer;
margin-bottom: 20px;

@media (max-width: 1000px) {
  scale: 70%;
}

@media (max-width: 751px) {
  scale: 60%;
  margin-bottom: 10px;
}

&:hover {
    @-webkit-keyframes hvr-hang {
  0% {
    -webkit-transform: translateY(8px);
    transform: translateY(8px);
  }
  50% {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
  }
  100% {
    -webkit-transform: translateY(8px);
    transform: translateY(8px);
  }
}
@keyframes hvr-hang {
  0% {
    -webkit-transform: translateY(8px);
    transform: translateY(8px);
  }
  50% {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
  }
  100% {
    -webkit-transform: translateY(8px);
    transform: translateY(8px);
  }
}
@-webkit-keyframes hvr-hang-sink {
  100% {
    -webkit-transform: translateY(8px);
    transform: translateY(8px);
  }
}
@keyframes hvr-hang-sink {
  100% {
    -webkit-transform: translateY(8px);
    transform: translateY(8px);
  }
}
.hvr-hang {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.hvr-hang:hover, .hvr-hang:focus, .hvr-hang:active {
  -webkit-animation-name: hvr-hang-sink, hvr-hang;
  animation-name: hvr-hang-sink, hvr-hang;
  -webkit-animation-duration: .3s, 1.5s;
  animation-duration: .3s, 1.5s;
  -webkit-animation-delay: 0s, .3s;
  animation-delay: 0s, .3s;
  -webkit-animation-timing-function: ease-out, ease-in-out;
  animation-timing-function: ease-out, ease-in-out;
  -webkit-animation-iteration-count: 1, infinite;
  animation-iteration-count: 1, infinite;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-direction: normal, alternate;
  animation-direction: normal, alternate;
}
}
`