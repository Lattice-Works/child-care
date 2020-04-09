// @flow

import React, {
  useCallback,
  useEffect,
  useReducer,
  useState
} from 'react';
import { bindActionCreators } from 'redux';

import styled, { css } from 'styled-components';
import moment from 'moment';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMapboxGl, { ScaleControl } from 'react-mapbox-gl';
import { Map, fromJS } from 'immutable';
import { Colors } from 'lattice-ui-kit';
import { connect } from 'react-redux';

import EditFilter from './EditFilter';
import { STAY_AWAY_STORE_PATH } from './constants';
import { PROVIDERS } from '../../../utils/constants/StateConstants';
import { PROPERTY_TYPES } from '../../../utils/constants/DataModelConstants';
import { LABELS } from '../../../utils/constants/Labels';
import { DAYS_OF_WEEK } from '../../../utils/DataConstants';
import { APP_CONTAINER_WIDTH, HEIGHTS } from '../../../core/style/Sizes';

import FindingLocationSplash from '../FindingLocationSplash';
import BasicButton from '../../../components/buttons/BasicButton';
import InfoButton from '../../../components/buttons/InfoButton';
import { getBoundsFromPointsOfInterest, getCoordinates } from '../../map/MapUtils';
import { usePosition, useTimeout } from '../../../components/hooks';
import { ContentOuterWrapper, ContentWrapper } from '../../../components/layout';
import { isNonEmptyString } from '../../../utils/LangUtils';
import { getValue, getValues } from '../../../utils/DataUtils';
import { getRenderTextFn } from '../../../utils/AppUtils';
import { FlexRow, MapWrapper, ResultSegment } from '../../styled';
import * as LocationsActions from './LocationsActions';

const DAY_PTS = {
  [DAYS_OF_WEEK.SUNDAY]: [PROPERTY_TYPES.SUNDAY_START, PROPERTY_TYPES.SUNDAY_END],
  [DAYS_OF_WEEK.MONDAY]: [PROPERTY_TYPES.MONDAY_START, PROPERTY_TYPES.MONDAY_END],
  [DAYS_OF_WEEK.TUESDAY]: [PROPERTY_TYPES.TUESDAY_START, PROPERTY_TYPES.TUESDAY_END],
  [DAYS_OF_WEEK.WEDNESDAY]: [PROPERTY_TYPES.WEDNESDAY_START, PROPERTY_TYPES.WEDNESDAY_END],
  [DAYS_OF_WEEK.THURSDAY]: [PROPERTY_TYPES.THURSDAY_START, PROPERTY_TYPES.THURSDAY_END],
  [DAYS_OF_WEEK.FRIDAY]: [PROPERTY_TYPES.FRIDAY_START, PROPERTY_TYPES.FRIDAY_END],
  [DAYS_OF_WEEK.SATURDAY]: [PROPERTY_TYPES.SATURDAY_START, PROPERTY_TYPES.SATURDAY_END]
};

const StyledContentOuterWrapper = styled(ContentOuterWrapper)`
 z-index: 1;
 position: fixed;
 bottom: 0;

 @media only screen and (min-height: ${HEIGHTS[0]}px) {
   min-height: ${HEIGHTS[0] / 3}px;
 }

 @media only screen and (min-height: 639px) {
   min-height: 270px;
 }

 @media only screen and (min-height: ${HEIGHTS[1]}px) {
   min-height: 350px;
 }

 @media only screen and (min-height: ${HEIGHTS[2]}px) {
   min-height: 350px;
 }

 @media only screen and (min-height: ${HEIGHTS[3]}px) {
   min-height: 460px;
 }

 @media only screen and (min-height: ${HEIGHTS[4]}px) {
   min-height: 630px;
 }
`;

const StyledContentWrapper = styled(ContentWrapper)`
  background-color: white;
  position: relative;
`;

const HeaderLabel = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 10px;

  color: #555E6F;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 8px 0;


  font-family: Inter;
  font-size: 14px;
  line-height: 19px;

  div {
    color: #555E6F;
  }
`;

const DataRows = styled.div`
  display: flex;
  flex-direction: column;

  span {
    text-align: right;
    color: #8E929B;
  }
`;

const DateRow = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  span {
    color: #8E929B;
  }

  span:first-child {
    text-align: left;
    margin-right: 10px;
  }

  span:last-child {
    text-align: right;
  }
`;

class ProviderDetailsContainer extends React.Component {

