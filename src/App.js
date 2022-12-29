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
import MapBodyMobile from './pages/MapBodyMobile';

// implement autoscroll function
import { useRef } from 'react';
import React from 'react';

function App() {

  // conditionally render the different sizes of map body to display, based on device size
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 767;
  React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
        return () => window.removeEventListener("resize", handleWindowResize)
  }, [])
  
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
        
        <MapHolder>
          <MapLeft>
            <HeaderTitle>
              Site Title
            </HeaderTitle>
            <Subtitle>
              Punchy, compelling subtitle that describes
              what this site does, and what a user should
              do upon landing here.
            </Subtitle>
            <TitleButton>Call to action<span class="arrow">→</span></TitleButton>
          </MapLeft>

          <MapRight>
            {width < breakpoint ? (
             <MapBodyMobile/>
            ) : (
             <MapBody/> 
            )}
          </MapRight>
        </MapHolder>

        <Button onClick={handleClick}><MoreInfo/></Button>        
        <AutoScrollGraphs ref={ref}><Graphs/></AutoScrollGraphs>
        
        <ContainerOne>
        <DetailCont>
        <BodyDeets>"Lorem ipsum dolor sit ameit, consectetur adipiscing elit, 
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
          <BodyDeets>"Lorem ipsum dolor sit ameit, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum."</BodyDeets>
        </LineCont>

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
        <BodyDeetsFull>"Lorem ipsum doloor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo conseequat. Duis aute irure dolor in 
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

@media (orientation: landscape) {
  padding-top: 35px;
}
`

const HmapInteractiveCont = styled.div`
width: 80%;
margin: auto;
padding-bottom: 50px;
@media (max-width: 767px) {
  width: 90%;
  padding-top: 35px;
}

@media (orientation: landscape) {
  padding-top: 35px;
}

`

const LineDateCont = styled.div`
width: 50%;
padding-left: 50px;
@media (max-width: 767px) {
  margin: auto;
  width: 90%;
  padding-bottom: 35px;
  padding-left: 0px;
}

@media (max-width: 1000px) {
  padding-left: 15px;
}
`

const KernelCont = styled.div`
width: 60%;
@media (max-width: 1000px) {
  margin: auto;
  width: 100%;
  padding-top: 35px;
}
`

const DoyCont = styled.div`
width: 60%;
@media (max-width: 1000px) {
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
padding-bottom: 50px;
@media (max-width: 767px) {
  flex-direction: column;
}

`
const FullContainer = styled.div`
background-color: #EEEEEE;
padding-bottom: 55px;
border-top: 1px solid #000000;
`

const FullContainerLight = styled.div`
background-color: #f8f5f1;
margin-top: -50px;
padding-bottom: 50px;
`

const DetailCont = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding-top: 30px;
@media (max-width: 1000px) {
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
@media (max-width: 1000px) {
  width: auto;
  margin: 0 25px 0 25px;
}

@media (max-width: 768px) {
  font-size: 16px;
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

@media (max-width: 768px) {
  font-size: 16px;
}
`

const Wrapper = styled.div`
  background-color: #000000;
  color: #fff;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://assets.website-files.com/5e870779d9def4583b128a66/5e870779e18b0edb3fa63c96_topography.svg");
`;

const HomeNavLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
`;

const Logo = styled.img`
@media (min-width: 1024px) {
height: 120px !important;
z-index: 1000;
}

@media (max-width: 896px) {
height: 80px;
}

@media (min-width: 768px) {
height: 90px;
}

@media (max-width: 320px) {
height: 60px;
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

@media (max-width: 425px) {
  font-size: 28px;
}
`
const MiniBorder = styled.div`
border-top: 1px solid #696969;
`

//new format
const MapHolder = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
@media (max-width: 1100px) {
  flex-direction: column;
}
`
const MapRight = styled.div`
flex: 1 33%;
width: 100%;
height: auto;
padding-top: 0px;
@media (max-width: 896px) {
  /* margin: auto;
  width: auto; */
}
`
const MapLeft = styled.div`
flex: 1 33%;
width: 33%;
height: auto;
padding-top: 0px;
text-align: center;
@media (max-width: 1100px) {
  margin: auto;
  width: auto;
}
`

const HeaderTitle = styled.div`
font-size: 80px;
font-weight: bold;
font-family: 'Rubik', sans-serif;
margin-top: 100px;
color: black;
text-align: left;
padding-left: 100px;
@media (max-width: 1100px) {
  font-size: 45px;
  margin-top: 25px;
  text-align: center;
  padding-left: 0px;
}
`


const Subtitle = styled.div`
font-size: 34px;
font-family: 'Rubik', sans-serif;
margin-top: 24px;
color: black;
padding-left: 100px;
padding-right: 100px;
text-align: left;
@media (max-width: 1100px) {
  font-size: 30px;
  text-align: center;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 35px;
}
@media (max-width: 430px) {
  font-size: 22px;
  text-align: center;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 35px;
}
`
const TitleButton = styled.button`
position: relative;
font-size: 24px;
border-radius: 100px;
padding: 18px 30px;
text-align: center;
float: left;
margin-left: 100px;
margin-top: 34px;
background-color: black;
color: #ffffff;
font-weight: 600;
border: none;
cursor: pointer;
&:hover {
  background-color: #f4c430;
  color: #000000;
}
@media (max-width: 1100px) {
  font-size: 16px;
  margin-top: 0px;
  float: none;
  margin-left: 0px;
  margin-bottom: 35px;
}
@media (max-width: 896px) {
  display: none;
}
`
export default App;
