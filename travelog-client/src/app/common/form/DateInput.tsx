import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';
interface IProps extends FieldRenderProps<Date>, FormFieldProps {
  //all properties needed are inside the inherited classes
}

export const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta,
  id = null,
  label,
  ...rest
}) => {
  return (
    <Form.Field error={meta.touched && !!meta.error} width={width}>
        <label>{label}</label>
      <Datetime
        // placeholder={placeholder}
        value={input.value}
        onChange={input.onChange}
        // onBlur={input.onBlur}
        // onKeyDown={e => e.preventDefault()}
        initialViewMode='time'
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
