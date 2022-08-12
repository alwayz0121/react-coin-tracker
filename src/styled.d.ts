// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  //우리가 사용할 테마
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    subBgColor: string;
    accentColor: string;
  }
}
