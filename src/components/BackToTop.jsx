import React, {useState, useEffect }from 'react';
import { FaAngleUp } from 'react-icons/fa';
import styled from 'styled-components';

const BackToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behaviour: 'smooth',
        });
    };

    return (
        <TopToBtm>
            {" "}
            {showTopBtn && (
            <Icon>
            <FaAngleUp size={50} onClick={goToTop}/>
            </Icon>    
            )}{" "}
        </TopToBtm>
    )
};

export default BackToTop;

const TopToBtm = styled.div`
    position: relative;
`

const Icon = styled.div`
    position: fixed;
    bottom: 25px;
    right: 25px;
    z-index: 20;
    background-color: #F4C430;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    color: #FFFFFF;
    cursor: pointer;
    &:hover {
        color: #000000;
    };
`