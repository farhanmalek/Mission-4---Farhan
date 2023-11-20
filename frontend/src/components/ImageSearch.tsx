import { useState, useEffect, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import turners from "../../public/turners.png";
import { useDropzone } from "react-dropzone";

const API_KEY: string = import.meta.env.VITE_API_KEY as string;
const API_URL: string = import.meta.env.VITE_API_ENDPOINT as string;

interface apiResponse {
  name: string;
  confidence: number;
}

function ImageSearch(): JSX.Element {

  const [output, setOutput] = useState<apiResponse[]>([]);
  const [matches, setMatches] = useState();
  const [preview, setPreview] = useState<undefined | string>();

  //Dropzone
  const onDrop = useCallback((acceptedFiles: FileList) => {
    // Do something with the files
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const {acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
      console.log(response.data);
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
    <div className="bg-white p-2 rounded w-[98%] h-[95%] flex flex-col justify-around">
      <div className="px-2">
        <img src={turners} className="w-9"></img>
        <h1 className="text-sm font-bold">Car buying. Made simple. </h1>
      </div>
      <p className="text-xl font-extrabold self-center">
        Upload an image of a car and we will go looking!
      </p>
      <div className="flex justify-around ">
        <div {...getRootProps()} className="border border-dashed border-red-900 p-6 flex items-center justify-center font-bold">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Mic Drop!</p>
          ) : (
            <p>Drag and drop an image of the car you wish to search for</p>
    
          )}
        </div>
        { preview ? <img src={preview} className="w-[300px] h-[200px]"></img> : <p className="border border-red-900 w-[300px] h-[200px] flex items-center justify-center font-bold"> PREVIEW </p>}
      </div>
    </div>
  );
}

export default ImageSearch;
