import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ListsActions from "../../store/ducks/lists";
import Modal from "../Modal";
import styles from "./styles";

class NewList extends Component {
  state = {
    name: ""
  };

  handleSubmit = () => {
    const { createListRequest, onRequestClose } = this.props;
    const { name } = this.state;

    createListRequest(name);

    onRequestClose();
  };

  render() {
    const { visible, onRequestClose } = this.props;
    const { name } = this.state;
    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>NOME</Text>
        <TextInput
          style={styles.input}
          autoFocus
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={name}
          onChangeText={text => this.setState({ name: text })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Criar Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancel} onPress={onRequestClose}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(ListsActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(NewList);
