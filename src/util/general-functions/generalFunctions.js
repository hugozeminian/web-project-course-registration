export const getFormattedDate = () => {

    const currentDate = new Date();

    const parameters = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    return  currentDate.toLocaleString(undefined, parameters);

}