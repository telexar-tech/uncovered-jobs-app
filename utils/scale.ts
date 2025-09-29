import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number) => Math.round(shortDimension / guidelineBaseWidth * size);
export const verticalScale = (size: number) => Math.round(longDimension / guidelineBaseHeight * size);
export const moderateScale = (size: number, factor = 0.5) => Math.round(size + (scale(size) - size) * factor);
export const moderateVerticalScale = (size: number, factor = 0.5) => Math.round(size + (verticalScale(size) - size) * factor);