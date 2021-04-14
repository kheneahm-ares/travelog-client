import React, { Fragment, useState } from "react";
import { Button, Form, Label } from "semantic-ui-react";
import { APIServices } from "../../../../app/api/travelog/agent";
import { useAppDispatch } from "../../../../app/customHooks";
import { closeModal } from "../detailSlice";

interface IProps {
  travelPlanId: string;
}

export const InviteForm: React.FC<IProps> = ({ travelPlanId }) => {
  const dispatch = useAppDispatch();
  function handleFormClose() {
    dispatch(closeModal());
  }

  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleOnSubmit(event: any) {
    setLoading(true);

    try {
      const response = await APIServices.TravelPlanService.invite(
        username,
        travelPlanId
      );
      dispatch(closeModal());

      //toast here?
    } catch (exc) {
      console.log(exc.response);
      setErrorMessage(exc.response.data.message);
      setLoading(false);
    }
  }
  return (
    <Fragment>
      <Form onSubmit={handleOnSubmit}>
        <Form.Field required>
          <input
            onChange={(e: any) => setUsername(e.target.value)}
            placeholder="Traveler Username"
          />
        </Form.Field>
        <Form.Field>
          <label style={{ color: "red" }}>{errorMessage}</label>
        </Form.Field>

        <Button
          content="Close"
          // disabled={formSubmitting}
          onClick={handleFormClose}
        />
        <Button color="green" floated="right" type="Submit" loading={loading}>
          Send Invitation!
        </Button>
      </Form>
    </Fragment>
  );
};
