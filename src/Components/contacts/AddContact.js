import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../Layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    //validate contact info
    if (name === "") {
      this.setState({ errors: { name: "Name is required!" } });
      return;
    }
    if (email === "" && phone === "") {
      this.setState({
        errors: {
          email: "Email or phone number is required!",
          phone: "Email or phone number is required!"
        }
      });

      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    //AXIOS POST REQUEST
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: response.data });

    //clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
    this.props.history.push("/"); //redir after add
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter name..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
