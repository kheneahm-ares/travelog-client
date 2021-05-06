import React, { Fragment, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Button, Container, Divider } from "semantic-ui-react";
import { TravelPlanDetailsHome } from "./home/TravelPlanDetailsHome";
import { TravelPlanAnnouncements } from "./announcements/TravelPlanAnnouncements";
import { TravenPlanNews } from "./news/TravenPlanNews";

interface IProps extends RouteComponentProps<{ id: string }> {}

enum DetailViewsEnum {
  Home,
  Announcements,
  News,
}

export const TravelPlanDetails: React.FC<IProps> = ({ match }) => {
  const travelPlanId = match.params.id;
  const [view, setView] = useState<DetailViewsEnum>(DetailViewsEnum.Home);

  console.log("hello");

  function handleOnClick(viewToOpen: DetailViewsEnum) {
    setView(viewToOpen);
  }

  return (
    <Fragment>
      <Container style={{ textAlign: "center" }}>
        <Button
          color="twitter"
          toggle
          onClick={() => handleOnClick(DetailViewsEnum.Home)}
        >
          Details
        </Button>
        <Button
          color="twitter"
          onClick={() => handleOnClick(DetailViewsEnum.Announcements)}
        >
          Announcements
        </Button>
        <Button
          color="twitter"
          onClick={() => handleOnClick(DetailViewsEnum.News)}
        >
          News
        </Button>
      </Container>
      <Divider />
      <Container>
        {view === DetailViewsEnum.Home && (
          <TravelPlanDetailsHome travelPlanId={travelPlanId} />
        )}
        {view === DetailViewsEnum.Announcements && <TravelPlanAnnouncements />}
        {view === DetailViewsEnum.News && <TravenPlanNews />}
      </Container>
    </Fragment>
  );
};
