import React, { Fragment, useEffect, useState } from "react";
import { AnnouncementFormValues } from "../../../../app/common/classes/AnnouncementFormValues";
import { ITPAnnouncement } from "../../../../app/common/interfaces/ITPAnnouncement";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { Button, Form, Label } from "semantic-ui-react";
import { TextInput } from "../../../../app/common/form/TextInput";
import { TextAreaInput } from "../../../../app/common/form/TextAreaInput";
import { useAppDispatch } from "../../../../app/customHooks";
import {
  loadAnnouncements,
  manageFormShow,
  submitAnnouncementCreate,
  submitAnnouncementEdit,
} from "./announcementSlice";

interface IProps {
  initialAnnouncement: ITPAnnouncement | null;
  travelPlanID: string;
}

export const AnnouncementForm: React.FC<IProps> = ({
  initialAnnouncement,
  travelPlanID,
}) => {
  const [announcement, setAnnouncement] = useState<any>(
    new AnnouncementFormValues()
  );
  const dispatch = useAppDispatch();

  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  async function handleAnnouncementSubmit(values: any) {
    setFormSubmitting(true);
    values.createdDate = new Date().toISOString();

    var actionResult: any = null;

    //if there's an initial announcement, edit else, create
    if (initialAnnouncement) {
      actionResult = await dispatch(
        submitAnnouncementEdit({ announcement: values })
      );
    } else {
      values.travelPlanId = travelPlanID;
      actionResult = await dispatch(
        submitAnnouncementCreate({
          announcement: values
        })
      );
    }

    if (!actionResult?.error) {
      dispatch(loadAnnouncements({ travelPlanID }));
    }

    setFormSubmitting(false);
    dispatch(manageFormShow({showForm: false, announcementTargetID: null}));
  }

  function handleCancelEdit() {
    dispatch(manageFormShow({ showForm: false, announcementTargetID: null }));
  }

  useEffect(() => {
    if (initialAnnouncement) {
      setAnnouncement(initialAnnouncement);
    }

    return () => {
      setAnnouncement(new AnnouncementFormValues());
    };
  }, [initialAnnouncement]);

  return (
    <Fragment>
      <FinalForm
        subscription={{ submitting: true, pristine: true }}
        initialValues={announcement}
        onSubmit={(values) => handleAnnouncementSubmit(values)}
        render={({ handleSubmit, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Label>Title</Label>
            <FinalField
              name="title"
              placeholder="Title"
              component={TextInput}
              subscription={{ touched: true, error: true, value: true }}
            />
            <Label>Description</Label>

            <FinalField
              name="description"
              placeholder="Description"
              component={TextAreaInput}
              subscription={{ touched: true, error: true, value: true }}
            />
            <Button content="Close" onClick={handleCancelEdit} />
            <Button
              floated="right"
              positive
              type="submit"
              content={initialAnnouncement ? "Save" : "Create"}
              disabled={pristine}
              loading={formSubmitting}
            />
          </Form>
        )}
      />
    </Fragment>
  );
};
