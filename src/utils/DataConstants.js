import { PROPERTY_TYPES } from './constants/DataModelConstants';

/* Form Types */
export const FORM_TYPE = {
};

/* Consumer Constants */

export const GENDERS = {
  FEMALE: 'Female',
  MALE: 'Male',
  NONBINARY: 'Non-Binary'
};

export const RACES = {
  AMERICAN_INDIAN: 'American Indian or Alaska Native',
  ASIAN: 'Asian',
  BLACK: 'Black or African American',
  HISPANIC: 'Hispanic or Latino',
  NATIVE_HAWAIIAN: 'Native Hawaiian or Other Pacific Islander',
  WHITE: 'White',
  OTHER: 'Other'
};

export const VIOLENCE_TARGET_PORTLAND = {
  POLICE: 'Police',
  FAMILY: 'Family',
  SO: 'Significant Other',
  OTHER: 'Other'
};

export const MILITARY_STATUS = {
  ACTIVE: 'Active Duty',
  VETERAN: 'Veteran',
  N_A: 'N/A'
};

export const SUBSTANCES = {
  DRUGS: 'Drugs',
  ALCOHOL: 'Alcohol',
  BOTH: 'Both',
  N_A: 'N/A'
};

export const SELF_DIAGNOSIS = {
  BIPOLAR: 'Bipolar',
  DEPRESSION: 'Depression',
  PTSD: 'PTSD',
  SCHIZOPHRENIA: 'Schizophrenia',
  DEMENTIA: 'Dementia',
  DEVELOPMENTAL: 'Developmental Disabilities / Autism',
  OTHER: 'Other'
};

export const BEHAVIORS = {
  DISORIENTATION: 'Disorientation / Confusion',
  ABNORMAL_BEHAVIOR: 'Abnormal behavior / appearance (neglect of self-care)',
  HALLUCINATING: 'Hearing voices / hallucinating',
  ANXIOUS: 'Anxious / Excited / Agitated',
  DEPRESSED: 'Depressed mood',
  PARANOID: 'Paranoid or suspicious',
  SELF_HARM: 'Self-harm',
  THREATENING: 'Threatening / violent towards others',
  OTHER: 'Other'
};

export const EMOTIONAL_STATES = {
  ANGRY: 'Angry',
  AFRAID: 'Afraid',
  APOLOGETIC: 'Apologetic',
  CALM: 'Calm',
  CRYING: 'Crying',
  FEARFUL: 'Fearful',
  NERVOUS: 'Nervous',
  OTHER: 'Other'
};

export const INJURIES = {
  ABRASIONS: 'Abrasions',
  BRUISES: 'Bruises',
  COMPLAINTS_OF_PAIN: 'Complaints of Pain',
  CONCUSSION: 'Concussion',
  FRACTURES: 'Fractures',
  OTHER: 'Other'
};

export const SUICIDAL_ACTIONS = {
  THOUGHTS: 'Thoughts',
  THREAT: 'Threat',
  ATTEMPT: 'Attempt',
  COMPLETED: 'Completed'
};

export const SUICIDE_METHODS = {
  ALCOHOL: 'Alcohol',
  KNIFE: 'Knife/Cutting Tool',
  FIREARM: 'Firearm',
  NARCOTICS: 'Narcotics (Prescription or Illicit)',
  OTHER: 'Other'
};

export const PHOTOS_TAKEN = {
  INJURIES: 'Injuries',
  PROPERTY_DAMAGE: 'Property Damage/Crime Scene'
};

/* Disposition Constants */

export const DEESCALATION_TECHNIQUES = {
  VERBALIZATION: 'Verbalization',
  HANDCUFFS: 'Handcuffs',
  LEG_RESTRAINTS: 'Leg Restraints',
  TASER: 'Taser',
  ARREST_CONTROL: 'Arrest Control (Hands/feet)',
  N_A: 'N/A',
  OTHER: 'Other'
};

export const DISPOSITIONS = {
  ARREST: 'Arrest',
  EP: 'EP',
  VOLUNTARY_ER: 'Voluntary ER Intake',
  BCRI: 'BCRI',
  INFO_AND_REFERRAL: 'Information and Referral',
  LEAD: 'LEAD',
  CONTACTED_PROVIDER: 'Contacted or referred to current treatment provider',
  CRIMINAL_CITATION: 'Criminal Citation',
  CIVIL_CITATION: 'Civil Citation'
};

