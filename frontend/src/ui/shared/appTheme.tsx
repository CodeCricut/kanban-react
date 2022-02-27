import { createTheme } from "@mui/material/styles";

// Primary color: 2D5F73
// Red: F25260
// Med blue: 6BADC9
// Brown: C3AE8D
// Light blue: 8FCED6

export const lightTheme = createTheme({
    typography: {
        fontFamily: ["Source Sans Pro", "Roboto", " sans-serif"].join(","),
    },
    palette: {
        primary: {
            main: "#2d5f73",
            light: "#7BB2C8",
            dark: "#0969da",
            contrastText: "rgba(255,255,255,0.88)",
        },
        secondary: {
            main: "#F25260",
            contrastText: "rgba(255,255,255,0.88)",
        },
        info: {
            main: "#6badc9",
            light: "#88BDD3",
            contrastText: "rgba(255,255,255,0.88)",
        },
        success: {
            main: "#c3ae8d",
            contrastText: "rgba(255,255,255,0.88)",
        },
    },
});

export const darkTheme = createTheme({
    ...lightTheme,
    palette: {
        primary: {
            main: "#5a9fbb",
        },
    },
});
