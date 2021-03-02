import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Container } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps extends FieldRenderProps<Date>, FormFieldProps {
  //all properties needed are inside the inherited classes
}

export const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta,
  id = null,
  date = false,
  time = false,
  label,
  viewMode,
  ...rest
}) => {
  return (
    <Form.Field error={meta.touched && !!meta.error} width={width}>
      <label>{label}</label>
      <DateTimePicker
        value={new Date(input.value)}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
        {...rest}
        {...rest}
      />
      {meta.touched && meta.error && (
        <Label basic color="red">
          {meta.error}
        </Label>
      )}
    </Form.Field>
  );
};
