// @flow

import React from 'react';

import styled, { css } from 'styled-components';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, Map } from 'immutable';
import { Colors } from 'lattice-ui-kit';
import { FILTER_HEADERS } from './constants';
import { APP_CONTAINER_WIDTH, HEADER_HEIGHT } from '../../../core/style/Sizes';

import ChildrenFilter from './filters/ChildrenFilter';
import DayAndTimeFilter from './filters/DayAndTimeFilter';
import RadiusFilter from './filters/RadiusFilter';
import TypeOfCareFilter from './filters/TypeOfCareFilter';
import ZipFilter from './filters/ZipFilter';
import BasicButton from '../../../components/buttons/BasicButton';
import { ContentOuterWrapper, ContentWrapper } from '../../../components/layout';
import { PROVIDERS } from '../../../utils/constants/StateConstants';

const BOTTOM_BAR_HEIGHT = 70;
const PADDING = 25;

const StyledContentOuterWrapper = styled(ContentOuterWrapper)`
  position: fixed;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  top: ${HEADER_HEIGHT}px;
  bottom: 0;
  z-index: 15;
  background-color: #f5f5f8;
`;

const StyledContentWrapper = styled(ContentWrapper)`
  background-color: white;
  position: relative;
  background-color: white;
  max-height: fit-content;
  position: relative;
  height: calc(100vh - ${BOTTOM_BAR_HEIGHT}px - ${HEADER_HEIGHT}px);
  max-height: calc(100vh - ${BOTTOM_BAR_HEIGHT}px - ${HEADER_HEIGHT}px);
  overflow-y: scroll;
`;

const BackButton = styled.div`
  display: flex;
  flex-direciton: row;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: ${Colors.PURPLES[1]};
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }

  span {
    margin-left: 15px;
  }

  &:hover {
    cursor: pointer
  }
`;

const EditFilterHeader = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  margin: 20px 0;

  color: #555E6F;
`;

const fixedBottomButtonStyle = css`
  border-radius: 3px;
  border: none;
  width: 100%;
  font-family: Inter;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const ApplyButtonWrapper = styled.div`
   position: fixed;
   padding: 10px ${PADDING}px 30px ${PADDING}px;
   width: min(100vw, ${APP_CONTAINER_WIDTH}px);
   bottom: 0;
   height: 70px;
   background-color: white;
   z-index: 16;
`;

const SaveFilterButton = styled(BasicButton)`
  ${fixedBottomButtonStyle}
`;

const FILTER_COMPONENTS = {
  [PROVIDERS.CHILDREN]: ChildrenFilter,
  [PROVIDERS.DAYS]: DayAndTimeFilter,
  [PROVIDERS.RADIUS]: RadiusFilter,
  [PROVIDERS.TYPE_OF_CARE]: TypeOfCareFilter,
  [PROVIDERS.ZIP]: ZipFilter,
}

export default class EditFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }


  getContent = () => {
    const { field } = this.props;
    const { value } = this.state;

    const Component = FILTER_COMPONENTS[field];

    if (!Component) {
      return null;
    }

    return <Component value={value} onChange={(newValue) => this.setState({ value: newValue })} />;
  }

  render() {
    const { field, onCancel, onSave } = this.props;
    const { value } = this.state;

    return (
      <StyledContentOuterWrapper>
        <StyledContentWrapper padding={`${PADDING}px`}>
          <BackButton onClick={onCancel}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Search Parameters</span>
          </BackButton>

          <EditFilterHeader>{FILTER_HEADERS[field]}</EditFilterHeader>

          {this.getContent()}

        </StyledContentWrapper>
        <ApplyButtonWrapper>
          <SaveFilterButton onClick={() => onSave({ field, value })}>Save</SaveFilterButton>
        </ApplyButtonWrapper>
      </StyledContentOuterWrapper>
    );
  }
}
