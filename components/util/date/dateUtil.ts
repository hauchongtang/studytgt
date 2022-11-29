import moment from "moment";

const dateObj = new Date();
const dayOfWeek = dateObj.getDay();
const dayOfMonth = dateObj.getDate();
const monthOfYear = dateObj.getMonth();
const currentYear = dateObj.getFullYear();

const oneWeekAgo = dateObj.getDate() - 7;
const oneMonthAgo = dateObj.getDate() - 30;
const oneYearAgo = dateObj.getDate() - 365;

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export const currentDateString = `${dayOfMonth} ${monthNames[monthOfYear]} ${currentYear}`;
export const dayOfWeekString = `${dayNames[dayOfWeek]}`

export const generateDateString = (dateTime: string) => {
  const date = new Date();
  const dayOfMonth = date.getDate();
  const monthOfYear = date.getMonth();
  const currentYear = date.getFullYear();

  return `${dayOfMonth} ${monthNames[monthOfYear]} ${currentYear}`
}

export const generateTimeAgo = (dateTime: string) => {
  return moment(dateTime).fromNow();
}

export const isLessThanWeekAgo = (dateTime: string) => {
  return moment(dateTime).isSameOrAfter(new Date(oneWeekAgo));
}

export const isLessThanMonthAgo = (dateTime: string) => {
  return moment(dateTime).isSameOrAfter(new Date(oneMonthAgo));
}

export const isLessThanYearAgo = (dateTime: string) => {
  return moment(dateTime).isSameOrAfter(new Date(oneYearAgo));
}