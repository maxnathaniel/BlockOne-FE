import * as styledComponents from 'styled-components';

export interface IThemeInterface {
  backgroundColor: string;
  buttonsColor: string;
}

// export const theme = {
//   default: {
//     primary: '#121212',
//     componentBackground: '#121212',
//     componentBackgroundSecondary: '#fff',
//   },
// };

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;