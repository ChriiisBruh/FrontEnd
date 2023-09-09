import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const apiUrl = "http://localhost:3002/api/users"; 


class App extends Component {
  state = {
    data: [],
    modalInsert: false,
    form: {
      id: '',
      name: '',
      email: '',
      typeModal: ''
    },
  };

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

  handleChange = (e) => {
    e.persist();
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleCreate = () => {
    axios.post(apiUrl, this.state.form)
      .then(() => {
        this.clearForm(); // Limpia el formulario después de agregar
        this.toggleModal();
        this.fetchData();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  handleUpdate = () => {
    axios.put(apiUrl + '/' + this.state.form.id, this.state.form)
      .then(() => {
        this.toggleModal();
        this.fetchData();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  handleDelete = (id) => {
    axios.delete(apiUrl + '/' + id)
      .then(() => {
        this.fetchData();
      })
      .catch((error) => {
        console.log(error.message);
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
        <Modal isOpen={this.state.modalInsert} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            {this.state.form.id ? 'Editar Usuario' : 'Agregar Usuario'}
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={this.state.form.name || ''} />
              <br />
              <label htmlFor="email">Email</label>
              <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={this.state.form.email || ''} />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.form.id ?
              <button className="btn btn-success" onClick={this.handleUpdate}>
                Actualizar
              </button> :
              <button className="btn btn-success" onClick={this.handleCreate}>
                Insertar
              </button>
            }
            <button className="btn btn-danger" onClick={this.toggleModal}>Cancelar</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }


}

export default App;
