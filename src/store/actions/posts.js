import {
  ADD_COMMENT,
  SET_POSTS,
  CREATING_POST,
  POST_CREATED
} from './action.types'

import axios from 'axios'
import { setMessage } from './message'

export const addPost = post => {

  return async (dispatch, getState) => {
    try {
      dispatch(creatingPost())
      const resUpload = await axios({
        url: 'uploadImage',
        baseURL: 'https://us-central1-insta-c699b.cloudfunctions.net',
        method: 'post',
        data: {
          image: post.image.base64
        }
      })

      post.image = resUpload.data.imageUrl

      const resPost = await axios.post(`/posts.json?auth=${getState().user.token}`, {
        ...post
      })
      dispatch(fetchPosts())
      dispatch(postCreated())

    } catch (err) {

      dispatch(postCreated())
      dispatch(setMessage({
        title: 'Atenção',
        text: 'Erro ao criar post!'
      }))
      console.log(err)
    }
  }
}

export const addComment = payload => {

  return async (dispatch, getState) => {
    try {
      const resGetPost = await axios.get(`/posts/${payload.postId}.json`)

      const comments = resGetPost.data.comments || []

      comments.push(payload.comment)
      
      const resUpdatePost = await axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })

      dispatch(fetchPosts())

    } catch (err) {
      dispatch(setMessage({
        title: 'Atenção',
        text: 'Erro ao adicionar comentário!'
      }))
      console.log('erro server', err)
    }
  }
}

export const fetchPosts = () => {
  return async dispatch => {
    try {
      const resPost = await axios.get('/posts.json')
      const posts = []
      for (let key in resPost.data) {
        posts.push({
          ...resPost.data[key],
          id: key
        })
      }
      dispatch(setPosts(posts.reverse()))
    } catch (err) {
      dispatch(setMessage({
        title: 'Atenção',
        text: 'Erro ao buscar conteudo!'
      }))
      console.log(err)
    }

  }
}

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    payload: posts
  }
}

export const creatingPost = () => {
  return {
    type: CREATING_POST,
  }
}

export const postCreated = () => {
  return {
    type: POST_CREATED
  }
}