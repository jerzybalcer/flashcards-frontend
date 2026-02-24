import { extendTheme, StyleFunctionProps, type ThemeConfig, theme as defaultTheme } from "@chakra-ui/react";

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
    lb: "0.875rem", // label      -> 14px
    bd: "1rem",     // body       -> 16px
    t2: "1.125rem", // title2     -> 18px
    t1: "1.266rem", // title1     -> 20.256px
    h3: "1.424rem", // headline3  -> 22.784px
    h2: "1.602rem", // headline2  -> 25.632px
    h1: "1.802rem", // headline1  -> 28.832px
  },
components: {
  Button: {
    variants: {
      ghost: () => ({
        "@media (hover: none)": {
          _hover: {
            bg: "inherit",
          },
        },
      }),

      solid: (props: StyleFunctionProps) => {
        return {
          "@media (hover: none)": {
            _hover: {
              bg: defaultTheme.components?.Button?.variants?.solid?.(props),
            },
          },
        };
      },

      outline: (props: StyleFunctionProps) => {
        return {
          "@media (hover: none)": {
            _hover: {
              bg: defaultTheme.components?.Button?.variants?.outline?.(props),
            },
          },
        };
      },

      link: (_: StyleFunctionProps) => {
        return {
          "@media (hover: none)": {
            _hover: {
              textDecoration: 'none',
            },
          },
        };
      },
    },
  },
}
});

export default theme;
