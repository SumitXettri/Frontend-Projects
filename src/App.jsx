import Clock from "./components/Clock";
import "./App.css";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Clock />
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1697adb8-bfb5-49b1-85c1-efde49d71052/dcxuq07-97996a2d-1833-4256-bbf5-4b979098765b.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2OTdhZGI4LWJmYjUtNDliMS04NWMxLWVmZGU0OWQ3MTA1MlwvZGN4dXEwNy05Nzk5NmEyZC0xODMzLTQyNTYtYmJmNS00Yjk3OTA5ODc2NWIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-EFscCgfd20S5YLV7vTF00MzWmP-IsRkEJ2ARYVcx-w"
          alt="Starry sky background"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default App;
