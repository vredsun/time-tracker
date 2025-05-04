
const addZeroBefore = (someNumber: number): string => {
  return someNumber.toString().padStart(2, '0');
}

export const getHHMMSSfromSeconds = (timeDiff: number): string => {
  const hours = Math.floor(timeDiff / 3600);
  const minutes = Math.floor(timeDiff / 60 - hours)
  const seconds = timeDiff % 60;

  return [hours, minutes, seconds].map(addZeroBefore).join(':');
}