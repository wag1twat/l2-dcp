import ErrorPage from 'src/client/entities/ErrorPage';

export default function Custom500() {
  return <ErrorPage code={500} message="Server-side error occurred" />;
}
