const path = require('path');

module.exports = {
  entry: './src/table.js',
  output: {
    filename: 'mytable.js',
    path: path.resolve(__dirname, 'public/javascripts/'),
    library: 'mytable'
  },
  externals: {
    jquery: 'jQuery'
  },
  mode: 'development'
};