  render() {

    const { renderText, provider } = this.props;

    if (!provider) {
      return null;
    }

    const name = getValue(provider, PROPERTY_TYPES.FACILITY_NAME);
    const type = getValues(provider, PROPERTY_TYPES.FACILITY_TYPE);
    const status = getValues(provider, PROPERTY_TYPES.STATUS);
    const paymentOptions = getValues(provider, PROPERTY_TYPES.PAYMENT_OPTIONS);
    const url = getValue(provider, PROPERTY_TYPES.URL);
    const phone = getValue(provider, PROPERTY_TYPES.PHONE);

    const street = getValue(provider, PROPERTY_TYPES.ADDRESS);
    const city = getValue(provider, PROPERTY_TYPES.CITY);
    const zip = getValue(provider, PROPERTY_TYPES.ZIP);

    const pointOfContact = getValues(provider, PROPERTY_TYPES.POINT_OF_CONTACT_NAME);

    const isPopUp = getValue(provider, PROPERTY_TYPES.IS_POP_UP);

    const capacities = [];
    if (getValue(provider, PROPERTY_TYPES.CAPACITY_UNDER_2)) {
      capacities.push('0 yr - 1 yr');
    }
    if (getValue(provider, PROPERTY_TYPES.CAPACITY_2_to_5)) {
      capacities.push('2 yr - 5 yr');
    }
    if (getValue(provider, PROPERTY_TYPES.CAPACITY_OVER_5)) {
      capacities.push('6 yr and up');
    }

    const formatTime = (time) => {
      if (!time) {
        return '?';
      }

      const withDate = moment.utc(time);
      if (!withDate.isValid()) {
        return '?';
      }

      return withDate.format('hh:mma');
    }

    const operatingHours = [];

    const unknown = renderText(LABELS.UNKNOWN);

    if (getValue(provider, PROPERTY_TYPES.HOURS_UNKNOWN)) {
      operatingHours.push(<span>{unknown}</span>);
    }
    else {
      Object.values(DAYS_OF_WEEK).forEach((day) => {
        const [startPT, endPT] = DAY_PTS[day];
        const start = getValue(provider, startPT);
        const end = getValue(provider, endPT);

        const timeWindowStr = (start || end) ? `${formatTime(start)} - ${formatTime(end)}` : 'Closed';

        if (start || end) {
          operatingHours.push(
            <DateRow key={day}>
              <span>{renderText(LABELS[day])}</span>
              <span>{timeWindowStr}</span>
            </DateRow>
          );
        }
      });
    }

    if (!operatingHours.length) {
      operatingHours.push(<span>Unknown</span>);
    }

    return (
      <StyledContentOuterWrapper>
        <StyledContentWrapper padding="25px">
          <HeaderLabel>{renderText(LABELS.CONTACT)}</HeaderLabel>

          <Row>
            <div>{renderText(LABELS.PHONE)}</div>
            <DataRows>
              <span>{phone || unknown}</span>
            </DataRows>
          </Row>

          <Row>
            <div>{renderText(LABELS.POINT_OF_CONTACT)}</div>
            <DataRows>
              <span>{pointOfContact || unknown}</span>
            </DataRows>
          </Row>

          <Row>
            <div>{renderText(LABELS.ADDRESS)}</div>
            <DataRows>
              <span>{street}</span>
              <span>{`${city}, CA ${zip}`}</span>
            </DataRows>
          </Row>

          <Row>
            <div>{renderText(LABELS.OPERATING_HOURS)}</div>
            <DataRows>
              {operatingHours}
            </DataRows>
          </Row>

        </StyledContentWrapper>
      </StyledContentOuterWrapper>
    );
  }
}

function mapStateToProps(state :Map<*, *>) :Object {
  const providerState = state.getIn([...STAY_AWAY_STORE_PATH], Map());

  const lat = providerState.getIn(['selectedOption', 'lat']);
  const lon = providerState.getIn(['selectedOption', 'lon']);

  return {
    providerState: state.getIn([...STAY_AWAY_STORE_PATH], Map()),
    provider: providerState.get(PROVIDERS.SELECTED_PROVIDER),
    coordinates: [lat, lon],
    renderText: getRenderTextFn(state)
  };
}

function mapDispatchToProps(dispatch :Function) :Object {

  const actions :{ [string] :Function } = {};

  Object.keys(LocationsActions).forEach((action :string) => {
    actions[action] = LocationsActions[action];
  });

  return {
    actions: {
      ...bindActionCreators(actions, dispatch)
    }
  };
}

export default connect<*, *, *, *, *, *>(mapStateToProps, mapDispatchToProps)(ProviderDetailsContainer);
