import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "../../store/ducks/auth";
import BookActions from "../../store/ducks/books";
import { View, Text, TouchableOpacity } from "react-native";
import SideMenu from "react-native-side-menu";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import ListSwitcher from "../../components/ListSwitcher";
import Books from "../../components/Books";

class Main extends Component {
  static propTypes = {
    activeList: PropTypes.shape({
      name: PropTypes.string
    })
  };

  static defaultProps = {
    activeList: null
  };

  state = {
    leftOpen: false
  };

  toggleMenu = (position, isOpen) => {
    this.setState({ [`${position}Open`]: isOpen });
  };

  render() {
    const { activeList, getBooksRequest } = this.props;
    const { leftOpen } = this.state;

    return (
      <View style={styles.backgroundWrapper}>
        <SideMenu
          isOpen={leftOpen}
          disableGesture
          onChange={isOpen => this.toggleMenu("left", isOpen)}
          openMenuOffset={70}
          menu={<ListSwitcher />}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                hitSlop={{ top: 10, botton: 10, left: 10, right: 10 }}
                onPress={() => this.toggleMenu("left", true)}
              >
                <Icon name="menu" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.teamTitle}>
                {activeList ? activeList.name : "Selecione uma lista"}
              </Text>
              <TouchableOpacity
                hitSlop={{ top: 10, botton: 10, left: 10, right: 10 }}
                onPress={() => getBooksRequest()}
              >
                <Icon name="refresh" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Books />
          </View>
        </SideMenu>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  activeList: state.lists.active
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...AuthActions, ...BookActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
