
import turners from "../assets/turners.png";

interface ImageSearchProps {
  getRootProps: () => object;
  getInputProps: () => object
  isDragActive: boolean;
  preview: string | undefined;
}


function ImageSearch({
  getRootProps,
  getInputProps,
  isDragActive,
  preview,
}: ImageSearchProps): JSX.Element {


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
            <p>Drag and drop an image of the car you wish to search for</p>
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
