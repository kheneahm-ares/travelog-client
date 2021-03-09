import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { Button, Form } from "semantic-ui-react";
import { TextInput } from "../../../../app/common/form/TextInput";
import { DateInput } from "../../../../app/common/form/DateInput";
import { useAppDispatch, useAppSelector } from "../../../../app/customHooks";
import {
  closeModal,
  createActivity,
  loadTravelPlanActivities,
  submitActivityEdit,
} from "./activitySlice";
import { ITravelPlanActivity } from "../../../../app/common/interfaces/ITravelPlanActivity";
import { ITravelPlanActivityForm } from "../../../../app/common/interfaces/ITravelPlanActivityForm";
import { ActivityFormValues } from "../../../../app/common/classes/ActivityFormValues";
import { LocationInput } from "../../../../app/common/form/LocationInput";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import {
  geocodeByAddress,
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

interface IProps {
  initialActivity: ITravelPlanActivity | null;
  travelPlanId: string;
}

export const ActivityForm: React.FC<IProps> = ({
  initialActivity,
  travelPlanId,
}) => {
  const dispatch = useAppDispatch();
  const { formSubmitting } = useAppSelector(
    (state: RootState) => state.activityReducer
  );

  const [activity, setActivity] = useState<ITravelPlanActivityForm>(
    new ActivityFormValues()
  );
  const [formLoading, setFormLoading] = useState(true);

  async function handleActivitySubmit(formActivity: any) {
    //before sending to API, turn the dates back to ISO strings as we expect it from the API
    //since they were transformed on the UI to show localized date
    formActivity.startTime = new Date(formActivity.startTime).toISOString();
    formActivity.endTime = new Date(formActivity.endTime).toISOString();

    var results = await geocodeByAddress(formActivity.location.address);
    formActivity.location = {
      ...formActivity.location,
      latitude: results[0].geometry.location.lat(),
      longitude: results[0].geometry.location.lng(),
    };

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
    setFormLoading(false);
    return () => {
      setActivity(new ActivityFormValues());
    };
  }, [initialActivity]);
  return (
    <Fragment>
      {formLoading ? (
        <LoadingComponent />
      ) : (
        //using subscription, tell FinalForm to only re-render as a whole if it's submitting
        //or if the pristine value is changed
        //tell its fields to only render when the field itself has been interacted with
        <FinalForm
          subscription={{ submitting: true, pristine: true }}
          initialValues={activity}
          onSubmit={(values) => handleActivitySubmit(values)}
          render={({ handleSubmit, pristine }) => (
            <Form onSubmit={handleSubmit}>
              <FinalField
                name="name"
                placeholder="Name"
                component={TextInput}
                subscription={{ touched: true, error: true, value: true }}
              />
              <FinalField
                name="category"
                placeholder="Category"
                component={TextInput}
                subscription={{ touched: true, error: true, value: true }}
              />
              <FinalField
                name="location.address"
                placeholder="Location"
                component={LocationInput}
                subscription={{ touched: true, error: true, value: true }}
              />
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
                disabled={formSubmitting}
                onClick={() => dispatch(closeModal())}
              />
              <Button
                floated="right"
                positive
                type="submit"
                content={initialActivity ? "Save" : "Create"}
                disabled={pristine}
                loading={formSubmitting}
              />
            </Form>
          )}
        ></FinalForm>
      )}
    </Fragment>
  );
};
