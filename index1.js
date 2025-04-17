const { Transform } = require('stream');

const customStream = new Transform({
  transform(chunk, encoding, callback) {
    const input = chunk.toString();
    const transformed = input
      .split('')
      .map(char => {
        if (char.match(/[a-zа-яієґ]/i)) {
          return char.toUpperCase();
        }
        return char;
      })
      .join('');

    console.log('Результат:', transformed);
    callback(null, transformed);
  }
});

process.stdin.pipe(customStream);