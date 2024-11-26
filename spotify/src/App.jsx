import React from "react"
import { SlSocialSpotify } from "react-icons/sl";
import axios from "axios"
import { useState } from "react";

function App() {
  const [URL, setURL] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleURL = (e) => {
    e.preventDefault();
    setURL(e.target.value)
  };

  console.log(URL)

  const downloadSong = async () => {
    setURL("")
    setError("");
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://spotify-downloader9.p.rapidapi.com/downloadSong',
      params: {
        songId: `${URL}`
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options)
       console.log(response.data.data.downloadLink)

      window.location.href = response.data.data.downloadLink
    } catch (error) {
      setError("Failed to fetch the song. Please check the URL.");
    }
    setLoading(false);
    
  };

  return (
    <div
    className={`h-screen w-screen ${
      isDarkMode
        ? "bg-gray-900 text-white"
        : "bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-600 via-emerald-600 to-amber-500 text-black"
    } flex items-center justify-center flex-col gap-y-5`}
  >
    <div className="flex items-center justify-center w-full px-10 ">
      <div className="flex items-center gap-x-2 text-xl font-bold">
        <SlSocialSpotify size={50} />
        <p>Song Downloader</p>
      </div>
      <button
        className="bg-white px-4 py-2 rounded-lg ml-3 font-bold hover:bg-black hover:text-white"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        Toggle {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </div>

    <div className="flex flex-col items-center w-full px-10">
      <div className="flex gap-x-2 mb-4 w-full max-w-md">
        <input
          type="url"
          placeholder="Enter Spotify Song URL"
          className="h-10 w-full border-none outline-none px-5 rounded-lg"
          onChange={handleURL}
          value={URL}
        />
        <button
          className="bg-white h-10 px-4 rounded-lg font-bold hover:bg-black hover:text-white"
          onClick={downloadSong}
          disabled={loading || !URL}
        >
          {loading ? "Loading..." : "Download"}
        </button>
        <div>
   
  </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  </div>
);
}



export default App;