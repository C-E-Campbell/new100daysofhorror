import React, { Component } from "react";
import moment from "moment";
import "./Login.style.scss";
import UserBox from "../../components/UserBox/UserBox";
import MovieList from "../../components/MovieList/MovieList";
import DiffModal from "../../components/DiffModal/DiffModal";
import MovieDescription from "../../components/MoveDescription/MovieDescription";
import Header from "../../components/Header/Header";
import YouWin from "../../components/YouWin/YouWin";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acctStart: null,
      acctEnd: null,
      movieList: [],
      movieItem: [],
      difficultyFlag: false,
      difficulty: "",
      currentMovie: {},
      trailerID: "",
      isEmpty: false
    };

    this.getID = this.getID.bind(this);
    this.myModalFunc = this.myModalFunc.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    let getStart = moment().format("LL");
    this.setState({ acctStart: getStart });

    axios.get("/api/movies").then(response => {
      this.setState({ movieList: response.data });
    });
  }

  getID(movieData) {
    const { omdbID, youtubeID } = movieData;

    axios
      .get(`https://www.omdbapi.com/?apikey=4c3ee338&i=${omdbID}&plot=full`)
      .then(response => {
        this.setState({ currentMovie: response.data, trailerID: youtubeID });
      });
  }

  deleteMovie(id) {
    if (this.state.movieList.length === 1) {
      axios.delete(`/api/movie/${id}`).then(response => {
        this.setState({ movieList: response.data, isEmpty: true });
      });
    } else {
      axios.delete(`/api/movie/${id}`).then(response => {
        this.setState({ movieList: response.data });
      });
    }
  }
  myModalFunc(diff) {
    if (diff === "Easy") {
      this.setState({
        difficultyFlag: true,
        difficulty: diff,
        acctEnd: moment()
          .add(1, "year")
          .format("LL")
      });
    } else if (diff === "MurderMe") {
      this.setState({
        difficultyFlag: true,
        difficulty: diff,
        acctEnd: moment()
          .add(100, "day")
          .format("LL")
      });
    }
  }

  render() {
    if (!this.state.difficultyFlag) {
      return <DiffModal myModalFunc={this.myModalFunc} />;
    } else {
      if (this.state.isEmpty) {
        return <YouWin className={("youwin", "move")} />;
      } else {
        return (
          <div>
            <Header />
            <div className="dashboard">
              <UserBox
                movieListLength={this.state.movieList.length}
                difficulty={this.state.difficulty}
                acctStart={this.state.acctStart}
                acctEnd={this.state.acctEnd}
              />
              <MovieList
                getID={this.getID}
                movies={this.state.movieList}
                deleteMovie={this.deleteMovie}
              />
              <MovieDescription
                trailer={this.state.trailerID}
                movieData={this.state.currentMovie}
              />
            </div>

            <Footer />
          </div>
        );
      }
    }
  }
}
