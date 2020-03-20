export const getTitleRegExp = content => {
  return /(?<=[tT][iI][tT][lL][eE].?:.).*/gi.exec(content);
};

export const getDateRegExp = content => {
  return /(?<=[Dd][Aa][Tt][Ee].?:.).*/gi.exec(content);
};

export const getCategoryRegExp = content => {
  return /(?<=[Cc][Aa][Tt][Ee][Gg][Oo][Rr].?:.).*/gi.exec(content);
};

export const removeExtension = filename => {
  return /.+(?=\.)/g.exec(filename);
};
