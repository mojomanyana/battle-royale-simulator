export default class Logger {
  static log = (text) => {
    if (!process.env.DISABLELOGS) {
      console.log(text);
    }
  }
}
