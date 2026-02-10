import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: { 
    global: { 
        html: { 
            fontSize: "16px"
        }
    }
  },
  fonts: {
    heading: "Satoshi, system-ui, sans-serif",
    body: "Satoshi, system-ui, sans-serif",
  },
  fontSizes: {
    lb: "0.875rem",
    bd: "1rem",
    t2: "1.125rem",
    t1: "1.266rem",
    h3: "1.424rem",
    h2: "1.602rem",
    h1: "1.802rem",
  },
});

export default theme;
