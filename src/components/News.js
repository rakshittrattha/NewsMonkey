import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async () => {
    const res = await axios.get(`http://localhost:5000/news?category=${category}&page=1`);
    setArticles(res.data.articles);
    setPage(1);
    setHasMore(true);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const res = await axios.get(`http://localhost:5000/news?category=${category}&page=${nextPage}`);

    if (res.data.articles.length === 0) setHasMore(false);
    else {
      setArticles(articles.concat(res.data.articles));
      setPage(nextPage);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  return (
    <div className="container mt-3">

      <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={hasMore}>
        <div className="row">
          {articles.map((n, i) => (
            <div className="col-md-4" key={i}>
              <div className="card my-3 shadow-sm">
                <img src={n.urlToImage || "https://via.placeholder.com/300"} className="card-img-top" alt="" />
                <div className="card-body">
                  <h5>{n.title}</h5>
                  <p>{n.description}</p>
                  <a href={n.url} className="btn btn-primary btn-sm" target="_blank" rel="noreferrer">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default News;
