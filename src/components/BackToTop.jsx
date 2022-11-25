import React, {useState, useEffect }from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
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
        <TopToBtm className='buttontop'>
            {" "}
            {showTopBtn && (
            <Icon>
            <FaArrowCircleUp size={50} onClick={goToTop}/>
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
    bottom: 15px;
    right: 15px;
    z-index: 20;
    color: #F4C430;
    cursor: pointer;

    @media (max-width: 320px) {
    scale: 60%;
    bottom: 5px;
    right: 5px;
    }

    @media (max-width: 768px) {
        scale: 70%;
        bottom: 8px;
        right: 8px;
    }

    &:hover {
        color: darkgray;
    };
`