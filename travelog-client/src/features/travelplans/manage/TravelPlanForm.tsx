import React, { useEffect, useState } from "react";
import { Form, Button, Grid, Segment } from "semantic-ui-react";
import { TravelPlanFormValues } from "../../../app/common/classes/TravelPlanFormValues";
import { DateInput } from "../../../app/common/form/DateInput";
import { TextInput } from "../../../app/common/form/TextInput";
import { ITravelPlan } from "../../../app/common/interfaces/ITravelPlan";
import { ITravelPlanForm } from "../../../app/common/interfaces/ITravelPlanForm";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import { useAppDispatch, useAppSelector } from "../../../app/customHooks";
import { RootState } from "../../../app/store";
import { history } from "../../../";
import { createTravelPlan, submitTravelPlanEdit } from "./manageSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface IProps {
  initialTravelPlan: ITravelPlan | null;
}

export const TravelPlanForm: React.FC<IProps> = ({ initialTravelPlan }) => {
  const dispatch = useAppDispatch();
  const { isSubmitting, travelPlan } = useAppSelector(
    (state: RootState) => state.manageReducer
  );

  //this will hold the state of the form
  const [formTravelPlan, setFormTravelPlan] = useState<ITravelPlanForm>(
    new TravelPlanFormValues()
  );

  async function handleTravelPlanSubmit(formPlan: any) {
    console.log("submitting");
    //change dates back to isos
    formPlan.startDate = new Date(formPlan.startDate).toISOString();
    formPlan.endDate = new Date(formPlan.endDate).toISOString();

    //create/edit then go to travelplan page
    try {
      if (initialTravelPlan) {
        const actionResult: any = await dispatch(
          submitTravelPlanEdit(formPlan)
        );

        if (actionResult.error) {
          toast.error(actionResult.error.message);
        } else {
          history.push(`/travelplans/${travelPlan?.id}`);
        }
      } else {
        const actionResult: any = await dispatch(createTravelPlan(formPlan));

        if (actionResult.error) {
          toast.error(actionResult.error.message);
        } else {
          const newPlan: ITravelPlan = actionResult.payload as ITravelPlan;
          history.push(`/travelplans/${newPlan.id}`);
        }
      }
    } catch (err) {
      // console.log(err);
      
    }
  }

  useEffect(() => {
    //set form
    if (initialTravelPlan) {
      setFormTravelPlan(new TravelPlanFormValues(initialTravelPlan!));
    }

    //clear form upon unmount
    return () => {
      setFormTravelPlan(new TravelPlanFormValues());
    };
  }, [initialTravelPlan]);

  return (
    <Grid>
      <Grid.Column width={12}>
        <Segment>
          <FinalForm
            initialValues={formTravelPlan}
            onSubmit={(values) => handleTravelPlanSubmit(values)}
            render={({ handleSubmit, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <FinalField
                  name="name"
                  placeholder="Name"
                  component={TextInput}
                />
                <Form.Group widths="equal">
                  <FinalField
                    name="startDate"
                    placeholder="Start Date"
                    component={DateInput}
                    date={true}
                    label="Start Date"
                  />
                  <FinalField
                    name="endDate"
                    placeholder="End Date"
                    component={DateInput}
                    date={true}
                    label="End Date"
                  />
                </Form.Group>
                <FinalField
                  name="description"
                  placeholder="Description"
                  component={TextAreaInput}
                />
                <Button
                  content="Cancel"
                  disabled={isSubmitting}
                  as={Link}
                  to={
                    initialTravelPlan
                      ? `/travelplans/${travelPlan?.id}`
                      : "/travelplans"
                  }
                />
                <Button
                  floated="right"
                  positive
                  type="submit"
                  content={initialTravelPlan ? "Save" : "Create"}
                  disabled={pristine}
                  loading={isSubmitting}
                />
              </Form>
            )}
          ></FinalForm>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
