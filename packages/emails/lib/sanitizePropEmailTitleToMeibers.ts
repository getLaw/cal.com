export const sanitizePropEmailTitleToMeibers = (propsTitleRaw: string) => {
  
  // enthält (+492571258587)

  const matchPhone = propsTitleRaw.match(/([+])([0-9]{2}[0-9\s]+)/);

  const matchTermin =  propsTitleRaw.match(/\bTermin\b/gi);

  const matchLocation =  propsTitleRaw.match(/\In der Kanzlei\b/gi);


  console.log("propsTitleRaw RAW " + propsTitleRaw);

  let sanitizedTitle = propsTitleRaw;

  if (matchPhone) {
    console.log("SANITIZE PHONE propsTitleRaw");
    sanitizedTitle = sanitizePhone(propsTitleRaw);
  }

  if (matchTermin) {
    console.log("SANITIZE TERMIN propsTitleRaw");
    sanitizedTitle = sanitizeTermin(propsTitleRaw);
  }  

  if (matchLocation) {
    console.log("SANITIZE LOCATION propsTitleRaw");
    sanitizedTitle = sanitizeLocation(propsTitleRaw);
  }  

  return sanitizedTitle;
  
};

const sanitizePhone = (propsTitleRaw: string) => {
  const charsToReplace = /[;,"<>+():0-9]/g;

  return propsTitleRaw.replace(charsToReplace, "");
};

const sanitizeTermin = (propsTitleRaw: string) => {
  const charsToReplace = /\bTermin\b/gi;

  return propsTitleRaw.replace(charsToReplace, "");
};

const sanitizeLocation = (propsTitleRaw: string) => {
  const charsToReplace = /\(\bIn der Kanzlei\b\)/gi;

  return propsTitleRaw.replace(charsToReplace, "");
};
