const ISO_DATE_TIME_SEPARATOR = 'T';

export const getISOString = (date: Date | number): string => {
  return (new Date(date)).toISOString();
}

export const getDate = (date: Date | number): string => {
  const DATE_PART_INDEX = 0;

  return getISOString(date).split(ISO_DATE_TIME_SEPARATOR)[DATE_PART_INDEX];
}