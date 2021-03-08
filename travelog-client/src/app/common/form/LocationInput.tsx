import React, { useState } from "react";
import { FieldRenderProps } from "react-final-form";
import {
  Form,
  FormFieldProps,
  Label,
} from "semantic-ui-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {
  //all properties needed are inside the inherited classes
}

export const LocationInput: React.FC<IProps> = ({
  input,
  width,
  type,
  meta,
}) => {
  const [inputValue, setInputValue] = useState(input.value); //initial value of location input
  const [location, setLocation] = useState(null); //googleplaces lib needs the whole location obj

  function handleOnChange(e: any) {
    input.onChange(e.label);
    setLocation(e);
  }

  return (
    <Form.Field error={meta.touched && !!meta.error} type={type} width={width}>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        selectProps={{
          value: location,
          inputValue: inputValue,
          onInputChange: setInputValue,
          onChange: (e: any) => handleOnChange(e),
        }}
      />
      {meta.touched && meta.error && (
        <Label basic color="red">
          {meta.error}
        </Label>
      )}
    </Form.Field>
  );
};
