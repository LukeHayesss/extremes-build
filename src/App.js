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
import Kernal from './pages/Kernal';
import LineDate from './pages/LineDate';
import DoyScatter from './pages/DoyScatter';
import Contact from './pages/Contact';

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

        {/* <LineHeader>This is a graph.</LineHeader>
        <Heatmap/> */}

        <LineHeader>Heatmap for Heatwaves.</LineHeader>
        <HeatwaveHmap/>

        <LineHeader>Interactive Heatmap.</LineHeader>
        <HeatmapInteractive/>   

        <LineHeader>Kernal</LineHeader> 
        <DetailCont>
        <BodyDeets>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum."</BodyDeets>
        <Kernal/>   
        </DetailCont>

        <LineHeader>Line with Date</LineHeader> 
        <LineCont>
          <LineDate/>
          <BodyDeets>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum."</BodyDeets>
        </LineCont>

        <FullContainer>
        <LineHeader>Doy Scatter Plot</LineHeader>
        <BodyDeetsFull>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum."</BodyDeetsFull>
        <DoyScatter/>
        </FullContainer>


        <Contact/>
        <BottomBar/>
        <Footer/>
        <FooterBelow/>
      </BrowserRouter>
    </div>
  );
}

const AutoScrollGraphs = styled.div``

const Button = styled.button`
border: none;
background-color: #f8f5f1;
`

const LineCont = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
@media (max-width: 767px) {
  flex-direction: column;
}
`
const FullContainer = styled.div`
background-color: #eeeeee;
`

const DetailCont = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
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
margin: 0 60px 0 60px;
text-align: justify;

@media (max-width: 767px) {
  width: auto;
}
`

const BodyDeetsFull = styled.div`
font-family: 'Rubik', sans-serif;
font-size: 26px;
display: flex;
/* width: 80%; */
height: auto;
margin: 30px 90px 30px 90px;
align-items: center;
text-align: center;
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
font-size: 50px;
font-weight: bold;
font-family: 'Rubik', sans-serif;
margin-top: 50px;
margin-bottom: 20px;
/* margin-bottom: 100px; */
`

export default App;
