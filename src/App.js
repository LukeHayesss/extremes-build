import './App.css';
import GlobalStyles from './pages/GlobalStyles';
import { BrowserRouter } from 'react-router-dom'
import BottomBar from './components/BottomBar';
import Footer from './pages/Footer';
import Logo2 from '../src/media/logo-white2.png';
import styled from 'styled-components';
import { NavLink, useParams } from "react-router-dom";
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
import { useEffect, useRef, useState } from 'react';
import React from 'react';

function App() {

  const [details, setDetails] = useState({});
  let params = useParams()

  // conditionally render the different sizes of map body to display, based on device size
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 767;
  React.useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize)
        return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

// implement autoscroll function  
const ref = useRef(null);
const handleClick = () => {
  ref.current?.scrollIntoView({behaviour: 'smooth'});
}
  
//need to fetch the data to dynamically update ''is this temp normal'' section
useEffect(() => {
  async function fetchData(name) {
      const response = await fetch(`/recipe/${name}`) //update route here when finalized
      const data = await response.json()
      setDetails(data);
      console.log(data, 'Check Data Working')
  }
  fetchData(params.name)
}, [])


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
          
        <BodyDeets><SectionH1>Temperature Probability</SectionH1>These 
          shades are the probability of a given temperature
          to occur at this time of the year, where blue is for daily low
          temperatures and red for daily high temperatures. Temperatures for
          which the shade is higher are more probable and very unlikely
          temperatures are represented by lower shades. A few bars are also
          added and they represent the thresholds of the 5% coldest (5th 
          perc) and warmest (95th perc) days. The central line indicates the
          50th percentile which separates the coldest and the warmest half of
          days.</BodyDeets>
          <KernelCont>
        <KernelMaxMin/>
        </KernelCont>
        </DetailCont>
        
        <DetailCont>
        <BodyDeets><SectionH1>Is This Temperature Normal?</SectionH1>In the 
          next 24h we expect temperature to be in the range {details.Tmin} (low) and
          {details.Tmax} (high). Thus, mean temperature will be {details.Tmean}, which is 
          warmer than {details.ptile_tmean} of days at this location and this time 
          of the year. Typically, days below the 5% or above the 95% are 
          considered cold and hot extremes.</BodyDeets>
          <DoyCont>
        <DoyScatter/>
        </DoyCont>
        </DetailCont>
        </ContainerOne>

        <MiniBorder/>
        <LineHeader>Day and Night</LineHeader> 
        <LineCont>
          <LineDateCont>
          <LineDate/>
          </LineDateCont>
          <BodyDeets>Daily low temperatures usually occur at night and high temperatures 
            during the central hours of the day. Mean daily temperature is a good 
            indicator of how warm a day is, but perhaps a bit <i>too</i> simple. Looking into
            low and high temperature separately give us a more complete picture. For 
            example, it gives us information on whether the night was particularly cold
            or the day scorching, which is not always reflected well in mean temperature. 
            This is the typical range of temperatures at this location and its evolution 
            throughout the year. Shades indicate the range between the 10th and the 90th 
            percentile, which represents 80% of the days. Temperatures outside these ranges
            may be regarded as extremes.</BodyDeets>
        </LineCont>

        <FullContainer>
        <LineHeader>Temperature Heatmap</LineHeader>
        <BodyDeetsFull>Heatmaps are a great way of visualizing how extreme the year has 
            been so far. At a glance, we can get an idea of whether the year 
            or a particular period has been particularly warm (red) or cold (blue). 
            Each day has a number associated, which is the percentile of the 
            temperature that day at this location and that time of the year. The 
            percentile tells us the percentage of days that were colder. Thus, if a day 
            has a 95, it was warmer than 95% of the days at that time of the year, which
            is quite high. It is important to compare with days at the same time of the year 
            to account for the effects of seasons and get a real idea of how warm the 
            day was.</BodyDeetsFull>
          <HmapInteractiveCont>
        <HeatmapInteractive/>
        </HmapInteractiveCont>
        </FullContainer>

        
        <FullContainerLight>
        <MiniBorder/>
        <LineHeader>Heat and Cold Waves</LineHeader>
        <BodyDeetsFull>Heat and cold episodes tend to occur over multiple days. 
          If these heat and cold episodes are particularly intense and extend 
          over various days, their effects can be very adverse. That situation 
          is often called a heat or cold wave. They can be measured using 
          very different metrics. Here we use the Excess Heat Factor, which basically 
          takes into account the temperature over the last 3 days and determines if it
          has been particularly warm (>90th percentile). Then we also consider the 
          temperature over the previous 30 days to account for possible acclimatization 
          depending on whether the heat event was sudden or not. The index represent
          how much temperature departs from what we consider to be extreme 
          temperatures at this time of the year. The higher the index, the more extreme
          the heat wave. We can also measure their duration or how often they’ve 
          occurred. We have adapted the index to cold conditions (Cold Excess Factor) 
          to measure cold waves as well.</BodyDeetsFull>
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
font-size: 28px;
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
font-size: 28px;
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
//main header
const Wrapper = styled.div`
  /* position: fixed;
  width: 100%;
  z-index: 5000;
  height: 150px; */
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

const SectionH1 = styled.div`
font-size: 38px;
font-weight: 600;
font-family: 'Rubik', sans-serif;
margin-bottom: 25px;
@media (max-width: 1100px) {
  text-align: center;
  font-size: 38px;
}
`
export default App;
