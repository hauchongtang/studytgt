const dateObj = new Date();
const dayOfWeek = dateObj.getDay();
const dayOfMonth = dateObj.getDate();
const monthOfYear = dateObj.getMonth();
const currentYear = dateObj.getFullYear();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export const currentDateString = `${dayOfMonth} ${monthNames[monthOfYear]} ${currentYear}`;
export const dayOfWeekString = `${dayNames[dayOfWeek]}`