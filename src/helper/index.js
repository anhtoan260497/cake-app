export const getImgUrl = (name) => {
  var images = require.context("../assets/img", false, /\.jpg$/);
  return images("./" + name + ".jpg");
};

export const roundNumber2Decimals = (number) => {
  return number.toFixed(2);
};
