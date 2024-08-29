export const sanitizePropEmailTitleToMeibers = (propsTitleRaw: string) => {
  
  // enthält (+492571258587)

  const matchPhone = propsTitleRaw.match(/([+])([0-9]{2}[0-9\s]+)/);

  const matchTermin =  propsTitleRaw.match(/\bTermin\b/gi);

  const matchLocation =  propsTitleRaw.match(/\bIn der Kanzlei\b/gi);


  console.log("propsTitleRaw RAW " + propsTitleRaw);

  let sanitizedTitle = propsTitleRaw;

  if (matchPhone) {
    console.log("SANITIZE PHONE propsTitleRaw");
    sanitizedTitle = sanitizePhone(sanitizedTitle);
  }

  if (matchTermin) {
    console.log("SANITIZE TERMIN propsTitleRaw");
    sanitizedTitle = sanitizeTermin(sanitizedTitle);
  }  

  if (matchLocation) {
    console.log("SANITIZE LOCATION propsTitleRaw");
    sanitizedTitle = sanitizeLocation(sanitizedTitle);
  }  

  return sanitizedTitle;
  
};

const sanitizePhone = (titleRaw: string) => {
  const charsToReplace = /[;,"<>+():0-9]/g;

  return titleRaw.replace(charsToReplace, "");
};

const sanitizeTermin = (titleRaw: string) => {
  const charsToReplace = /\bTermin\b/gi;

  return titleRaw.replace(charsToReplace, "");
};

const sanitizeLocation = (titleRaw: string) => {
  const charsToReplace = /\bIn der Kanzlei\b/gi;

  return titleRaw.replace(charsToReplace, "").replace(/[()]/g,"");
};
