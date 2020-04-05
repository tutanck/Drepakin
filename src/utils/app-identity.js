import { createMuiTheme } from '@material-ui/core/styles';
import { amber, green, blue, orange, red } from '@material-ui/core/colors';

/* https://material-ui.com/customization/theming/ */

const theme = createMuiTheme({
  palette: {
    /* Customize here to define app identity */
  },
  status: {
    info: blue[400],
    error: red[800],
    danger: orange[500],
    success: green[600],
    warning: amber[700],
  },
  rate: {
    bad: red[500],
    medium: orange[500],
    good: green[500],
  },
});

export { theme };
