import React, { Component } from "react";

//Component Lifecycle Methods (legacy included)

class Test extends Component {
  state = {
    title: "",
    body: ""
  };

  //usually where http/db calls to an api are made
  //runs post mount
  componentDidMount() {
    //fetches data from an api and renders it on to the screen (see render for complete)
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => response.json())
      .then(json =>
        this.setState({
          title: json.title,
          body: json.body
        })
      );
  }

  //runs pre mount (legacy)
  //   componentWillMount() {
  //     console.log("componentWillMount");
  //   }

  //runs after UPDATE (initial mount is not an update)
  //   componentDidUpdate() {
  //     console.log("componentDidUpdate");
  //   }

  //legacy
  //   componentWillUpdate() {
  //     console.log("componentWillUpdate");
  //   }

  //used with redux (legacy)
  //   componentWillReceiveProps(nextProps, nextState) {
  //     console.log("componentWillRecProps");
  //   }

  //replacing method used to receive props ^
  //   static getDerivedStateFromProps(nextProps, prevState) {
  //must return either a state or null
  //     return null;
  //   }

  //snapshots state before dom is updated
  //   getSnapshotBeforeUpdate(prevProps, prevState) {
  //     console.log("getSnapshotBeforeUpdate");
  //   }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}
export default Test;
