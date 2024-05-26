import { useEffect, useState } from "react";
import "./styles.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

export default function ImageSlider({ url, limit = 10, page = 1 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  async function fetchImages(getURl) {
    try {
      setIsLoading(true);
      const res = await fetch(`${getURl}?limit=${limit}&page=${page}`);
      const data = await res.json();
      setImages(data);
      console.log(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Data is Loading... Please wait</p>;
  }

  if (error) {
    return <p>Error Occurred! Something went wrong ☹️</p>;
  }


  function handleLeftArrow() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide -1)
  }

  function handleRightArrow() {
    setCurrentSlide(currentSlide >= images.length - 1 ? 0 : currentSlide + 1)
  }


  return (
    <div className="slider-container">
      <BsArrowLeftCircleFill className="arrow arrow-left" onClick={handleLeftArrow} />
      {images && images.length > 0
        ? images.map((currentImage, index) => (
            <img
              src={currentImage.download_url}
              alt={currentImage.download_url}
              key={currentImage.id}
              className={
                currentSlide === index ? "currentImage" : "hiddenImage"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill className="arrow arrow-right" onClick={handleRightArrow}/>

      <div className="button-indicators">
        {images && images.length > 0
          ? images.map((_, i) => (
              <button
                className={
                  currentSlide === i ? "currentIndicator" : "hiddenIndicator"
                }
              ></button>
            ))
          : null}
      </div>
    </div>
  );
}
