import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const apiUrl = "http://localhost:3002/api/users"; 


class App extends Component {

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get(apiUrl)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  toggleModal = () => {
    this.setState({ modalInsert: !this.state.modalInsert });
  };

  selectForm = (form) => {
    this.setState({
      form: {
        id: form.id,
        name: form.name,
        email: form.email,
      },
    });
  };

  clearForm = () => {
    this.setState({
      form: {
        id: '',
        name: '',
        email: '',
      },
    });
  };

  render() {
    return (
      <div className="App container">
        <br /><br /><br />
        <button className="btn btn-success" onClick={() => { this.clearForm(); this.toggleModal(); }}>
          Agregar Usuario
        </button>
        <br /><br />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
              {this.state.data.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { this.selectForm(user); this.toggleModal(); }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {"   "}
                    <button className="btn btn-danger" onClick={() => this.handleDelete(user.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        
      </div>
    );
  }


}

export default App;
