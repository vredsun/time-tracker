
const addZeroBefore = (someNumber: number): string => {
  return someNumber.toString().padStart(2, '0');
}

export const getHHMMSSfromSeconds = (timeDiff: number): string => {
  const seconds = timeDiff % 60;
  const minutes = (timeDiff -  seconds) / 60 % 60;
  const hours = Math.floor(timeDiff / 3600);


  return [hours, minutes, seconds].map(addZeroBefore).join(':');
}
