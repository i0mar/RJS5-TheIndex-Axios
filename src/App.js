import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  async componentDidMount() {
    try {
      let response = await axios.get("https://the-index-api.herokuapp.com/api/authors/");

      this.setState({authors: response.data});
      this.setState({loading: false});
    } catch(error) {
      console.error(error);
    }
  };

  selectAuthor = async (author) => {
    this.setState({loading: true});
    let temp = await axios.get("https://the-index-api.herokuapp.com/api/authors/" + author.id);
    this.setState({ currentAuthor: temp.data })
    this.setState({loading: false});
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return <AuthorsList authors={this.state.authors} selectAuthor={this.selectAuthor} />;
    }
  };

  isLoading = () => {
    if (this.state.loading) {
      return (
        <h1>Loading, please wait...</h1>
      );
    } else {
      return this.getContentView();
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.isLoading()}</div>
        </div>
      </div>
    );
  }
}

export default App;
