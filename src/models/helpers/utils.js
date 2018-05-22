export default class Utils {
  static log = (text) => {
    if (!process.env.DISABLELOGS) {
      console.log(text);
    }
  }

  static rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
}
