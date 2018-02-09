import React, { Component } from 'react';

import SongList from './SongList.js';
import './Background.css';

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSong: 0,
        };
    }
    handleChangeSong = (song) => () => {
        this.setState({ currentSong: song});
    };
    render() {
        return (
          <div className="Background">
              <div>
                  current song is: {SongList[this.state.currentSong].songName}
              </div>
              <button onClick={this.handleChangeSong(2)}>
                  click
              </button>
          </div>
        );
    }
}

export default Background;
