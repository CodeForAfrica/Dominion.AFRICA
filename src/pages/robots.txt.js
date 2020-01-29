import config from '../config';

function Robots() {}

Robots.propTypes = {};

Robots.getInitialProps = async ({ req, res }) => {
  const host =
    (req && (req.headers['x-forwarded-host'] || req.headers.host)) || '';
  const { robots } = config;
  const isDevHost = robots.devHosts.reduce(
    (isDev, devHost) => isDev || host.endsWith(devHost),
    false
  );
  const txt = isDevHost ? robots.dev : robots.prod;
  res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  res.write(txt.trim());
  res.end();
};

export default Robots;
