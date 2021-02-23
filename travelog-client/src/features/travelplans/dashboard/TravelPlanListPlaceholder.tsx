import React, { Fragment } from 'react'
import { Placeholder, Segment, Button } from 'semantic-ui-react';

export const TravelPlanListPlaceholder = () => {
    return (
        <Fragment>
          <Placeholder fluid>
            <Segment.Group>
              <Segment style={{ minHeight: 110 }}>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
              <Segment>
                <Placeholder>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              </Segment>
              <Segment secondary style={{ minHeight: 70 }} />
              <Segment clearing>
                <Button disabled color="blue" floated="right" content="View" />
              </Segment>
            </Segment.Group>
          </Placeholder>
        </Fragment>
      );
}
