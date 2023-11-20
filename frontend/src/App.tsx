
import ImageSearch from "./components/ImageSearch";
import Results from "./components/Results";


function App(): JSX.Element {







  

  return (
    <>

    <div className="flex justify-between">
      <div className=" px-6 py-2 rounded-md bg-slate-700 text-white font-bold mb-[-4px]">
        Image Search
      </div>
      <div className=" px-6 py-2 rounded-md bg-slate-700 text-white font-bold mb-[-4px]">
        Regular Search
      </div>
    </div>

      <div className="bg-slate-700 flex justify-center items-center w-[60vw] h-[60vh]">
      <ImageSearch/>
      </div>
      <Results/>
    </>
  );
}

export default App;
