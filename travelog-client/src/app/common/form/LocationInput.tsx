import { time } from "console";
import React, { useEffect, useState } from "react";
import { FieldRenderProps } from "react-final-form";
import { DateTimePicker } from "react-widgets";
import { Form, FormFieldProps, Label } from "semantic-ui-react";
import { googleAutocomplete } from "../maps/google-autocomplete";
import { usePlacesAutocomplete } from "../maps/usePlacesAutocomplete";

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {
  //all properties needed are inside the inherited classes
}

export const LocationInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta,
}) => {
  console.log("location");
  const [location, setLocation] = useState("");

  //custom react hook that gets triggered after location state change
  const predictions = usePlacesAutocomplete(location, 200);
  console.log(predictions);

  useEffect(() => {
    const newScript = document.createElement("script");
    newScript.src = `//maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=en&libraries=places`;
    newScript.type = "text/javascript";
    document.body.appendChild(newScript);

    setLocation(input.value);
  }, [input.value]);

  async function handleOnChange(text: string) {
    setLocation(text);
  }

  return (
    <Form.Field error={meta.touched && !!meta.error} type={type} width={width}>
      <input
        {...input}
        value={location}
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      {meta.touched && meta.error && (
        <Label basic color="red">
          {meta.error}
        </Label>
      )}

      <ul>
        {predictions?.map((prediction: any) => (
          <li key={prediction?.place_id}>
            <button
            // onClick={e => handlePredictionSelection(e, prediction)}
            // onKeyDown={e => handlePredictionSelection(e, prediction)}
            >
              {prediction?.structured_formatting?.main_text || "Not found"}
            </button>
          </li>
        ))}
      </ul>
    </Form.Field>
  );
};
