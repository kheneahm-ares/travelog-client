import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { Button, Form } from "semantic-ui-react";
import { TextInput } from "../../../app/common/form/TextInput";
import { DateInput } from "../../../app/common/form/DateInput";
import { useAppDispatch } from "../../../app/customHooks";
import {
  closeModal,
  loadTravelPlanActivities,
  submitActivityEdit,
} from "./detailSlice";

export const ActivityForm = () => {
  const { selectedActivity } = useSelector(
    (state: RootState) => state.detailReducer
  );
  const dispatch = useAppDispatch();

  function handleActivitySubmit(values: any) {
    dispatch(submitActivityEdit(values!)).then(() => {
      dispatch(loadTravelPlanActivities(selectedActivity?.travelPlanId!));
    });
  }
  return (
    <Fragment>
      <FinalForm
        initialValues={selectedActivity!}
        onSubmit={(values: any) =>
          handleActivitySubmit(values)
        }
        render={({  handleSubmit}) => (
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
              label="Start Time"
            />
            <FinalField
              name="endTime"
              placeholder="End Time"
              component={DateInput}
              time={true}
              label="End Time"
            />
            <Button content="Close" onClick={() => dispatch(closeModal())} />
            <Button
              floated="right"
              positive
              type="submit"
              content="Save"
              // disabled={pristine}
            />
          </Form>
        )}
      ></FinalForm>
    </Fragment>
  );
};
