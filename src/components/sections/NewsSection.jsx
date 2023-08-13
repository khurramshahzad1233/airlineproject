import React from "react";

const NewsSection = () => {
  return (
    <section id="home_news" className="section_padding_top">
      <div className="container">
        {/* Section Heading */}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Latest travel news</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="home_news_left_wrapper">
              <div className="home_news_item">
                <div className="home_news_img">
                  <a href="news-details.html">
                    <img
                      src="https://andit.co/projects/html/and-tour/demo/assets/img/news/small1.png"
                      alt="img"
                    />
                  </a>
                </div>
                <div className="home_news_content">
                  <h3>
                    <a href="news-details.html">
                      Revolutionising the travel industry, one partnership at a
                      time
                    </a>
                  </h3>
                  <p>
                    <a href="news.html">26 Oct 2021</a>{" "}
                    <span>
                      {" "}
                      <i className="fas fa-circle" />
                      5min read
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div className="home_news_item">
                <div className="home_news_img">
                  <a href="news-details.html">
                    <img
                      src="https://andit.co/projects/html/and-tour/demo/assets/img/news/small2.png"
                      alt="img"
                    />
                  </a>
                </div>
                <div className="home_news_content">
                  <h3>
                    <a href="news-details.html">
                      t is a long established fact that a reader will be
                      distracted.
                    </a>
                  </h3>
                  <p>
                    <a href="news.html">26 Oct 2021</a>{" "}
                    <span>
                      {" "}
                      <i className="fas fa-circle" />
                      5min read
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div className="home_news_item">
                <div className="home_news_img">
                  <a href="news-details.html">
                    <img
                      src="https://andit.co/projects/html/and-tour/demo/assets/img/news/small3.png"
                      alt="img"
                    />
                  </a>
                </div>
                <div className="home_news_content">
                  <h3>
                    <a href="#!">
                      There are many variations of passages of sum available
                    </a>
                  </h3>
                  <p>
                    <a href="news.html">26 Oct 2021</a>{" "}
                    <span>
                      {" "}
                      <i className="fas fa-circle" />
                      5min read
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div className="home_news_item">
                <div className="home_news_img">
                  <a href="news-details.html">
                    <img
                      src="https://andit.co/projects/html/and-tour/demo/assets/img/news/small4.png"
                      alt="img"
                    />
                  </a>
                </div>
                <div className="home_news_content">
                  <h3>
                    <a href="news-details.html">
                      Contrary to popular belief, Lorem Ipsum is not simply.
                    </a>
                  </h3>
                  <p>
                    <a href="news.html">26 Oct 2021</a>{" "}
                    <span>
                      {" "}
                      <i className="fas fa-circle" />
                      5min read
                    </span>{" "}
                  </p>
                </div>
              </div>
              <div className="home_news_item">
                <div className="seeall_link">
                  <a href="news.html">
                    See all article <i className="fas fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="home_news_big">
              <div className="news_home_bigest img_hover">
                <a href="news-details.html">
                  <img
                    src="https://andit.co/projects/html/and-tour/demo/assets/img/news/new-big.png"
                    alt="img"
                  />
                </a>
              </div>
              <h3>
                <a href="news-details.html">
                  There are many variations of passages available but
                </a>{" "}
              </h3>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of. The point of using Lorem Ipsum is
                that it has a more
              </p>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable long established fact that a reader will be
                distracted content of a page when looking at its layout.
              </p>
              <a href="news-details.html">
                Read full article <i className="fas fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
