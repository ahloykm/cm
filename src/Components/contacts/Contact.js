import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  //arrow function syn: funcName = async param => {}
  onDeleteClick = async (id, dispatch) => {
    //AXIOS DELETE REQUEST
    //for json placeholder, users/:id (use template string ` not ')
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`); //no local variable needed since deleting
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id }); //since cant delete added data from json ph, it will delete from dom
    }
  };

  static propTypes = {
    contact: PropTypes.object.isRequired
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fas fa-angle-down"
                  style={{ cursor: "pointer" }}
                />
                <i //since function (delete) we dont just link
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul clasName="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
