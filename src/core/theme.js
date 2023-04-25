import { DefaultTheme } from "react-native-paper";

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        text: "#000",
        primary: "#0C79F3",
        secondary: "#414757",
        error: "#f13a59"
    },
    fonts: {
        fontFamily: "Montserrat"
    }
}