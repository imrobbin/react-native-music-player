export enum MonthsEnum {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  July,
  Aug,
  Sept,
  Oct,
  Nov,
  Dec,
}

const getDateTime = (timeStamp: string): string => {
  const date = String(new Date(timeStamp).getDate()).padStart(2, '0');
  const month = MonthsEnum[new Date(timeStamp).getMonth()];
  const year = new Date(timeStamp).getFullYear();

  return `${date} ${month} ${year}`;
};

export default getDateTime;
