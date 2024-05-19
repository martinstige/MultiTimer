export const getDate = (time: number) => {
  const date = new Date();
  date.setTime(time);
  return date;
};

export const toTimeString = (time: Date, includeHundreads = true) => {
  const currentHours = (time.getHours() - 1)
    .toString()
    .padStart(2, "0")
    .substring(0, 2);
  const currentMinutes = time
    .getMinutes()
    .toString()
    .padStart(2, "0")
    .substring(0, 2);
  const currentSeconds = time
    .getSeconds()
    .toString()
    .padStart(2, "0")
    .substring(0, 2);
  const currentMilliseconds = time
    .getMilliseconds()
    .toString()
    .padStart(2, "0")
    .substring(0, 2);

  const includeHours = time.getHours() > 1;

  return `${
    includeHours ? currentHours + ":" : ""
  }${currentMinutes}:${currentSeconds}${
    includeHundreads ? `.${currentMilliseconds}` : ""
  }`;
};
