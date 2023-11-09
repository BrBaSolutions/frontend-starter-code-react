export const getCurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
};

export const formatDate = (dateString: string): string => {
  const inputDate: Date = new Date(dateString);
    
    if (isNaN(inputDate.getTime())) {
        return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    return inputDate.toLocaleDateString(undefined, options);
}