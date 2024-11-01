// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    25: "#f0f5ff", // New lightest shade of blue
    50: "#e6ebff",
    100: "#ccdafe",
    200: "#99b7fd",
    300: "#6693fc",
    400: "#3390fb",
    500: "#0070fa",
    600: "#0048bc",
    700: "#00197d",
    800: "#00013f",
    900: "#000619",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      primary: colorTokens.primary,
      ...(mode === "dark"
        ? {
          primary: {
            dark: colorTokens.primary[200],
            main: colorTokens.primary[500],
            light: colorTokens.primary[800],
          },
          neutral: {
            dark: colorTokens.grey[100],
            main: colorTokens.grey[200],
            mediumMain: colorTokens.grey[300],
            medium: colorTokens.grey[400],
            light: colorTokens.grey[700],
          },
          background: {
            default: colorTokens.grey[900],
            alt: colorTokens.grey[800],
          },
        }
        : {
          primary: {
            dark: colorTokens.primary[800],
            main: colorTokens.primary[500],
            light: colorTokens.primary[25], // Use the new light shade in light mode
          },
          neutral: {
            dark: colorTokens.grey[1000],
            main: colorTokens.grey[700],
            mediumMain: colorTokens.grey[400],
            medium: colorTokens.grey[500],
            light: colorTokens.grey[50],
          },
          background: {
            default: colorTokens.grey[200],
            alt: colorTokens.grey[100],
          },
        }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