export const DISPOSITIONS_PORTLAND = {
  REFERRED_TO_BHU: 'Referred to BHU',
  ARREST: 'Arrest',
  DIVERTED_FROM_ARREST: 'Diverted from Arrest',
  RESISTED_SUPPORT: 'Resisted or Refused Supports'
};

export const RESOURCES = {
  CIT: 'CIT Officer',
  CRT: 'CRT Unit',
  ESU: 'ESU',
  SWAT: 'SWAT',
  NEGOTIATION: 'Negotiation Team',
  HOMELESS_OUTREACH: 'Homeless Outreach'
};

export const RESOURCES_PORTLAND = {
  BHU: 'Behavioral Health Unit',
  VOLUNTARY: 'Voluntary Transport',
  INVOLUNTARY: 'Involuntary Transport'
};

export const VOLUNTARY_ACTION_INDICATOR = {
  VOLUNTARY: 'Voluntary',
  INVOLUNTARY: 'Involuntary'
};

export const TRANSPORTING_AGENCIES = {
  POLICE: 'Police',
  MEDCU: 'Medcu'
};

/* Officer Constants */

export const CERTIFICATIONS = {
  CRT: 'CRT Unit',
  BEST: 'BEST',
  CIT: 'CIT',
  N_A: 'N/A'
};

export const CERTIFICATIONS_PORTLAND = {
  CIT: 'CIT'
};

export const DISPATCH_REASONS = {
  EP: 'Emergency Petition',
  ON_VIEW: 'On View',
  DESTRUCTION_OF_PROPERTY: 'Destruction of Property',
  SUICIDAL: 'Suicidal Person',
  TRESPASSING: 'Trespassing',
  ASSAULT: 'Assault (non-sexual)',
  SEXUAL_ASSAULT: 'Sexual offense/assault',
  OTHER: 'Other'
};

export const CRIME_TYPE = {
  EP: 'Emergency Petition',
  SUICIDAL: 'Suicide Attempt',
  OTHER: 'Other'
};

export const DRUG_TYPES = {
  MARIJUANA: 'Marijuana',
  COCAINE: 'Cocaine',
  CRACK: 'Crack cocaine',
  PILLS: 'Pills',
  K2: 'K2',
  METH: 'Methamphetamines',
  METHADONE: 'Methadone',
  HEROIN: 'Heroin',
  OTHER: 'Other'
};

export const CONTENT_TYPE = 'content-type';

export const DAYS_OF_WEEK = {
  SUNDAY: 'Sun',
  MONDAY: 'Mon',
  TUESDAY: 'Tue',
  WEDNESDAY: 'Wed',
  THURSDAY: 'Thu',
  FRIDAY: 'Fri',
  SATURDAY: 'Sat'
};

export const DAY_PTS = {
  [DAYS_OF_WEEK.SUNDAY]: [PROPERTY_TYPES.SUNDAY_START, PROPERTY_TYPES.SUNDAY_END],
  [DAYS_OF_WEEK.MONDAY]: [PROPERTY_TYPES.MONDAY_START, PROPERTY_TYPES.MONDAY_END],
  [DAYS_OF_WEEK.TUESDAY]: [PROPERTY_TYPES.TUESDAY_START, PROPERTY_TYPES.TUESDAY_END],
  [DAYS_OF_WEEK.WEDNESDAY]: [PROPERTY_TYPES.WEDNESDAY_START, PROPERTY_TYPES.WEDNESDAY_END],
  [DAYS_OF_WEEK.THURSDAY]: [PROPERTY_TYPES.THURSDAY_START, PROPERTY_TYPES.THURSDAY_END],
  [DAYS_OF_WEEK.FRIDAY]: [PROPERTY_TYPES.FRIDAY_START, PROPERTY_TYPES.FRIDAY_END],
  [DAYS_OF_WEEK.SATURDAY]: [PROPERTY_TYPES.SATURDAY_START, PROPERTY_TYPES.SATURDAY_END]
};

export const FACILITY_TYPES = {
  FAMILY_HOME: 'Family Home',
  DAY_CARE_CENTER: 'Day Care Center'
};

export const FACILITY_STATUSES = {
  CLOSED: 'Closed',
  OPEN: 'Open',
};

export const LICENSE_TYPES = {
  LICENSED: 'Licensed'
};

export const CLIENTS_SERVED = {
  CHILDREN: 'Children',
  INFANTS: 'Infants',
  TODDLERS: 'Toddlers',
  DEVELOPMENTALLY_DISABLED: 'Developmentally Disabled'
};

export const FACILITY_NAME_MASKED = 'Small Family Home';

export const { CLOSED } = FACILITY_STATUSES;
