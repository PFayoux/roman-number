import { arabToRomanController } from './controler/mainControler'

export default () => [
  {
    route: '/arab_to_roman',
    method: 'post',
    middleware: [],
    controller: arabToRomanController
  },
];