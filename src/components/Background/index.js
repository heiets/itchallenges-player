import React from 'react';

import SongList from '../SongList';
import Player from '../Player';
import Playlist from '../Playlist';
import './Background.css';

class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSong: 0,
            progressSong: 0,
            isPlaylistShow: false,
            isPaused: true,
        };
    }
    handleChangeSong = (songIndex) => {
        if (songIndex >= 0 && songIndex < Object.keys(SongList).length) {
            this.setState({ currentSong: songIndex});
        }
    };
    togglePause = () => {
        this.setState({
            isPaused: !this.state.isPaused,
        });
    }
    setProgress = (progress) => {
        this.setState({
            progressSong: progress,
        })
    }
    toggleList = () => {
        this.setState({
            isPlaylistShow: !this.state.isPlaylistShow,
        })
    }
    render() {
        const { currentSong, progressSong, isPlaylistShow, isPaused } = this.state;
        return (
          <div className="Background" style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/img/${SongList[currentSong].songBg})`,
          }}>
            <Player
                currentSong={this.state.currentSong}
                changeSong={this.handleChangeSong}
                setProgress={this.setProgress}
                toggleList={this.toggleList}
                togglePause={this.togglePause}
                isPlaylistShow={isPlaylistShow}
                isPaused={isPaused}
            />
            <Playlist
                changeSong={this.handleChangeSong}
                progress={progressSong}
                toggleList={this.toggleList}
                togglePause={this.togglePause}
                isPlaylistShow={isPlaylistShow}
                isPaused={isPaused}
            />
          </div>
        );
    }
}

export default Background;
