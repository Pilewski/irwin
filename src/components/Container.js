/* eslint import/no-webpack-loader-syntax: 0 */
import React, { Component, PropTypes } from 'react';
import URL from './URL'
import Folder from './Folder'

class Container extends Component {
  render() {
    const { folders, selectedFolder, displayURLs, updateURLState, urls } = this.props
    const list = folders.map((folder) => {
      return (
        <Folder
          folder={folder}
          displayURLs={e => displayURLs(e)}
        />
      )
    })

    const filteredURLs = urls.filter((url) => {
      return url.folder_id == selectedFolder[0]
    })

    return (
      <div>
        <aside>
          <h1
            id="sidebar-title"
          >
            <a href="/">
              FOLDERS
            </a>
            <i className="material-icons">keyboard_arrow_down</i>
          </h1>
          <ul id="folders">
            {list}
          </ul>
        </aside>

        <h1 id="urls-title">
          {selectedFolder[1] ? `${selectedFolder[1]} URLS` : 'YOUR URLS'}
          <i className="material-icons">keyboard_arrow_down</i>
        </h1>
        <ul id="urls">
          {filteredURLs.length ? filteredURLs.map((url, i) => {
            return (
              <URL
                index={i}
                url={url}
                updateURLState={updateURLState}
              />
            )
          }) : ''}
          {selectedFolder.length && !filteredURLs.length ?
            <h4>No URLs in this folder. Enter one above in the URL field.</h4>
            : '' }
          {!selectedFolder.length && !filteredURLs.length ? urls.map((url, i) =>
            <URL
              index={i}
              url={url}
              updateURLState={updateURLState}
            />)
          : ''}
        </ul>
      </div>
    )
  }
}

Container.propTypes = {
  urls: PropTypes.array,
  folders: PropTypes.array,
  displayURLs: PropTypes.func,
  selectedFolder: PropTypes.array,
  updateURLState: PropTypes.func,
}

export default Container;
