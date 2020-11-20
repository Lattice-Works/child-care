// @flow

import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import isPlainObject from 'lodash/isPlainObject';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Map, isImmutable } from 'immutable';
import {
  Colors,
  Select,
  StyleUtils,
} from 'lattice-ui-kit';
import { LangUtils, ReduxUtils } from 'lattice-utils';
import { useDispatch, useSelector } from 'react-redux';

import { useTimeout } from '../../../components/hooks';
import { APP_CONTAINER_WIDTH } from '../../../core/style/Sizes';
import { REQUEST_STATE } from '../../../core/redux/constants';
import { getTextFnFromState } from '../../../utils/AppUtils';
import { LABELS } from '../../../utils/constants/labels';
import { PROVIDERS, STATE } from '../../../utils/constants/StateConstants';
import {
  GET_GEO_OPTIONS,
  geocodePlace,
  getGeoOptions,
  loadCurrentPosition,
  selectLocationOption
} from '../LocationsActions';

const { LOCATIONS } = STATE;
const { CURRENT_POSITION, SELECTED_OPTION } = PROVIDERS;
const { NEUTRAL } = Colors;
const { media } = StyleUtils;
const { isNonEmptyString } = LangUtils;
const { isPending } = ReduxUtils;

/* placeholder color needs to be darker to provide more contrast between text and background */
const getTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    neutral50: NEUTRAL.N700
  },
});

const Wrapper = styled.div`
  left: 50%;
  margin: 0 auto;
  max-width: min(${APP_CONTAINER_WIDTH}px, calc(100vw - 100px));
  padding: 8px 0;
  position: fixed;
  top: 0;
  transform: translate(-50%, 0);
  width: 100%;
  z-index: 1000;

  /* fill right side gap for screens smaller than desktop cutoff */
  ${media.desktop`
    max-width: min(${APP_CONTAINER_WIDTH}px, calc(100vw - 60px));
    left: calc(50% + 20px);
  `}
`;

const GroupHeading = () => (<div style={{ borderBottom: `1px solid ${NEUTRAL.N100}` }} />);
const SearchIcon = <FontAwesomeIcon icon={faSearch} fixedWidth />;

const LocationsSearchBar = () => {

  /* 'aria-autocomplete' should be set to none because it is not a valid label for Role 'textbox' */
  const refInput = useRef(null);
  useEffect(() => {
    if (refInput.current) {
      const inputElement :HTMLInputElement = refInput.current.querySelector('input');
      if (inputElement && inputElement.hasAttribute('aria-autocomplete')) {
        inputElement.removeAttribute('aria-autocomplete');
      }
    }
  }, []);

  const getText = useSelector(getTextFnFromState);
  const currentLocationText = getText(LABELS.CURRENT_LOCATION);
  const getGeoOptionsRS = useSelector((store) => store.getIn([LOCATIONS, GET_GEO_OPTIONS, REQUEST_STATE]));
  const currentPosition = useSelector((store) => store.getIn([LOCATIONS, CURRENT_POSITION]));
  const storedOption = useSelector((store) => store.getIn([LOCATIONS, SELECTED_OPTION]));

  let selectedOption = storedOption;
  if (Map.isMap(storedOption)) {
    selectedOption = storedOption.toJS();
  }

  const options = useSelector((store) => store.getIn([LOCATIONS, 'options', 'data']));
  const dispatch = useDispatch();

  const [address, setAddress] = useState();

  const fetchGeoOptions = useCallback(() => {
    if (isNonEmptyString(address)) {
      dispatch(getGeoOptions({ address, currentPosition }));
    }
  }, [dispatch, address, currentPosition]);

  useTimeout(fetchGeoOptions, 300);

  const isFetchingOptions = isPending(getGeoOptionsRS);

  const filterOption = () => true;

  const handleChange = (payload) => {
    const hasValues = isPlainObject(payload);

    if (hasValues) {

      if (payload.value === currentLocationText) {
        dispatch(loadCurrentPosition());
      }
      else {
        dispatch(geocodePlace(payload));
      }
    }
    dispatch(selectLocationOption(payload));
  };

  const optionsWithMyLocation = options.toJS();
  optionsWithMyLocation.push({
    options: [
      { label: currentLocationText, value: currentLocationText }
    ]
  });

  let value = null;
  if (selectedOption) {
    const label = isImmutable(selectedOption) ? selectedOption.get('label') : selectedOption.label;
    if (label) {
      value = selectedOption;
    }
  }

  return (
    <Wrapper ref={refInput}>
      <Select
          aria-label="address"
          components={{ GroupHeading }}
          filterOption={filterOption}
          hideDropdownIcon
          inputIcon={SearchIcon}
          inputId="address"
          inputValue={address}
          isClearable
          isLoading={isFetchingOptions}
          onChange={handleChange}
          onInputChange={setAddress}
          options={optionsWithMyLocation}
          placeholder={getText(LABELS.ENTER_NAME_ADDRESS_ZIP)}
          theme={getTheme}
          value={value} />
    </Wrapper>
  );
};

export default LocationsSearchBar;
