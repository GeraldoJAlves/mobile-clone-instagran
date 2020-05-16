import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Alert
} from 'react-native'

import { connect } from 'react-redux'

import ImagePicker from 'react-native-image-picker'
import Spinner from 'react-native-loading-spinner-overlay'

import { addPost } from '../store/actions/posts'

const noUser = 'Você precisa estar logado para adicionar imagens'

class AddPhoto extends Component {

  state = {
    image: null,
    comment: '',
  }

  componentDidUpdate = prevProps => {
    if (prevProps.loading && !this.props.loading) {
      this.setState({
        image: null,
        comment: ''
      })

      this.props.navigation.navigate('Feed')
    }
  }

  pickImage = () => {

    if (!this.props.name) {
      Alert.alert('Falha!', noUser)
      return
    }

    ImagePicker.showImagePicker({
      title: 'Escolha a imagem',
      takePhotoButtonTitle: 'Tirar Foto...',
      chooseFromLibraryButtonTitle: 'Escolher Foto',
      maxHeight: 600,
      maxWidth: 800
    }, res => {
      if (!res.didCancel) {
        this.setState({ image: { uri: res.uri, base64: res.data } })
      }
    })
  }

  save = async () => {

    if (!this.props.name) {
      Alert.alert('Falha!', noUser)
      return
    }

    if (!this.state.image) {
      Alert.alert('Falha!', 'Selecione uma imagem para postar')
      return
    }

    const post = {
      id: Math.random(),
      nickname: this.props.name,
      email: this.props.email,
      image: this.state.image
    }

    if (this.state.comment.trim()) {
      post.comments = [{
        nickname: this.props.name,
        comment: this.state.comment
      }]
    }

    this.props.onAddPost(post)

  }

  render = () => {
    return (
      <ScrollView>
        <View style={styles.container} >
          <Spinner
            visible={this.props.loading}
            animation='fade'
            overlayColor='rgba(0,0,0,0.8)'
            textContent={'Salvando...'}
            textStyle={styles.spinnerTextStyle}
          />
          <Text style={styles.title} >Compartilhe uma imagem</Text>
          <View style={styles.imageContainer}>
            <Image source={this.state.image} style={styles.image} />
          </View>
          <TouchableOpacity onPress={this.pickImage} style={styles.buttom} >
            <Text style={styles.buttomText} >Escolha a foto</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            editable={!!this.props.name}
            placeholder='Algum comentario para a foto'
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })} />
          <TouchableOpacity
            onPress={this.save}
            disabled={this.props.loading}
            style={styles.buttom}>
            <Text style={styles.buttomText} >Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ user, posts }) => {
  return {
    ...user,
    loading: posts.isUploading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => dispatch(addPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS == 'ios' ? 30 : 10,
    fontWeight: 'bold'
  },
  imageContainer: {
    width: '90%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#EEE',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    resizeMode: 'center'
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF'
  },
  buttonDisabled: {
    backgroundColor: '#AAA'
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4'
  },
  input: {
    marginTop: 20,
    width: '90%'
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
})