import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { Button, Form } from "semantic-ui-react";
import { TextInput } from "../../../app/common/form/TextInput";
import { DateInput } from "../../../app/common/form/DateInput";
import { useAppDispatch, useAppSelector } from "../../../app/customHooks";
import {
  closeModal,
  loadTravelPlanActivities,
  submitActivityEdit,
} from "./detailSlice";
import { ITravelPlanActivity } from "../../../app/common/interfaces/ITravelPlanActivity";

interface IProps 
{
  initialActivity: ITravelPlanActivity | null;
  travelPlanId: string;
}

export const ActivityForm: React.FC<IProps> = ({initialActivity, travelPlanId}) => {

  const dispatch = useAppDispatch();
  const {editingActivity} = useAppSelector((state: RootState) => state.detailReducer);

  function handleActivitySubmit(formActivity: any) {
    //before sending to API, turn the dates back to ISO strings as we expect it from the API
    //since they were transformed on the UI to show localized date
    formActivity.startTime = new Date(formActivity.startTime).toISOString();
    formActivity.endTime = new Date(formActivity.endTime).toISOString();

    dispatch(submitActivityEdit(formActivity)).then(() => {
      dispatch(loadTravelPlanActivities(travelPlanId));
    });
  }
  return (
    <Fragment>
      <FinalForm
        initialValues={initialActivity}
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
              viewMode="time"
              label="Start Time"
            />
            <FinalField
              name="endTime"
              placeholder="End Time"
              component={DateInput}
              viewMode="time"
              label="End Time"
            />
            <Button content="Close" onClick={() => dispatch(closeModal())} />
            <Button
              floated="right"
              positive
              type="submit"
              content="Save"
              disabled={pristine}
              loading={editingActivity}
            />
          </Form>
        )}
      ></FinalForm>
    </Fragment>
  );
};
