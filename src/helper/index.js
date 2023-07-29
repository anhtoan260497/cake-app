export const getImgUrl = (name) => {
  var images = require.context("../assets/img", false, /\.jpg$/);
  console.log(images("./" + name + ".jpg"))
  return images("./" + name + ".jpg");
};
