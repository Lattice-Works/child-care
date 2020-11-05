import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Colors, Hooks } from 'lattice-ui-kit';

import { useTimeout } from '../../components/hooks';
import { getTextFnFromState } from '../../utils/AppUtils';
import { WELCOME_SPLASH } from '../../utils/constants/Labels';

const { NEUTRAL, PURPLE } = Colors;

const { useBoolean } = Hooks;

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  padding: 15px 0;
`;

const TextSection = styled.span`
  color: ${NEUTRAL.N700};
  font-size: 14px;
  font-weight: 300;
  text-align: center;
`;

const Header = styled(TextSection)`
  font-size: 20px;
  font-weight: 600;
`;

const Details = styled(TextSection)`
  padding: 30px 0;
`;

const Instructions = styled(TextSection)`
  span {
    color: ${PURPLE.P300};
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
  }
`;

const WelcomeSplash = ({ getCurrentPosition }) => {
  const getText = useSelector(getTextFnFromState);
  const [hidden, , reveal] = useBoolean(true);
  useTimeout(reveal, 10);
  return (
    <Centered hidden={hidden}>
      <Header>{getText(WELCOME_SPLASH.WELCOME)}</Header>
      <Details>{getText(WELCOME_SPLASH.DETAILS)}</Details>
      <Instructions>
        {getText(WELCOME_SPLASH.INSTRUCTIONS_1)}
        <span
            onClick={getCurrentPosition}
            onKeyDown={getCurrentPosition}
            role="button"
            tabIndex={0}>
          { getText(WELCOME_SPLASH.USE_CURRENT_LOCATION_LINK) }
        </span>
        {getText(WELCOME_SPLASH.INSTRUCTIONS_2)}
      </Instructions>
    </Centered>
  );
};
/* eslint-enable */
export default WelcomeSplash;
