import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
// import Logo1 from '../media/logo-svg.svg';
import Logo2 from '../media/logo-white2.png';

const Footer = () => {

  return (

  <Wrapper style={{
    background: "#000000",
    paddingBottom: "25px",
    paddingTop: "29px",
    borderTop: "1px solid #000000"

}}>
      <div>
        <CompanyInfoContainer>
        <HomeNavLink exact to='/'>
          <Logo src={Logo2}></Logo>
          </HomeNavLink>
          
          <Icons>
             <IconLink target="_blank">
                <a href="https://twitter.com/currently">
                <FaTwitter size={30}/>
                </a>
             </IconLink>
             <IconLink target="_blank">
                <a href="https://www.facebook.com/CurrentlyHQ">
                <FaFacebook size={30}/>
                </a>
             </IconLink>
              <IconLink target="_blank">
                <a href="https://www.linkedin.com/company/currentlyhq/">
                <FaLinkedin size={30}/>
                </a>
              </IconLink>
          </Icons>
        </CompanyInfoContainer>
        
      </div>
      <div>
        {/* <InfoContainer>
          <Title>Cool Stuff</Title>
          <li>More Info</li>
          <li>About Us</li>
          <li>Terms of Use</li>
        </InfoContainer> */}
      </div>
      <div>
        <SubscribeContainer>
          <SubscribeTitle>Subscribe For Updates</SubscribeTitle>
          <SubscribeForm>
            <SubscribeInput
            placeholder="Your Email"
            ></SubscribeInput>
            <SubscribeButton>Submit</SubscribeButton>
          </SubscribeForm>
          <SubscribeMiniText>
            By clicking 'submit', you're agreeing to get our newsletter.
          </SubscribeMiniText>
        </SubscribeContainer>
        <FooterPin />
      </div>
    </Wrapper> 
  );
};

const HomeNavLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 70px;
  @media (max-width: 896px) {
    height: 60px;
  }
  @media (min-width: 768px) {
    height: 85px;
  }
  @media (orientation: landscape) {
    height: 95px;
  }
`;

//pin the footer at the bottom//
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3rem 5.5rem 3rem 5.5rem;
  background-color: #4E545C;
  min-height: calc(35vh - 34px);

  @media (max-width: 896px) {
    flex-direction: column;
  }
`;

const FooterPin = styled.div`
position: relative;
left: 0;
bottom: 0;
`

const CompanyInfoContainer = styled.div`
  list-style: none;
  li {
    padding: 7px;
    color: white;
  }
  li:hover {
    cursor: default;
  }
`;

const InfoContainer = styled.div`
  list-style: none;
  line-height: 1.5;
  text-align: center;
  //remove central menu on mobile
  @media (max-width: 895px) {
    display: none;
  }

  li {
    padding: 2px;
    color: #ffffff;
    font-size: 22px;
    font-family: 'Rubik', sans-serif;
    text-transform: uppercase;
    font-weight: 600;
  }
  li:hover {
    cursor: pointer;
    color: #F4C430;
    text-decoration: underline;
    }
`;

const Title = styled.div`
  list-style: none;
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  :hover {
    cursor: default;
  }
`;

//update colors once a tag links added
const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between !important;
  margin-top: 10px;
  width: 100%;
  padding-left: 0px !important;

  @media (max-width: 896px) {
  margin: auto;
  padding-top: 15px;
  width: 35%;
  }

  @media (max-width: 480px) {
    width: 50%;
  }

  //adjust social icons for landscape in phone
  @media only screen and (orientation: landscape) {
    justify-content: center;
    padding-left: 100px;
  }
  @media (max-width: 1023px) {
    padding-left: 0px !important;
    justify-content: space-between;
  }
  
  //adjust for tablet
  @media (min-width: 768px) {
    justify-content: center;
    padding-left: 72px;
  }

a {
  color: white;
  &:hover {
    color: #F4C430;
    cursor: pointer;
  }
}
`;

const IconLink = styled.div`
  color: #ffffff;
  /* padding-right: 35px; */
  &:hover {
    color: #F4C430;
    cursor: pointer;
  }
  /* @media (max-width: 896px) {
    display: flex;
    flex-direction: row; */
    /* padding-right: 80px; */
  /* } */
`;

//SUBSCRIBE SECTION//
const SubscribeContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 896px) {
   padding-top: 45px;
  }
`

const SubscribeTitle = styled.span`
  list-style: none;
  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
  margin-right: auto;
  @media (max-width: 896px) {
    font-size: 19px;
    margin: auto;
    padding-bottom: 10px;
  }
`

const SubscribeForm = styled.form`
  align-items: center;
  display: flex;
  @media (min-width: 768px) {
    justify-content: center;
  }
  @media (orientation: landscape) {
    justify-content: center;
  }
  @media (max-width: 602px) {
    justify-content: center;
  }
`

const SubscribeInput = styled.input`
  height: 40px;
  width: 150px;
  left: 0px;
  top: 0px;
  border-radius: 2px;
  border: none;
  padding-left: 15px;
  background-color: #E0E0E0;
  ::placeholder {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    text-align: left;
    color: black;
  }
`

const SubscribeButton = styled.button`
  height: 40px;
  width: 110px;
  left: 0px;
  top: 0px;
  font-size: 17px;
  border-radius: 0.5rem;
  background: #F4C430;
  border: none;
  margin-left: 10px;
  color: #000000;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #f0b80d;
    color: #000000;
  }
`

const SubscribeMiniText = styled.p`
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  text-align: left;
  margin-top: 16px;
  color: #ffffff;
  cursor: default;
  &:hover {
    color: #ffffff;
  }
  @media (max-width: 896px) {
    text-align: center;
    padding-bottom: 20px;
  }
`

export default Footer;