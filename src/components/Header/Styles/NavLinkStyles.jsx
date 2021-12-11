import styled from "styled-components";

export const NavLinkWrapper = styled.nav`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 40px;
  right: ${props => (props.open ? "0" : "100%")};
  width: 100%;
  transition: right 0.3s linear;
  font-size: 20px;

  @media only screen and (min-width: 1400px) {
    flex-direction: row;
    height: auto;
    justify-content: left;
    background-color: var(--dark-background);
    position: initial;
  }

  a {
    padding: 0.5rem 0.8rem;
    background-color: transparent;
  }

  p {
    margin-top: 20px;
  }
`;
