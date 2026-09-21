import {
  Dimensions,
  PixelRatio,
} from "react-native";

const {
  width,
  height,
} = Dimensions.get("window");

/* BASE DEVICE */
const baseWidth = 390;
const baseHeight = 844;

/* WIDTH SCALE */
export const scale = (
  size: number
) => {

  return (
    width / baseWidth
  ) * size;
};

/* HEIGHT SCALE */
export const verticalScale = (
  size: number
) => {

  return (
    height / baseHeight
  ) * size;
};

/* MODERATE SCALE */
export const moderateScale = (

  size: number,

  factor = 0.5
) => {

  return (
    size +

    (
      scale(size) - size
    ) * factor
  );
};

/* FONT NORMALIZER */
export const normalize = (
  size: number
) => {

  const newSize =
    moderateScale(size);

  return Math.round(
    PixelRatio.roundToNearestPixel(
      newSize
    )
  );
};