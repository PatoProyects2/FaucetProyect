import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 40px;
  right: ${props => (props.open ? "0" : "100%")};
  width: 100%;
  transition: right 0.3s linear;
  font-size: 20px;
  padding: 10px;

  @media only screen and (min-width: 624px) {
    flex-direction: row;
    position: initial;
    height: auto;
    justify-content: center;
    background-color: #161616;
  }

  a {
    padding: 0.5rem 0.8rem;
  }

  p {
    margin-top: 20px;
  }
`;
