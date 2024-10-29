// typographyVariants.js
export const createResponsiveTypography = (theme) => ({
  ...theme,
  typography : {
    ...theme.typography,
  fontFamily: '"Open Sans", "Roboto", sans-serif',
  fontStyle: "normal",
  light: {
    fontFamily: '"Open Sans", "Roboto", sans-serif',
    fontSize: "0.9rem",
    fontWeight: 100,
  },

  h1: {
    fontWeight: 700,
    fontSize: "2.25rem", //36px
    lineHeight: "2.75rem",
  },
  h2: {
    fontWeight: 700,
    fontSize: "1.875rem", //30px
    lineHeight: "2.25rem",
    // Sample Responsive Mobile Values
    [theme.breakpoints.down("md")]: {
      fontSize: "1.625rem", //26px
      lineHeight: "1.875rem",
    },
  },
  h3: {
    fontWeight: 600,
    fontSize: "1.5rem", //
    lineHeight: "2.25rem",
  },
  h4: {
    fontWeight: 700,
    fontSize: "1.625rem", //26px
    lineHeight: "1.875rem",
  },
  h5: {
    fontWeight: 700,
    fontSize: "1.25rem", //20px
    lineHeight: "1.75rem",
  },
  h6: {
    fontWeight: 700,
    fontSize: "1.125rem", //18px
    lineHeight: "1.75rem",
  },
  title1: {
    fontWeight: 400,
    fontSize: "1rem", //16px
    lineHeight: "1.25rem",
  },
  title2: {
    fontWeight: 700,
    fontSize: "1rem", //16px
    lineHeight: "1.25rem",
  },
  title3: {
    fontWeight: 600,
    fontSize: "1rem", //16px
    lineHeight: "1.25rem",
  },
  subtitle: {
    fontWeight: 600,
    fontSize: "0.875rem", //14px
    lineHeight: "1.25rem",
  },
  subtitle2: {
    fontWeight: 700,
    fontSize: "0.875rem", //14px
    lineHeight: "1.25rem",
  },
  body1: {
    fontWeight: 400,
    fontSize: "0.875rem", //14px
    lineHeight: "1.25rem",
  },
  body2: {
    fontWeight: 600,
    fontSize: "0.875rem", //14px
    lineHeight: "1.25rem",
  },
  smallText1: {
    fontWeight: 400,
    fontSize: "0.813rem", //13px
    lineHeight: "1.125rem",
  },
  smallText2: {
    fontWeight: 600,
    fontSize: "0.813rem", //13px
    lineHeight: "1.125rem",
  },
  subText1: {
    fontWeight: 400,
    fontSize: "0.75rem", //12px
    lineHeight: "1.125rem",
  },
  subText2: {
    fontWeight: 600,
    fontSize: "0.75rem", //12px
    lineHeight: "1.125rem",
  },
  subText3: {
    fontWeight: 700,
    fontSize: "0.75rem", //12px
    lineHeight: "1.125rem",
  },
  button: {
    fontSize: "0.75rem",
    fontWeight: 600,
    lineHeight: "1.25rem",
    textTransform: "none",
  }}
});
