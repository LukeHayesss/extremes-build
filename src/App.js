import './App.css';
import GlobalStyles from './pages/GlobalStyles';
import { BrowserRouter } from 'react-router-dom'
import BottomBar from './components/BottomBar';
import Footer from './pages/Footer';
import Logo2 from '../src/media/logo-white2.png';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import MapBody from './pages/MapBody';
import MoreInfo from './pages/MoreInfo';
import Graphs from './pages/Graphs';
import 'leaflet/dist/leaflet.css'
import FooterBelow from './pages/FooterBelow';
import HeatwaveHmap from './pages/HeatwaveHmap';
import HeatmapInteractive from './pages/HeatmapInteractive';
import LineDate from './pages/LineDate';
import DoyScatter from './pages/DoyScatter';
import Contact from './pages/Contact';
import KernelMaxMin from './pages/KernelMaxMin';
import BackToTop from './components/BackToTop';

// implement autoscroll function
import { useRef } from 'react';

function App() {
  
const ref = useRef(null);
const handleClick = () => {
  ref.current?.scrollIntoView({behaviour: 'smooth'});
}
  
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
      <BackToTop/>
      <GlobalStyles/>
      <Wrapper>
          <NavMenu>
          <HomeNavLink exact to='/'>
          <Logo src={Logo2}></Logo>
          </HomeNavLink>
          </NavMenu>
        </Wrapper>
        <MapBody/>

        
        {/* <MoreInfo></MoreInfo> */}
        <Button onClick={handleClick}><MoreInfo/></Button>
        {/* hide the graphs on default, autoscroll into view when map clicked */}
        
        <AutoScrollGraphs ref={ref}><Graphs/></AutoScrollGraphs>
        
        <ContainerOne>
        <DetailCont>
        <BodyDeets>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum."</BodyDeets>
          <KernelCont>
        <KernelMaxMin/>
        </KernelCont>
        </DetailCont>
        

        {/* <LineHeader>Doy Scatter Plot</LineHeader> */}
        <DetailCont>
        <BodyDeets>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum."</BodyDeets>
          <DoyCont>
        <DoyScatter/>
        </DoyCont>
        </DetailCont>
        </ContainerOne>

        <MiniBorder/>
        <LineHeader>Line with Date</LineHeader> 
        <LineCont>
          <LineDateCont>
          <LineDate/>
          </LineDateCont>
          <BodyDeets>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum."</BodyDeets>
        </LineCont>

        <MiniBorder/>
        <FullContainer>
        <LineHeader>Interactive Heatmap</LineHeader>
        <BodyDeetsFull>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum."</BodyDeetsFull>
          <HmapInteractiveCont>
        <HeatmapInteractive/>
        </HmapInteractiveCont>
        </FullContainer>

        
        <FullContainerLight>
        <MiniBorder/>
        <LineHeader>Heat and Cold Waves In 2022.</LineHeader>
        <BodyDeetsFull>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum."</BodyDeetsFull>
        <HmapCont>
        <HeatwaveHmap/>  
        </HmapCont>
        </FullContainerLight>

        <MiniBorder/>
        <Contact/>
        <BottomBar/>
        <Footer/>
        <FooterBelow/>
      </BrowserRouter>
    </div>
  );
}

//define size after applying mobile-friendly viewbox within component
const HmapCont = styled.div`
width: 80%;
margin: auto;
@media (max-width: 767px) {
  width: 90%;
  padding-top: 35px;
}
`

const HmapInteractiveCont = styled.div`
width: 80%;
margin: auto;
@media (max-width: 767px) {
  width: 90%;
  padding-top: 35px;
}
`

const LineDateCont = styled.div`
width: 50%;
padding-left: 70px;
@media (max-width: 767px) {
  margin: auto;
  width: 90%;
  padding-bottom: 35px;
  padding-left: 0px;
}
`

const KernelCont = styled.div`
width: 60%;
@media (max-width: 767px) {
  margin: auto;
  width: 100%;
  padding-top: 35px;
}
`

const DoyCont = styled.div`
width: 60%;
@media (max-width: 767px) {
  margin: auto;
  width: 90%;
  padding-top: 35px;
}
`

const AutoScrollGraphs = styled.div``

const ContainerOne = styled.div`
background-color: #EEEEEE;
padding-bottom: 35px;
`

const Button = styled.button`
border: none;
color: black;
background-color: #f8f5f1;
`

const LineCont = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding-bottom: 35px;
@media (max-width: 767px) {
  flex-direction: column;
}
`
const FullContainer = styled.div`
background-color: #EEEEEE;
padding-bottom: 35px;
`

const FullContainerLight = styled.div`
background-color: #f8f5f1;
margin-top: -50px;
padding-bottom: 55px;
`

const DetailCont = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding-top: 30px;
@media (max-width: 767px) {
  flex-direction: column;
}
`

const BodyDeets = styled.div`
font-family: 'Rubik', sans-serif;
font-size: 26px;
flex: 1 33%;
width: 33%;
height: auto;
margin: 0 70px 0 70px;
text-align: justify;
font-weight: 300;
@media (max-width: 896px) {
  width: auto;
  margin: 0 25px 0 25px;
}
`

const BodyDeetsFull = styled.div`
font-family: 'Rubik', sans-serif;
font-size: 26px;
display: flex;
height: auto;
margin: 0px 90px 30px 90px;
align-items: center;
text-align: center;
@media (max-width: 896px) {
  width: auto;
  margin: 0 25px 0 25px;
  text-align: justify;
}
`

const Wrapper = styled.div`
  background-color: #000000;
  color: #fff;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeNavLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 120px;
  @media (max-width: 896px) {
  /* scale: 70%; */
  height: 80px;
}
`;

const NavMenu = styled.div`
padding: 2rem 0.9rem;
display: flex;
align-items: center;
svg {
  font-size: 4rem;
  color: black;
}
`

const StyledNavLink = styled(NavLink)`
  cursor: pointer;
  color: black;
  font-size: 1.8rem;
  display: flex;
  text-decoration: none;
  &:hover {
    color: black;
    text-decoration: underline;
  }
`;

const LineHeader = styled.div`
font-size: 55px;
font-weight: bold;
font-family: 'Rubik', sans-serif;
margin-top: 20px;
margin-bottom: 0px;
padding-top: 30px;
padding-bottom: 30px;
@media (max-width: 896px) {
  width: auto;
  margin: 0 25px 0 25px;
  font-size: 38px;
}
`
const MiniBorder = styled.div`
border-top: 1px solid #000000;
`


export default App;
