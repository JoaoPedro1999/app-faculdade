import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "../../store/ducks/auth";

import PropTypes from "prop-types";

import {
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import styles from "./styles";

class SignIn extends Component {
  static propTypes = {
    signInRequest: PropTypes.func.isRequired
  };

  state = {
    email: "",
    password: ""
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const { signInRequest } = this.props;

    signInRequest(email, password);
  };

  render() {
    const { email, password } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
      >
        <View>
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.label}>E-MAIL</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            autoFocus
            returnKeyType="next"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
          <Text style={styles.label}>SENHA</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            returnKeyType="send"
            ref={el => {
              this.passwordInput = el;
            }}
            onSubmitEditing={this.handleSubmit}
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />
          <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
