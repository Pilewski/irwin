/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component } from 'react';
import axios from 'axios'
import './styles/Reset.css'
import './styles/App.css'
import Input from './components/Input'
import Container from './components/Container'

class App extends Component {
  constructor() {
    super()
    this.state = {
      folders: [],
      urls: [],
      folderInput: '',
      urlInput: '',
      selectedFolder: [],
      filteredURLs: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/folders')
    .then(response => this.setState({ folders: response.data }))
    .catch(error => console.error(error))

    axios.get('http://localhost:3001/urls')
    .then(response => this.setState({ urls: response.data }))
    .catch(error => console.error(error))
  }

  handleChange(location, param) {
    const userInput = location.target.value;
    const key = param;
    key === 'folderInput' ? this.setState({ folderInput: userInput }) : this.setState({ urlInput: userInput })
  }

  updateSelectedFolder(folder_id, title) {
    this.setState({ selectedFolder: [folder_id, title] })
  }

  addFolder() {
    const folder = this.state.folderInput

    axios.post(('http://localhost:3001/folders'), { title: folder })
    .then((response) => {
      this.state.folders.push(response.data)
      this.setState({
        folders: this.state.folders,
      })
    })
    .catch(error => console.error(error))

    this.setState({ folderInput: '' })
  }

  addURLToFolder() {
    const folder_id = this.state.selectedFolder[0]
    const url = this.state.urlInput

    axios.post((`http://localhost:3001/urls/${folder_id}`), { url })
    .then((response) => {
      this.state.urls.push(response.data)
      this.setState({
        urls: this.state.urls,
      })
    })
    .then(() => {
      const urls = this.state.urls.filter(item => item.folder_id == this.state.selectedFolder[0])
      this.setState({ filteredURLs: urls })
    })

    this.setState({ urlInput: '' })
  }

  displayURLs(location) {
    const id = location.target.id
    const title = location.target.innerHTML

    this.updateSelectedFolder(id, title)

    const urls = this.state.urls.filter(item => item.folder_id == id)
    this.setState({ filteredURLs: urls })
  }


  render() {
    const { folders, urls, folderInput, urlInput, selectedFolder, filteredURLs } = this.state
    return (
      <div className="App">
        <h1 id="app-title">
          WELCOME TO <span id="cursive">IRWIN</span> : <br/> YOUR FAVORITE URL SHORTENER
        </h1>

        <section>
          <Input
            id="add-folder-input"
            btnid="add-folder-button"
            folderInput={folderInput}
            placeholder="Enter a folder"
            buttonText="ADD FOLDER"
            handleChange={(e, param) => this.handleChange(e, param)}
            addMethod={() => this.addFolder()}
            param="folderInput"
            selectedFolder={selectedFolder}
          />
          <Input
            id="add-url-input"
            btnid="add-url-button"
            folderInput={urlInput}
            placeholder="www.yoururl.com"
            buttonText="ADD URL"
            handleChange={(e, param) => this.handleChange(e, param)}
            addMethod={() => this.addURLToFolder()}
            param="urlInput"
            selectedFolder={selectedFolder}
          />
        </section>

        <Container
          folders={folders}
          updateFolderState={(folder_id, title) => this.updateSelectedFolder(folder_id, title)}
          urls={urls}
          selectedFolder={selectedFolder}
          filteredURLs={filteredURLs}
          displayURLs={(e) => this.displayURLs(e)}
        />
      </div>
    )
  }
}

export default App;
