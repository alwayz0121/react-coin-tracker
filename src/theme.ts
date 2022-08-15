//styled.d.ts에서 정의한 테마 속성과 동일해야 함!
import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  bgColor: "#F9F2ED",
  subBgColor: "#D8D2CB",
  textColor: "#524A4E",
  accentColor: "#398AB9",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#222831",
  subBgColor: "#393E46",
  textColor: "#EEEEEE",
  accentColor: "#9ADCFF",
};
