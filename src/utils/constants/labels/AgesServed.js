/*
 * @flow
 */
/* eslint-disable import/prefer-default-export */
import { CLIENTS_SERVED } from '../../DataConstants';
import { LABELS } from './General';

export const AGES_SERVED_LABELS :Object = {
  [CLIENTS_SERVED.CHILDREN]: LABELS.AGE_SCHOOL,
  [CLIENTS_SERVED.INFANTS]: LABELS.AGE_INFANT,
  [CLIENTS_SERVED.TODDLERS]: LABELS.AGE_TODDLER,
  [CLIENTS_SERVED.DEVELOPMENTALLY_DISABLED]: LABELS.DEVELOPMENTALLY_DISABLED
};
