import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Image } from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ListsActions from "../../store/ducks/lists";
import AuthActions from "../../store/ducks/auth";

import NewList from "../NewList";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";

class ListSwitcher extends Component {
  static propTypes = {
    getListsRequest: PropTypes.func.isRequired,
    lists: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        })
      )
    }).isRequired,
    isModalOpen: PropTypes.bool
  };

  state = {
    isModalOpen: false
  };

  componentDidMount() {
    const { getListsRequest } = this.props;

    getListsRequest();
  }

  toggleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  toggleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { lists, selectList, signOut } = this.props;
    const { isModalOpen } = this.state;
    return (
      <View style={styles.container}>
        {lists.data.map(list => (
          <TouchableOpacity
            key={list.id}
            style={styles.teamContainer}
            onPress={() => selectList(list)}
          >
            <Image
              style={styles.teamAvatar}
              source={{
                uri: `https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${
                  list.name
                }`
              }}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.newTeam} onPress={this.toggleModalOpen}>
          <Icon name="add" size={24} color="#999" />
        </TouchableOpacity>
        <NewList visible={isModalOpen} onRequestClose={this.toggleModalClose} />
        <TouchableOpacity style={styles.signOut} onPress={signOut}>
          <Icon name="clear" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...ListsActions, ...AuthActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListSwitcher);
