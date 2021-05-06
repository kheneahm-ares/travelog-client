import { Link } from "react-router-dom";
import { AuthService } from "../../app/auth/AuthServices";
import { Fragment, useState } from "react";
import { Button, Container, Header, Segment } from "semantic-ui-react";

export const HomePage = () => {
  const user = AuthService.getAppUser();
  const [loading, setLoading] = useState({
    signingIn: false,
    registering: false,
  });

  function handleSignIn() {
    setLoading({ signingIn: true, registering: false });
    AuthService.signInRedirect();
  }
  function handleRegister() {
    setLoading({ signingIn: false, registering: true });
    AuthService.registerUser();
  }
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          Travelog
        </Header>
        {user != null ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.userName}`}
            />
            <Button as={Link} to="/travelplans" size="huge" inverted>
              Go To Dashboard
            </Button>
          </Fragment>
        ) : (
          // <iframe onLoad={() => AuthService.signInRedirect()} title="asdf" />
          <Fragment>
            <Header as="h2" inverted content={`Welcome to Travelog`} />
            <Button
              onClick={handleSignIn}
              size="huge"
              inverted
              loading={loading.signingIn}
              disabled={loading.registering || loading.signingIn}
            >
              Login
            </Button>
            <Button
              size="huge"
              inverted
              onClick={handleRegister}
              loading={loading.registering}
              disabled={loading.registering || loading.signingIn}
            >
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};
