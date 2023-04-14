import React, { useEffect, useState } from "react";
import Video from './Video';
import { getAllVideos, searchVideos } from "../modules/videoManager";
import { Label, Input} from "reactstrap";
import VideoForm from "./VideoForm";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBool, setSortBool] = useState(false);

  const getVideos = () => {
    getAllVideos().then(videos => setVideos(videos));
  };

  useEffect(() => {
    getVideos();
  }, []);

  const handleSearchButtonClick = (event) => {
    event.preventDefault()
    searchVideos(searchTerm, sortBool).then(videos => {
      setVideos(videos)
      setSearchTerm("")
      setSortBool(false)
    })
  }

  return (
    <div className="container">
      <div> Search <br/>
        <input
          type="text"
          placeholder="Enter your search here"
          value={searchTerm}
          onChange={
            (event) =>
              setSearchTerm(event.target.value)
          }
        />
        <Label htmlFor="sort-checkbox" className="px-2">
          Sort Descending:
        </Label>
        <Input
          type="checkbox"
          id="sort-checkbox"
          name="sort-checkbox"
          checked={sortBool}
          onChange={(event) => {
            setSortBool(event.target.checked);
          }}
        />
        <button
          onClick={(clickEvent) => handleSearchButtonClick(clickEvent)}>Search</button>
        </div>

        <div className="row justify-content-center">
          <VideoForm getVideos={getVideos} />
      </div>
      <div className="row justify-content-center">
        {videos.map((video) => (
          <Video video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;