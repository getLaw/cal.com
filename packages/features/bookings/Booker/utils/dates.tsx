import { TimeFormat } from "@calcom/lib/timeFormat";

interface EventFromToTime {
  date: string;
  duration: number | null;
  timeFormat: TimeFormat;
  timeZone: string;
  language: string;
}

interface EventFromTime {
  date: string;
  timeFormat: TimeFormat;
  timeZone: string;
  language: string;
}

export const formatEventFromTime = ({ date, timeFormat, timeZone, language }: EventFromTime) => {
  const startDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat(language, {
    timeZone,
    dateStyle: "full",
  }).format(startDate);

  const formattedTime = new Intl.DateTimeFormat(language, {
    timeZone,
    timeStyle: "short",
    hour12: timeFormat === TimeFormat.TWELVE_HOUR ? true : false,
  })
    .format(startDate)
    .toLowerCase();

  return { date: formattedDate, time: formattedTime };
};

export const formatEventFromToTime = ({
  date,
  duration,
  timeFormat,
  timeZone,
  language,
}: EventFromToTime) => {
  const startDate = new Date(date);
  const endDate = duration
    ? new Date(new Date(date).setMinutes(startDate.getMinutes() + duration))
    : startDate;
  // meibers
  const formattedDate = new Intl.DateTimeFormat(language, {
    timeZone,
    dateStyle: "long",
  }).formatRange(startDate, endDate);

  const formattedTime = new Intl.DateTimeFormat(language, {
    timeZone,
    timeStyle: "medium",
    hour12: timeFormat === TimeFormat.TWELVE_HOUR ? true : false,
  }).formatRange(startDate, endDate);
  const meibersFormatArr = formattedTime.split(/:/);
  const meibersFormatStr =
    `${meibersFormatArr[0]}:${meibersFormatArr[1]} Uhr bis ${meibersFormatArr[2].substr(-2, 2)}` +
    `:${meibersFormatArr[3]}` +
    " Uhr";
  //console.log(meibersFormatArr);
  //console.log(meibersFormatStr);

  //.replace(/\&thinsp;\ - &thinsp;/g, " bis ");
  // meibers
  // das war org und verursachte das kleien "uhr"
  //.toLowerCase();
  //15:00:00 – 15:30:00
  return { date: formattedDate, time: meibersFormatStr };
};

export const FromToTime = (props: EventFromToTime) => {
  const formatted = formatEventFromToTime(props);
  return (
    <>
      {formatted.date}
      <br />
      {formatted.time}
    </>
  );
};

export const FromTime = (props: EventFromTime) => {
  const formatted = formatEventFromTime(props);
  return (
    <>
      {formatted.date}, {formatted.time}
    </>
  );
};
