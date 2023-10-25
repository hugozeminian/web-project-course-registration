export const getNextAvailableID = (existingIDs) => {
  let maxID = 0;

  if (existingIDs) {
      existingIDs.forEach((existingID) => {
          if (existingID.id > maxID) {
              maxID = existingID.id;
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