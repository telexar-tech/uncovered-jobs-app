import { Dimensions, Platform } from "react-native";
import { baseColors, darkThemeColors, lightThemeColors } from "./colors";

const { width } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const scale = (size: number) => (width / guidelineBaseWidth) * size;

// Typography
const typography = {
  fontFamily: {
    regular: Platform.select({ ios: "System", android: "Roboto" }),
    medium: Platform.select({ ios: "System", android: "Roboto-Medium" }),
    bold: Platform.select({ ios: "System", android: "Roboto-Bold" }),
  },
  size: {
    xs: scale(12),
    sm: scale(14),
    md: scale(16),
    lg: scale(20),
    xl: scale(24),
    xxl: scale(32),
  },
  lineHeight: {
    sm: scale(18),
    md: scale(22),
    lg: scale(28),
    xl: scale(34),
  },
};

// Borders
const borders = {
  radius: { sm: 4, md: 8, lg: 16, pill: 9999 },
  width: { hairline: 1, thin: 2, thick: 3 },
};

// Shadows
const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 6,
  },
};

export const lightTheme = {
  colors: {
    ...baseColors,
    background: lightThemeColors.background,
    text: {
      ...lightThemeColors.text,
      violet100: baseColors.violet[100],
      violet200: baseColors.violet[200],
      violet300: baseColors.violet[300],
      violet500: baseColors.violet[500],
    },
    border: {
      ...lightThemeColors.border
    }
  },
  typography,
  borders,
  shadows,
};

export const darkTheme = {
  colors: {
    ...baseColors,
    background: darkThemeColors.background,
    text: {
      ...darkThemeColors.text,
      violet100: baseColors.violet[100],
      violet200: baseColors.violet[200],
      violet300: baseColors.violet[300],
      violet500: baseColors.violet[500],
    },
    border: {
      ...darkThemeColors.border
    }
  },
  typography,
  borders,
  shadows,
};

export type ThemeType = typeof lightTheme;
