import { useState } from "react";
import loveGif from "./assets/love.gif";

const messages = [
  "Please think again 🥺",
  "You can't do this 😭",
  "You have to choose me na ❤️",
  "Are you sure? 😢",
  "My heart will break 💔",
  "Try clicking Yes instead 😏",
  "No is not an option 😌",
];

function App() {
  const [message, setMessage] = useState("Do you love me? ❤️");
  const [showGif, setShowGif] = useState(false);

  const [noPosition, setNoPosition] = useState({
    left: 100,
    top: 100,
  });

  const moveNoButton = () => {
    const buttonWidth = 120;
    const buttonHeight = 60;

    let x;
    let y;

    do {
      x = Math.random() * (window.innerWidth - buttonWidth);
      y = Math.random() * (window.innerHeight - buttonHeight);
    } while (
      x > window.innerWidth / 2 - 250 &&
      x < window.innerWidth / 2 + 250 &&
      y > window.innerHeight / 2 - 200 &&
      y < window.innerHeight / 2 + 200
    );

    setNoPosition({
      left: x,
      top: y,
    });

    setMessage(
      messages[Math.floor(Math.random() * messages.length)]
    );
  };

  return (
    <div className="relative w-screen h-screen bg-pink-100 overflow-hidden flex items-center justify-center">
      {!showGif ? (
        <>
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-4xl font-bold text-pink-600 text-center">
              {message}
            </h1>

            <button
              onClick={() => setShowGif(true)}
              className="px-8 py-3 bg-green-500 text-white rounded-xl text-xl hover:scale-110 transition"
            >
              Yes ❤️
            </button>
          </div>

          <button
            onMouseEnter={moveNoButton}
            style={{
              position: "absolute",
              left: `${noPosition.left}px`,
              top: `${noPosition.top}px`,
            }}
            className="px-8 py-3 bg-red-500 text-white rounded-xl text-xl"
          >
            No 😈
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={loveGif}
            alt="love"
            className="rounded-xl max-w-md"
          />

          <h1 className="text-4xl font-bold text-pink-600 mt-5">
            Yaaay Your Boy Loves U TOO ❤️🥰
          </h1>
        </div>
      )}
    </div>
  );
}

export default App;