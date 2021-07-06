import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../components/Pagination/CustomPagination";

function Trending() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=22b7a82b91bdec936e76181ba1c46929&page=${page}`
    );
    setContent(data.results);
  };
  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);
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
      <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Trending;
