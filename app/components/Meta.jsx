import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

const Meta = () => (
  <Helmet
    htmlAttributes={{'lang': 'en', 'amp': undefined}}
    title="React Webpack Node" meta={config.meta}
    link={config.link}
  />
);


ReactDOMServer.renderToString(<Meta />);
const header = Helmet.rewind();

export default header;
