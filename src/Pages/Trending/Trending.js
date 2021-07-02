import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../components/Pagination/CustomPagination";

function Trending() {
  // eslint-disable-next-line
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setContent(data.results);
    console.log(data.results);
  };
  useEffect(() => {
    fetchTrending();
  }, []);
  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={item.media_type}
              vote={item.vote_average}
            />
          ))}
      </div>
      <CustomPagination />
    </div>
  );
}

export default Trending;
