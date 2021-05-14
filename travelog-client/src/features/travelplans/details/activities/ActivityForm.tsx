import React, { Fragment, useEffect, useState } from "react";
import { RootState } from "../../../../app/store";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { Button, Form, Modal } from "semantic-ui-react";
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
import { geocodeByAddress } from "react-google-places-autocomplete";
import { activityValidator } from "../../../../app/common/form/validators/activityValidator";
import moment from "moment";
import { toast } from "react-toastify";
import { ActivityHelper } from "../../../../app/common/helpers/ActivityHelper";

interface IProps {
  initialActivity: ITravelPlanActivity | null;
  travelPlanId: string;
  isReadOnly: boolean;
  groupedActivities: Map<string, ITravelPlanActivity[]>;
}

enum WarningModal {
  Accept,
  Decline,
}

export const ActivityForm: React.FC<IProps> = ({
  initialActivity,
  travelPlanId,
  isReadOnly,
  groupedActivities,
}) => {
  const dispatch = useAppDispatch();
  const { formSubmitting } = useAppSelector(
    (state: RootState) => state.activityReducer
  );

  const [activity, setActivity] = useState<ITravelPlanActivityForm>(
    new ActivityFormValues()
  );
  const [formLoading, setFormLoading] = useState(true);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [acceptedWarning, setAcceptedWarning] = useState(false);

  async function handleActivitySubmit(formActivity: any) {
    const endStartDiff = moment(formActivity.endTime).diff(
      moment(formActivity.startTime),
      "minutes"
    );

    if (endStartDiff < 0) {
      toast.error("Invalid Start and End Times");
    } else if (formActivity.location.address === "") {
      toast.error("Invalid Location");
    } else {

      console.log(acceptedWarning);
      if (acceptedWarning) {
        if (initialActivity) {
          //if there was an initial, it was an edit
          dispatch(
            submitActivityEdit({ formActivity, groupedActivities })
          ).then(() => {
            dispatch(loadTravelPlanActivities(travelPlanId));
          });
        } else {
          formActivity.travelPlanId = travelPlanId;
          dispatch(createActivity(formActivity)).then(() => {
            dispatch(loadTravelPlanActivities(travelPlanId));
          });
        }
      }
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

      const groupKey = moment(formActivity.startTime).format("yyyy-MM-DD");
      const activitiesRegistry = groupedActivities.get(groupKey);

      const isValid = ActivityHelper.validateActivityTimes(
        formActivity,
        activitiesRegistry!
      );

      if (isValid) {
        if (initialActivity) {
          //if there was an initial, it was an edit
          dispatch(
            submitActivityEdit({ formActivity, groupedActivities })
          ).then(() => {
            dispatch(loadTravelPlanActivities(travelPlanId));
          });
        } else {
          formActivity.travelPlanId = travelPlanId;
          dispatch(createActivity(formActivity)).then(() => {
            dispatch(loadTravelPlanActivities(travelPlanId));
          });
        }
      }
      else
      {
        setWarningModalOpen(true);
      }
    }
  }

  function handleWarningModal(type: WarningModal) {
    const didAccept = type === WarningModal.Accept;
    setAcceptedWarning(didAccept);
    setWarningModalOpen(false);
  }

  function handleFormClose() {
    dispatch(closeModal());
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
        <Fragment>
          <Modal open={warningModalOpen}>
            <Modal.Content>
              Your activity times conflict with an existing activity for that day, do you want to
              proceed?
            </Modal.Content>
            <Modal.Actions>
              <Button
                icon="undo"
                content="Hmm, let me take a look"
                onClick={() => handleWarningModal(WarningModal.Decline)}
              />
              <Button
                icon="check"
                positive
                content="Proceed"
                onClick={() => handleWarningModal(WarningModal.Accept)}
              />
            </Modal.Actions>
          </Modal>

          {/* //using subscription, tell FinalForm to only re-render as a whole if
          it's submitting //or if the pristine value is changed //tell its
          fields to only render when the field itself has been interacted with,
          //in this case, we HAVE to subscribe to values, so unfortunately, it
          wil re-render as a whole on any //input change */}
          <FinalForm
            validate={activityValidator}
            subscription={{
              submitting: true,
              pristine: true,
              values: true,
              valid: true,
            }}
            initialValues={activity}
            onSubmit={(values) => handleActivitySubmit(values)}
            render={({ handleSubmit, pristine, values, valid }) => (
              <Form onSubmit={handleSubmit}>
                <FinalField
                  name="name"
                  placeholder="Name"
                  component={TextInput}
                  subscription={{ touched: true, error: true, value: true }}
                  readOnly={isReadOnly}
                />
                <FinalField
                  name="category"
                  placeholder="Category"
                  component={TextInput}
                  subscription={{ touched: true, error: true, value: true }}
                  readOnly={isReadOnly}
                />
                <FinalField
                  name="location.address"
                  placeholder="Location"
                  component={LocationInput}
                  subscription={{ touched: true, error: true, value: true }}
                  isDisabled={isReadOnly}
                />
                <FinalField
                  name="startTime"
                  placeholder="Start Time"
                  component={DateInput}
                  time={true}
                  date={true}
                  label="Start Time"
                  readOnly={isReadOnly}
                  onCurrentDateChange={(newStartTime: any) => {
                    setAcceptedWarning(false);
                    if (newStartTime > values.endTime) {
                      values.endTime = newStartTime;
                    }
                  }}
                />
                <FinalField
                  name="endTime"
                  placeholder="End Time"
                  component={DateInput}
                  time={true}
                  date={true}
                  label="End Time"
                  readOnly={isReadOnly}
                  onCurrentDateChange={() => {
                    setAcceptedWarning(false);
                  }}
                />
                <Button
                  content="Close"
                  disabled={formSubmitting}
                  onClick={handleFormClose}
                />
                <Button
                  floated="right"
                  positive
                  type="submit"
                  content={initialActivity ? "Save" : "Create"}
                  disabled={pristine || !valid}
                  loading={formSubmitting}
                />
              </Form>
            )}
          ></FinalForm>
        </Fragment>
      )}
    </Fragment>
  );
};
