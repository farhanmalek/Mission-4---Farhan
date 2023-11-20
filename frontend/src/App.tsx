import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const API_KEY: string = import.meta.env.VITE_API_KEY as string;
const API_URL: string = import.meta.env.VITE_API_ENDPOINT as string;

interface apiResponse {
  name: string,
  confidence: number
}

// ...

function App(): JSX.Element {
  const [image, setImage] = useState<FileList>();
  const [output, setOutput] = useState<apiResponse[]>([]);
  const [matches, setMatches] = useState();

  // Fetch key tags from AI API
  async function getImageData() {
    if (image) {
      try {
        const response = await axios.post(API_URL, image[0], {
          headers: {
            'Content-Type': image[0].type,
            'Ocp-Apim-Subscription-Key': API_KEY
          }
        });
        setOutput(response.data.tagsResult.values);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Send data to backend
  async function sendData(data: apiResponse[]) {
    try {
      const response: AxiosResponse = await axios.post('http://localhost:5000/carvision', data);
      setMatches(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (image) {
      getImageData();
    }
  }, [image]);

  useEffect(() => {
    if (output.length > 0) {
      sendData(output);
    }
  }, [output]);

  return (
    <>
      <input
        type="file"
        name="image"
        onChange={(e) => setImage(e.target.files)}
      />
    </>
  );
}

export default App;
