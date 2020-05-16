import React, { Component } from 'react'

import {
  StatusBar,
  StyleSheet,
  FlatList,
  View
} from 'react-native'

import { connect } from 'react-redux'

import Header from '../components/Header'
import Post from '../components/Post'

import { fetchPosts } from '../store/actions/posts'


class Feed extends Component {

  componentDidMount = () => {
    this.props.onFetchPosts()
  }

  render = () => {
    return (
      <>
        <StatusBar barStyle='dark-content' backgroundColor='#f5fcff' />
        <View style={styles.container}>
          <Header navigation={this.props.navigation} />
          <FlatList
            data={this.props.posts}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => {
              return (
                <Post key={item.id} {...item} />
              )
            }} />
        </View>
      </>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts: posts.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  }
})