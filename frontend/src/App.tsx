import ImageSearch from "./components/ImageSearch";
import Results from "./components/Results";
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const API_KEY: string = import.meta.env.VITE_API_KEY as string;
const API_URL: string = import.meta.env.VITE_API_ENDPOINT as string;

interface apiResponse {
  name: string;
  confidence: number;
}

function App(): JSX.Element {
  const [output, setOutput] = useState<apiResponse[]>([]);
  const [matches, setMatches] = useState();
  const [preview, setPreview] = useState<undefined | string>();
  //Dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);


  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  // Fetch key tags from AI API
  async function getImageData() {
    if (acceptedFiles.length > 0) {
      try {
        const response = await axios.post(API_URL, acceptedFiles[0], {
          headers: {
            "Content-Type": acceptedFiles[0].type,
            "Ocp-Apim-Subscription-Key": API_KEY,
          },
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
      const response: AxiosResponse = await axios.post(
        "http://localhost:5000/carvision",
        data
      );
      setMatches(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (acceptedFiles.length > 0) {
      getImageData();
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (output.length > 0) {
      sendData(output);
    }
  }, [output]);

  return (
    <>
      <div className="flex justify-between">
        <div className=" px-6 py-2 rounded-md bg-slate-700 text-white font-bold mb-[-4px]">
          Image Search (beta)
        </div>
        <div className=" px-6 py-2 rounded-md bg-slate-700 text-white font-bold mb-[-4px]">
          Regular Search
        </div>
      </div>

      <div className="bg-slate-700 flex justify-center items-center w-[60vw] h-[60vh]">
        <ImageSearch
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          preview={preview}
        />
      </div>
      {matches ? <Results matches={matches} /> : ""}
    </>
  );
}

export default App;
