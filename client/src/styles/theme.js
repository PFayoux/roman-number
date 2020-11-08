import { createMuiTheme } from '@material-ui/core/styles'

export default function theme (type) {
  return createMuiTheme(
    {
      palette: {
        common: {
          black: '#00A', white: '#ffA'
        },
        background: {
          paper: 'rgba(217, 235, 254, 0.86)',
          default: '#fafafa'
        },
        primary: {
          light: 'rgba(131, 190, 255, 1)',
          main: 'rgba(128, 153, 255, 1)',
          dark: 'rgba(48, 117, 233, 1)',
          contrastText: '#fff'
        },
        secondary:
          {
            light: 'rgba(255, 230, 93, 0.95)',
            main: 'rgba(255, 219, 34, 0.95)',
            dark: 'rgba(245, 166, 35, 1)',
            contrastText: 'rgba(68, 68, 68, 1)'
          },
        error: {
          light: '#e57373',
          main: '#f44336',
          dark: '#d32f2f',
          contrastText: '#fff'
        },
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.54)',
          disabled: 'rgba(0, 0, 0, 0.38)',
          hint: 'rgba(0, 0, 0, 0.38)'
        },
        type: type
      }
    }
  )
}
