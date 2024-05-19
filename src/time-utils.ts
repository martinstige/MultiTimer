
export const getDate = (time: number) => {
    const date = new Date();
    date.setTime(time);
    return date;
  };

  export const toTimeString = (time: Date) => {
    const currentHours = (time.getHours() - 1).toString().padStart(2, "0");
    const currentMinutes = time.getMinutes().toString().padStart(2, "0");
    const currentSeconds = time.getSeconds().toString().padStart(2, "0");
    const currentMilliseconds = time.getMilliseconds().toString();

    return `${currentHours}:${currentMinutes}:${currentSeconds}`;
  };