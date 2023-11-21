
interface match {
  bodyType: string [];
  brand: string
  color: string;
  image: string;
  price: number;
  _id: string;
  __v: number;
}

interface matches {
  matches: match[];

}

function Results(matches: matches) {


const matchArray = matches.matches;
console.log(matchArray)
  return (
<div>
  <p>We found {matchArray.length} match{matchArray.length === 1 ? "": "es"}</p>
      {matchArray.length  > 0 ?
        <div className="flex flex-wrap justify-center">
          {matchArray.map((match) => (
            <div key={match._id} className="max-w-md mx-2 my-4 overflow-hidden rounded shadow-lg">
              <img className="w-full h-40 object-contain" src={match.image} alt={match.brand} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{match.brand}</div>
                <p className="text-gray-700 text-base mb-2">Colour : {match.color}</p>
                <p className="text-gray-700 text-base mb-2">${match.price}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      : <p>Sorry, no matches found. Updates to come!</p>}
    </div>
  )
}

export default Results