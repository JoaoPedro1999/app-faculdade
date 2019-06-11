import React, { Component } from "react";

import { Text, TextInput, TouchableOpacity } from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BooksActions from "../../store/ducks/books";

import Modal from "../Modal";
import styles from "./styles";

class UpdateBook extends Component {
  state = {
    book_title: "",
    author: ""
  };

  // componentWillMount = id => {
  //   const { id } = this.props;
  // };

  handleSubmit = () => {
    const { createBookRequest, onRequestClose } = this.props;
    const { book_title, author } = this.state;

    createBookRequest(book_title, author);

    onRequestClose();
  };

  render() {
    const { visible, onRequestClose } = this.props;
    const { book_title, author } = this.state;
    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>NOME</Text>
        <TextInput
          style={styles.input}
          autoFocusc
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={book_title}
          onChangeText={text => this.setState({ book_title: text })}
        />
        <Text style={styles.label}>AUTOR</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={author}
          onChangeText={text => this.setState({ author: text })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Adicionar Livro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancel} onPress={onRequestClose}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(BooksActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(UpdateBook);
