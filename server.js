import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

const app = express();

app.use(express.static('static'));
if (process.env.NODE_ENV !== 'production') {
  webpackConfig.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  const bundler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(bundler, { noInfo: true }));
  app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

app.get('/users', (req, res) => {
  res.json({
    username: 'pqv',
    password: '1234',
  });
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});
