module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'lit-css-loader',
            options: {
              specifier: 'lit',
            },
          },
        ],
      },
    ],
  },
};
