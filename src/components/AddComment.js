import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'

import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome'
import { addComment } from '../store/actions/posts'

class AddComment extends Component {

  state = {
    comment: '',
    editMode: false
  }

  handleAddComment = () => {
    this.props.onAddComment({
      postId: this.props.postId,
      comment: {
        nickname: this.props.name,
        comment: this.state.comment
      }
    })

    this.setState({
      comment: '',
      editMode: false
    })
  }

  render = () => {

    let commentArea = null

    if (this.state.editMode) {
      commentArea = (
        <View style={styles.container}>
          <TextInput
            placeholder='Pode comentar...'
            style={styles.input} autoFocus={true}
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            onSubmitEditing={this.handleAddComment} />
          <TouchableWithoutFeedback
            onPress={() => this.setState({ editMode: false })} >
            <Icon name='times' size={15} color='#555' />
          </TouchableWithoutFeedback>

        </View>
      )
    } else {
      commentArea = (
        <TouchableWithoutFeedback
          onPress={() => this.setState({ editMode: true })} >
          <View style={styles.container}>
            <Icon name='comment-o' size={15} color='#555' />
            <Text style={styles.caption} >Adicione um comentário...</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }

    return (
      <View style={{ flex: 1 }} >
        {commentArea}
      </View>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    ...user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddComment: comment => dispatch(addComment(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  caption: {
    marginLeft: 10,
    fontSize: 12,
    color: '#CCC'
  },
  input: {
    width: '90%'
  }
})