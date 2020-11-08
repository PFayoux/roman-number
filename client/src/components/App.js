import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography, Button, Paper, TextField, FormHelperText } from '@material-ui/core/'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../styles/theme'
import strings from '../strings'

export default class App extends React.Component {
  constructor () {
    super()

    this.state = {
      isError: false,
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const value = event.target.value
    if (isNaN(value)) {
      this.setState({ isError: true, error: strings.fr.form.arab_numerals.not_a_number })
    } else if (value >= 5000) {
      this.setState({ isError: true, error: strings.fr.form.arab_numerals.number_too_big })
    } else {
      this.setState({ isError: false })
      this.props.submitArabToGetRoman(parseInt(value))
    }
  }

  render () {
    const { romanNb } = this.props
    const { isError, error } = this.state
    return (
      <ThemeProvider theme={theme('dark')}>
        <AppBar className='appBar' color='default' position='relative'>
          <Toolbar className='toolbar'>
            <Button className='toolbar-button' edge='start' color='inherit' aria-label='menu'>
              <Typography variant='h6'>
                {
                  strings.fr.title
                }
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <main className='main'>
          <Paper className='paper' color='background'>
            <Typography className='roman_numerals' align='center' color='primary' variant='h4'>
              {romanNb}
            </Typography>
            <div>
              <TextField
                className='arab_numerals'
                name='arab_numerals'
                label={strings.fr.form.arab_numerals.label}
                type='text'
                onChange={this.handleChange}
                error={isError}
                placeholder={strings.fr.form.arab_numerals.placeholder}
              />
              {isError &&
                <FormHelperText error={isError}>{error}</FormHelperText>}
            </div>
          </Paper>
        </main>
      </ThemeProvider>
    )
  }
}

App.defaultProps = {
  romanNb: ''
}

App.propTypes = {
  romanNb: PropTypes.string,
  submitArabToGetRoman: PropTypes.func.isRequired
}
