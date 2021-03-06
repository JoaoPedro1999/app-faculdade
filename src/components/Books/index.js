import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BookActions from "../../store/ducks/books";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import NewBook from "../NewBook";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";

class Books extends Component {
  static propTypes = {
    books: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string
        })
      )
    }).isRequired,
    isCreateModalOpen: PropTypes.bool,
  };

  state = {
    isCreateModalOpen: false
  };

  componentDidMount() {
    const { getBooksRequest, activeList } = this.props;

    if (activeList) {
      getBooksRequest();
    }
  }

  toggleCreateModalOpen = () => {
    this.setState({ isCreateModalOpen: true });
  };

  toggleCreateModalClose = () => {
    this.setState({ isCreateModalOpen: false });
  };


  render() {
    const { books, activeList, deleteBookRequest } = this.props;
    const { isCreateModalOpen } = this.state;

    if (!activeList) return null;

    return (
      <View style={styles.container}>
        {books.data.length === 0 ? (
          <Text style={styles.information}>
            Ops... Você não tem nenhum livro nesta lista! Clique no botão e
            adicone um novo livro
          </Text>
        ) : (
          <FlatList
            contentContainerStyle={styles.projectsList}
            data={books.data}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.projectContainer}>
                <Text style={styles.projectTitle}>{item.book_title}</Text>
                <Text style={styles.projectTitle}>{item.author}</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    onPress={() => deleteBookRequest(item.id)}
                    style={styles.buttonOption}
                  >
                    <Icon name="clear" size={28} color="#e04848" />
                    <Text style={styles.projectTitle}>Apagar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
        <TouchableOpacity
          style={styles.newProjectButton}
          onPress={this.toggleCreateModalOpen}
        >
          <Icon name="add" size={28} color="#fff" />
        </TouchableOpacity>
        <NewBook
          visible={isCreateModalOpen}
          onRequestClose={this.toggleCreateModalClose}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
  activeList: state.lists.active,
  list: state.list
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(BookActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books);
