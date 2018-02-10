import React from 'react';

import SongList from './SongList.js';
import Player from '../Player';
import './Background.css';

class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSong: 0,
        };
    }
    handleChangeSong = (song) => {
        console.log('handleChangeSong');
        this.setState({ currentSong: song});
    };
    render() {
        return (
          <div className="Background">
              <div>
                  current song is: {SongList[this.state.currentSong].songName}
              </div>
              {/* <button onClick={this.handleChangeSong(2)}>
                  click
              </button> */}
              <Player
                currentSong={this.state.currentSong}
                changeSong={this.handleChangeSong}
              />
          </div>
        );
    }
}

export default Background;
