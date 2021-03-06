import { useState, useEffect } from "react"
import { googleAutocomplete } from "./google-autocomplete"

//custom hooks have to start with use*
export function usePlacesAutocomplete(text = "", debounceTimeout = 400)
{

  const [predictions, setPredictions] = useState([])

  useEffect(() =>
  {
    //settimeout gets called anytime its called
    //we set it to a var so that we can clear upon unmount
    const handleDebounce = setTimeout(async () =>
    {
      try
      {
        if (!text)
        {
          return
        }
        const nextPredictions = await googleAutocomplete(text)
        setPredictions(nextPredictions)
      } catch (e)
      {
        console.error(e)
      }
    }, debounceTimeout);

    return () =>
    {
      clearTimeout(handleDebounce)
    }
  }, [text, debounceTimeout]);

  return predictions
}