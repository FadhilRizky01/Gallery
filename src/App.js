import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Search from "./components/Search";

const App = () => {
  // fetch data from API
  const [images, setImages] = useState([]); // catch data from API
  const [isLoading, setIsLoading] = useState(true); // loading
  const [input, setInput] = useState(""); // buat Search

  useEffect(() => {
    axios
      .get(`https://pixabay.com/api/?key=26218912-4ed2a2a74309b088b982a280c&q=${input}&image_type=photo`)
      .then((res) => {
        setImages(res.data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [input]);

  return (
    <div className="container mx-auto sm:ml-4">
      <Search searchText={(text) => setInput(text)} />
      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images found</h1>}
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading....</h1>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-4">
          {images.map((image) => {
            return <Card key={image.id} image={image} />;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
