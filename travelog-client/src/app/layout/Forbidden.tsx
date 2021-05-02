import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="minus circle" />
        Oops - you do not have access to the requested resource.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/travelplans" primary>
          Return to Travel Plans
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default Forbidden;
