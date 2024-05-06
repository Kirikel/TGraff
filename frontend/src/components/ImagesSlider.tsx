import { useEffect, useState } from "react";

interface IImagePath {
  name: string;
  url: string;
}

export function ImagesSlider() {
  const [imagesPaths, setImagesPaths] = useState<IImagePath[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  useEffect(() => {
    fetch("http://localhost:3000/getImages")
      .then((imagesData) => imagesData.json())
      .then((data) => {
        setImagesPaths(data);
      });
  }, []);

  useEffect(() => {
    setPrevIndex(() => {
      return currentIndex === 0 ? imagesPaths.length - 1 : currentIndex - 1;
    });
    setNextIndex(() =>
      currentIndex === imagesPaths.length - 1 ? 0 : currentIndex + 1
    );
  }, [currentIndex, imagesPaths]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagesPaths.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagesPaths.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <section className="relative overflow-hidden pt-[24px] h-[788px] w-[1240px]">
      <div className="flex min-w-[1136px] h-[788px]  ">
        <button
          className="absolute top-1/2 left-[64px] z-[4] transform -translate-y-1/2"
          onClick={handlePrev}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_b_13371_1126)">
              <rect
                className="hover:fill-[#EBECF2] active:fill-[#B9D7FB]"
                width="40"
                height="40"
                rx="20"
                fill="white"
              />
              <path
                d="M15 20L25 20M15 20L20.303 15M15 20L20.303 25"
                stroke="#14161F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_b_13371_1126"
                x="-4"
                y="-4"
                width="48"
                height="48"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_13371_1126"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_13371_1126"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
        <div className="flex">
          {imagesPaths.map((imageData, index) => (
            <img
              key={index}
              src={`http://localhost:3000${imageData.url}`}
              alt={`Slide ${index + 1}`}
              width={1136}
              className={`min-w-[1136px] h-[788px] ${
                index === prevIndex ? "absolute left-[-1100px]" : ""
              }
              ${index === nextIndex ? "absolute right-[-1100px] " : ""}
              ${
                index === currentIndex
                  ? "absolute min-w-[1136px] mx-[auto] left-0 right-0 z-[3]"
                  : ""
              }
              ${
                index !== currentIndex &&
                index !== prevIndex &&
                index !== nextIndex &&
                "hidden"
              }
              `}
            />
          ))}
        </div>
        <button
          className="absolute top-1/2 right-[64px] transform z-[4] -translate-y-1/2"
          onClick={handleNext}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_b_1_13)">
              <rect
               className="hover:fill-[#EBECF2] active:fill-[#B9D7FB]"
                x="40"
                y="40"
                width="40"
                height="40"
                rx="20"
                transform="rotate(-180 40 40)"
                fill="white"
              />
              <path
                d="M25 20L15 20M25 20L19.697 25M25 20L19.697 15"
                stroke="#14161F"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_b_1_13"
                x="-4"
                y="-4"
                width="48"
                height="48"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_1_13"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_1_13"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
      </div>
    </section>
  );
}
