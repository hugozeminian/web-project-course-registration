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
  const day = String(parseInt(dateParts[2], 10));

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
  if (str == undefined) {
    return
  }
  const words = str.split(' ');

  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(' ');
}


export const getFormattedPhoneNumber = (countryCode, numericPhoneNumber) => {
  return `${countryCode} (${numericPhoneNumber.slice(0, 3)}) ${numericPhoneNumber.slice(3, 6)}-${numericPhoneNumber.slice(6)}`;
}

export const getFormattedDateFromDB = (timestamp) => {
  const dateObject = new Date(timestamp);
  const utcString = dateObject.toISOString();
  const year = utcString.slice(0, 4);
  const month = utcString.slice(5, 7);
  const day = utcString.slice(8, 10);
  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}


export const getFormattedDateToDB = (timestamp) => {
  const dateObject = new Date(timestamp);
  const utcString = dateObject.toISOString();
  const year = utcString.slice(0, 4);
  const month = utcString.slice(5, 7);
  const day = utcString.slice(8, 10);
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};


export const getFormattedMoney = (money) => {
  const formattedCurrency = `C$${money.toLocaleString('en-CA')}`;

  return formattedCurrency
}

export const getFormattedHoursFromDB = (hours) => {
  if (!hours) {
    return { initialTime: '', endTime: '' };
  }

  const [initialTime, endTime] = hours.split(' - ');

  const formatTo24Hour = (timeString) => {
    const [hour, minute, period] = timeString.match(/(\d+):(\d+) (\w+)/).slice(1);

    let hour24 = parseInt(hour, 10);
    if (period === 'PM' && hour24 !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour24 === 12) {
      hour24 = 0;
    }

    return `${hour24.toString().padStart(2, '0')}:${minute}`;
  };

  return {
    initialTime: formatTo24Hour(initialTime),
    endTime: formatTo24Hour(endTime),
  };
};


export const getFormattedHoursToDB = (initialTime24, endTime24) => {
  const formatTo12Hour = (timeString24) => {
    const [hour, minute] = timeString24.split(':');
    const hour24 = parseInt(hour, 10);
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 || 12; 

    return `${hour12}:${minute} ${period}`;
  };

  return {
    initialTime: formatTo12Hour(initialTime24),
    endTime: formatTo12Hour(endTime24),
  };
};
