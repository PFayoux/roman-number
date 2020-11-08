import { eventArabToRomanController, queryArabToRomanController } from './controler/mainControler';
import eventsHandler from './middleware/cookie';

export default () => [
  {
    route: '/event_arab_to_roman',
    method: 'get',
    middleware: [],
    controller: eventArabToRomanController,
  },
  {
    route: '/query_arab_to_roman',
    method: 'post',
    middleware: [],
    controller: queryArabToRomanController,
  },
];
