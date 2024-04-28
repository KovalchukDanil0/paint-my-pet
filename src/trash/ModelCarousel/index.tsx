"use client";

import dynamic from "next/dynamic";
import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

const getDynamicComponent = (module: string) => {
  return dynamic(() => import(`@/app/cars/${module}/display`), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });
};

interface ModelCarousel {
  carPaths: string[];
}

export default function ModelCarousel({ carPaths }: Readonly<ModelCarousel>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxScrollWidth: MutableRefObject<number> = useRef(0);
  const carousel: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  function movePrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  }

  function moveNext() {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  }

  function isDisabled(direction: string): boolean {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  }

  useEffect(() => {
    if (carousel?.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel mx-auto my-12">
      <h2 className="mb-12 text-4xl font-semibold leading-8 text-slate-700">
        Our epic carousel
      </h2>
      <div className="relative overflow-hidden">
        <div className="top left absolute flex h-full w-full justify-between">
          <button
            onClick={movePrev}
            className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
            disabled={isDisabled("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-5 h-12 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
            disabled={isDisabled("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-5 h-12 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative z-0 flex touch-pan-x snap-x snap-mandatory gap-1 overflow-hidden scroll-smooth"
        >
          {carPaths.map((path) => {
            const DisplayComponent = getDynamicComponent(path);

            return (
              <div
                key={path}
                className="carousel-item relative h-64 w-64 snap-start text-center"
              >
                <div className="z-0 block aspect-square h-full w-full bg-cover bg-left-top bg-no-repeat bg-origin-padding">
                  <DisplayComponent />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
