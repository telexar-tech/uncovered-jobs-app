export const baseColors = {
  brand: {
    primary: '#649F73',
    secondary: '#92BD9D',
  },

  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    grey: '#B3B3B3',
  },

  violet: {
    100: '#B3B2B6',
    200: '#8F8C93',
    300: '#5C5862',
    500: '#0B0515',
  },

  feedback: {
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
  },
};

export const lightThemeColors = {
  ...baseColors,
  background: {
    primary: baseColors.neutral.white,
    alt: '#F5F7FA',
    lightGreenAlt: '#EFF9F2'
  },
  text: {
    primary: baseColors.violet[500],
    secondary: baseColors.violet[300],
    muted: baseColors.violet[200],
    inverse: baseColors.neutral.black,
  },
  border: {
    primary: baseColors.violet[200],
    secondary: baseColors.violet[100],
    muted: '#E7E6E8'
  }
};

export const darkThemeColors = {
  ...baseColors,
  background: {
    primary: '#121212',
    alt: '#1E1E1E',
    lightGreenAlt: 'rgba(239, 249, 242, 0.2)'
  },
  text: {
    primary: baseColors.neutral.white,
    secondary: baseColors.violet[100],
    muted: baseColors.violet[200],
    inverse: baseColors.neutral.white,
  },
  border: {
    primary: baseColors.violet[200],
    secondary: baseColors.violet[100],
    muted: '#E7E6E8'
  }
};