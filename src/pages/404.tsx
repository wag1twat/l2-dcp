import ErrorPage from 'src/client/entities/ErrorPage';

export default function Custom404() {
  return <ErrorPage code={404} message="Page Not Found" />;
}
