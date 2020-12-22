import React from 'react';

import styled from 'styled-components';
import {
  faChrome,
  faEdge,
  faFirefoxBrowser,
  faSafari
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Typography } from 'lattice-ui-kit';

import { UNSUPPORTED_BROWSER } from '../../utils/constants/labels';

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  min-height: 200px;
  padding: 30px 40px;
  width: 100%;
`;

const SupportedBroswers = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;

  svg {
    margin: 0 5px;
  }
`;

const IEModal = ({ getText }) => (
  <Modal withHeader={false} isVisible>
    <Content>
      <Typography variant="h1">
        {getText(UNSUPPORTED_BROWSER.HEADER)}
      </Typography>
      <Typography variant="body1">
        {getText(UNSUPPORTED_BROWSER.WARNING)}
      </Typography>
      <Typography variant="body1">
        {getText(UNSUPPORTED_BROWSER.SUGGESTION)}
      </Typography>
      <SupportedBroswers>
        <FontAwesomeIcon icon={faChrome} size="3x" />
        <FontAwesomeIcon icon={faEdge} size="3x" />
        <FontAwesomeIcon icon={faFirefoxBrowser} size="3x" />
        <FontAwesomeIcon icon={faSafari} size="3x" />
      </SupportedBroswers>
    </Content>
  </Modal>
);

export default IEModal;
