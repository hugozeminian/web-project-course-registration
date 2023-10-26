// export const getNextAvailableID = (existingIDs) => {
//   let maxID = 0;

//   if (existingIDs) {
//     existingIDs.forEach((existingID) => {
//       if (existingID.id > maxID) {
//         maxID = existingID.id;
//       }
//     });
//   }

//   return maxID + 1;
// }

export const getNextAvailableID = (existingIDs, idProperty = 'id') => {
  let maxID = 0;

  if (existingIDs) {
    existingIDs.forEach((existingID) => {
      if (existingID[idProperty] > maxID) {
        maxID = existingID[idProperty];
      }
    });
  }

  return maxID + 1;
}



export const setLocalStoreList = (storageName, dataCollection) => {
  let storageData = JSON.parse(localStorage.getItem(storageName));

  if (!storageData) {
    storageData = [];
  }

  let nextId = getNextAvailableID(storageData);
  dataCollection.id = nextId;
  dataCollection.forEach(data => {
    storageData.push(data);
  })

  localStorage.setItem(storageName, JSON.stringify(storageData));
}


export const getCurrentFormattedDateAndTime = () => {

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

  return currentDate.toLocaleString(undefined, parameters);

}


export const getFormatDate = (inputDate) => {
  const dateParts = inputDate.split('-');
  const year = dateParts[0];
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(inputDate));
  const day = String(parseInt(dateParts[2], 10)); // Remove leading zero

  return `${month} ${day}, ${year}`;
}


export const convertToAMPM = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);

  let period = "AM";
  let formattedHours = hours;
  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      formattedHours = hours - 12;
    }
  }

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
  return formattedTime;
}


export const capitalizeEachWord = (str) => {
  const words = str.split(' ');

  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(' ');
}
