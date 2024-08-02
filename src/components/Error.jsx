import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  const errorMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "An error has occurred while trying to fetch data";

  if (isRouteErrorResponse(error)) {
    return errorMessage;
  }

  return (
    <Container fluid="xl" className="px-3 py-5">
      <Alert variant="danger">{errorMessage}</Alert>
    </Container>
  );
};

export default Error;
