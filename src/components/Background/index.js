import React from 'react';

import SongList from '../SongList';
import Player from '../Player';
import './Background.css';

class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSong: 0,
        };
    }
    handleChangeSong = (songIndex) => {
        console.log(songIndex);
        if (songIndex > 0 && songIndex < Object.keys(SongList).length) {
            this.setState({ currentSong: songIndex});
        }
    };
    render() {
        const { currentSong } = this.state;
        return (
          <div className="Background" style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/img/${SongList[currentSong].songBg})`,
          }}>
              <div>
                  current song is: {SongList[this.state.currentSong].songName}
              </div>
              <Player
                currentSong={this.state.currentSong}
                changeSong={this.handleChangeSong}
              />
          </div>
        );
    }
}

export default Background;
