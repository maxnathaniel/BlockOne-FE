import styled from '../../styles/styled-components';

export const PromptContainer = styled.div`
  padding: 5px 20px;
  width: 95%;
  background-color: #272F4D;
  margin: 20px auto;
  color: #66FCF1;
  min-height: 140px;
  max-height: 200px;

  @media all and (max-width: 800px) {
    width: 90%;
  }
`;

export const Header = styled.h3`
  margin-top: 10px !important;
  text-align: left;
`;

export const Body = styled.p`
  text-align: left;
  font-size: 1em;
`;

export const ButtonsContainer = styled.div`
  display: inline-block;
  margin: 5px 0;
  text-align: left;
`;