import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { Button, Form } from "semantic-ui-react";
import { TextInput } from "../../../app/common/form/TextInput";
import { DateInput } from "../../../app/common/form/DateInput";
import { useAppDispatch, useAppSelector } from "../../../app/customHooks";
import {
  closeModal,
  createActivity,
  loadTravelPlanActivities,
  submitActivityEdit,
} from "./detailSlice";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";
import { ITravelPlanActivityForm } from "../../../app/common/interfaces/ITravelPlanActivityForm";
import { ActivityFormValues } from "../../../app/common/classes/ActivityFormValues";

interface IProps {
  initialActivity: ITravelPlanActivity | null;
  travelPlanId: string;
}

export const ActivityForm: React.FC<IProps> = ({
  initialActivity,
  travelPlanId,
}) => {
  const dispatch = useAppDispatch();
  const { formLoading } = useAppSelector(
    (state: RootState) => state.detailReducer
  );

  const [activity, setActivity] = useState<ITravelPlanActivityForm>(
    new ActivityFormValues()
  );

  function handleActivitySubmit(formActivity: any) {
    //before sending to API, turn the dates back to ISO strings as we expect it from the API
    //since they were transformed on the UI to show localized date
    formActivity.startTime = new Date(formActivity.startTime).toISOString();
    formActivity.endTime = new Date(formActivity.endTime).toISOString();

    //if there was an initial, it was an edit
    if (initialActivity) {
      dispatch(submitActivityEdit(formActivity)).then(() => {
        dispatch(loadTravelPlanActivities(travelPlanId));
      });
    } else {
      formActivity.travelPlanId = travelPlanId;
      dispatch(createActivity(formActivity)).then(() => {
        dispatch(loadTravelPlanActivities(travelPlanId));
      });
    }
  }

  useEffect(() => {
    if (initialActivity) {
      setActivity(new ActivityFormValues(initialActivity));
    }
    return () => {
      setActivity(new ActivityFormValues());
    };
  }, [initialActivity]);
  return (
    <Fragment>
      <FinalForm
        initialValues={activity}
        onSubmit={(values) => handleActivitySubmit(values)}
        render={({ handleSubmit, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <FinalField name="name" placeholder="Name" component={TextInput} />
            <Form.Group>
              <FinalField
                name="category"
                placeholder="Category"
                component={TextInput}
              />
              <FinalField
                name="location"
                placeholder="Location"
                component={TextInput}
              />
            </Form.Group>
            <FinalField
              name="startTime"
              placeholder="Start Time"
              component={DateInput}
              time={true}
              date={true}
              label="Start Time"
            />
            <FinalField
              name="endTime"
              placeholder="End Time"
              component={DateInput}
              time={true}
              date={true}
              label="End Time"
            />
            <Button
              content="Close"
              disabled={formLoading}
              onClick={() => dispatch(closeModal())}
            />
            <Button
              floated="right"
              positive
              type="submit"
              content={initialActivity ? "Save" : "Create"}
              disabled={pristine}
              loading={formLoading}
            />
          </Form>
        )}
      ></FinalForm>
    </Fragment>
  );
};
