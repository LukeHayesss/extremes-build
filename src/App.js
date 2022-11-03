import './App.css';
import GlobalStyles from './pages/GlobalStyles';
import { BrowserRouter } from 'react-router-dom'
import BottomBar from './components/BottomBar';
import Footer from './pages/Footer';
// import Logo1 from '../src/media/logo-svg.svg';
import Logo2 from '../src/media/logo-white2.png';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import MapBody from './pages/MapBody';
import MoreInfo from './pages/MoreInfo';
import Graphs from './pages/Graphs';
import 'leaflet/dist/leaflet.css'
import FooterBelow from './pages/FooterBelow';
import Line from './pages/Line';

function App() {
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
        <MoreInfo/>
        {/* hide the graphs on default, autoscroll into view when map clicked */}
        <Graphs/>
        <Line/>
        <BottomBar/>
        <Footer/>
        <FooterBelow/>
      </BrowserRouter>
    </div>
  );
}

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

export default App;
