import React from 'react';
import styled from 'styled-components';
const Wrapper = styled('div')`
  background: #f0f8ff;
  display: flex;
  height: 6.4rem;
  justify-content: center;
  align-items: center;
  position: fixed;
  color: #000;
  top: 0;
  width: 100%;
  z-index: 1;
  @media (max-width: 992px) {
    height: 4rem;
  }
`;
const Logo = styled('span')`
  margin: 0 3.4rem;
  width: 10rem;
  position: absolute;
  left: 10rem;
  text-align: center !important;
  @media (max-width: 992px) {
    margin: 0 1rem;
  }
`;

const LogoImg = styled('img')`
  height: 100%;
  width: 65%;
  @media (min-width: 992px) {
    margin-left: 722px;
  }
  @media (max-width: 992px) {
    margin-right: 80px;
    width: 55%;
  }
`;
export default class Header extends React.Component {
  render() {
    return (
      <Wrapper>
        <Logo>
          <LogoImg src="https://res.cloudinary.com/dmucjgxqt/image/upload/v1606044625/ally-logo_rkxy32.png" />
        </Logo>
      </Wrapper>
    );
  }
}
