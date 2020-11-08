import ErrorWithCode from './ErrorWithCode'

export default class ErrorSeverUnreachable extends ErrorWithCode {
  constructor () {
    const message = 'The server cannot be reach.'
    super(message, 'SERVER.UNREACHABLE')
  }
}
