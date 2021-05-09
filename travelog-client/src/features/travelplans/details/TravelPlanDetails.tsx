import React, { Fragment, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Button, Container, Divider } from "semantic-ui-react";
import { TravelPlanDetailsHome } from "./home/TravelPlanDetailsHome";
import { TravelPlanAnnouncements } from "./announcements/TravelPlanAnnouncements";
import { TravenPlanNews } from "./news/TravenPlanNews";
import { useSelector } from "react-redux";
import { AuthService } from "../../../app/auth/AuthServices";
import { useAppDispatch } from "../../../app/customHooks";
import { RootState } from "../../../app/store";
import { loadTravelPlan } from "./detailSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface IProps extends RouteComponentProps<{ id: string }> {}

enum DetailViewsEnum {
  Home,
  Announcements,
  News,
}

export const TravelPlanDetails: React.FC<IProps> = ({ match }) => {
  const travelPlanId = match.params.id;
  const [view, setView] = useState<DetailViewsEnum>(DetailViewsEnum.Home);

  const dispatch = useAppDispatch();
  const { travelPlan, loadingPlan } = useSelector(
    (state: RootState) => state.detailReducer
  );
  const userId = AuthService.getAppUser()?.userId;

  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadTravelPlan(travelPlanId)).then((actionResult: any) => {
      setLoading(false);
      setIsHost(travelPlan?.createdById === userId);
    });

    return () => {
      setLoading(true);
    };
  }, [dispatch, travelPlan?.createdById, travelPlanId, userId]);

  function handleOnClick(viewToOpen: DetailViewsEnum) {
    setView(viewToOpen);
  }

  if (loadingPlan || loading) {
    return <LoadingComponent content="Loading Invitations" />;
  } else {
    return (
      <Fragment>
        <Container style={{ textAlign: "center" }}>
          <Button
            inverted
            color="blue"
            onClick={() => handleOnClick(DetailViewsEnum.Home)}
          >
            Details
          </Button>
          <Button
            inverted
            color="blue"
            onClick={() => handleOnClick(DetailViewsEnum.Announcements)}
          >
            Announcements
          </Button>
          <Button
            inverted
            color="blue"
            onClick={() => handleOnClick(DetailViewsEnum.News)}
          >
            News
          </Button>
        </Container>
        <Divider />
        <Container>
          {view === DetailViewsEnum.Home && (
            <TravelPlanDetailsHome isHost={isHost} />
          )}
          {view === DetailViewsEnum.Announcements && (
            <TravelPlanAnnouncements isHost={isHost} travelPlanID={travelPlanId}/>
          )}
          {view === DetailViewsEnum.News && <TravenPlanNews />}
        </Container>
      </Fragment>
    );
  }
};
