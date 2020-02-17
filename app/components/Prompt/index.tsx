import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';

import { Body, ButtonsContainer, Header, PromptContainer } from './style';

interface IPromptProps {
  header: string;
  message: string;
  onClickHandler: (e: any) => void;
}

const Prompt: React.FC<IPromptProps> = (props) => {
  const { onClickHandler } = props;

  return (
    <PromptContainer>
      <Header>
        {props.header}
      </Header>
      <Body>
          {props.message}
      </Body>
      <ButtonsContainer>
        <Button
          name="Create New Account"
          color="teal"
          content="Create New Account"
          size="medium"
          onClick={onClickHandler}
        />
      </ButtonsContainer>
    </PromptContainer>
  );
};

export default Prompt;