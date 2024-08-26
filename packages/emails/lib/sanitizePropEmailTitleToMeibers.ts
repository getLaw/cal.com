export const sanitizePropEmailTitleToMeibers = (propsTitleRaw: string) => {
  
  // enthält (+492571258587)
  const match = propsTitleRaw.match(/([+])([0-9]{2}[0-9\s]+)/);

  console.log("propsTitleRaw RAW " + propsTitleRaw);

  if (match) {
    console.log("SANITIZE propsTitleRaw");
    return sanitize(propsTitleRaw);
  }

  return propsTitleRaw;
  
};

const sanitize = (propsTitleRaw: string) => {
  const charsToReplace = /[;,"<>+():0-9]/g;

  return propsTitleRaw.replace(charsToReplace, "").replace("/Termin/g", "");
};
