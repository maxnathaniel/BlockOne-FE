import { createGlobalStyle } from 'styles/styled-components';

// we need to create a proper style theme for light and dark theme
// it can be done easily through the setting of some defaults such as
/**
 * const default = {
 * lightTheme: {
 *  buttons: {
 *  color: '#FFF',
 *  background: '#FFF',
 *  },
 * }
 */
const GlobalStyle = createGlobalStyle<any>`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    margin: 0;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #app {
    background-color: #121212;
    min-height: 100%;
    min-width: 100%;
  }
  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .ui.modals > .modal > .header {
    background: #272F4D !important;
    border-bottom: 2px solid #005f7b !important;
    color: #FFF !important;
  }
  .ui.modals > .modal > .content {
    background: #272F4D !important;
    color: #FFF !important;
  }
  .ui.modals > .modal > .actions {
    background: ${props => props.darkTheme ? '#272F4D !important' : '#FFF !important'};
    color: #FFF !important;
  }
  .ui.modal .actions > .button {
    margin-left: 0 !important;
    margin-right: 0.7em !important;
  }
  .ui.fluid.input > input {
    height: 40px !important;
    border: 1px solid #005f7b !important;
    color: ${props => props.darkTheme ? '#FFF !important' : 'black' };
    padding: 10px !important;
  }
  .ui.fluid.input > input:: placeholder {
    padding: 5px;
    color: #FFF;
  }
  .ui.fluid.selection.dropdown {
    background: #272F4D !important;
    height: 40px !important;
    color: ${props => props.darkTheme ? '#FFF !important' : 'black' };
    padding: 10px !important;
    border: 1px solid #005f7b !important;
  }
  .ui.fluid.selection.dropdown {
    color: #FFF !important;
  }
  .ui.search.dropdown.active > input.search, .ui.search.dropdown.visible > input.search {
    color #FFF !important;
  }
  .ui.search.dropdown.active > input.search, .ui.search.dropdown.visible > input.search::selection {
    color #FFF !important;
  }
  .ui.selection.visible.dropdown>.text:not(.default) {
    color: #FFF !important;
  }
  .ui.dropdown .menu > .item:hover {
    background: #005f7b !important;
  }
  .ui.selection.dropdown .menu > .message {
    color #FFF !important;
  }
  .visible.menu.transition {
    // background: ${props => `${props.theme.backgroundColor} !important` };
    background: #272F4D !important;
  }
  .visible.menu.transition > .item {
    color: #FFF !important;
  }
  .ui.selection.active.dropdown .menu {
    border-color: #005f7b !important;
  }
  .visible.menu.transition > .selected.item {

  }
`;

export default GlobalStyle;