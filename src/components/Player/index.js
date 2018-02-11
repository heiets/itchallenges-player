import React from 'react';

import SongList from '../SongList';
import Playlist from '../Playlist';
import './Player.css';

const RADIUS = 200;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songDuration: 0,
            progressSong: 0,
            currentTime: 0,
            isPaused: false,
            strokeDashoffset: CIRCUMFERENCE,
            strokeDasharray: CIRCUMFERENCE,
        };
    }
    componentDidMount() {
        this.refs.audio.addEventListener('loadeddata', (audio) => {
            this.setState({
                songDuration: audio.target.duration,
            });
            const interval = setInterval(() => this.progress(), 1000);
        });
    }
    progress = () => {
        if (!this.state.isPaused) {
            this.setState({
                strokeDashoffset: CIRCUMFERENCE * (1 - this.refs.audio.currentTime/this.state.songDuration),
                progressSong: this.refs.audio.currentTime/this.state.songDuration,
                currentTime: this.refs.audio.currentTime,
            });
        }
    }
    togglePause = () => {
        if (this.state.isPaused) {
            this.refs.audio.play();
        }
        else {
            this.refs.audio.pause();
        }
        this.setState({
            isPaused: !this.state.isPaused,
        });
    }
    clearProgress = () => {
        this.setState({
            // isPaused: true,
            strokeDashoffset: CIRCUMFERENCE,
            strokeDasharray: CIRCUMFERENCE,
        });
    }
    prevSong = () => {
        this.props.changeSong(this.props.currentSong - 1);
        this.clearProgress();
    };
    nextSong = () => {
        this.props.changeSong(this.props.currentSong + 1);
        this.clearProgress();
    };
    render() {
        const {
            currentSong,
        } = this.props;
        const {
            isPaused,
            strokeDashoffset,
            strokeDasharray,
            progressSong,
        } = this.state;
        const progressStyle = {
            strokeDashoffset: strokeDashoffset,
            strokeDasharray: strokeDasharray,
        }
        return (
            <div>
                <audio
                    src={`${process.env.PUBLIC_URL}/music/${SongList[currentSong].songSrc}`}
                    // autoPlay
                    controls
                    ref='audio'
                />
                <div className="player-wrap">
                    <svg className="progress" width="400" height="400" viewBox="0 0 500 500">
                        <circle className="progress__meter" cx="250" cy="250" r="140" strokeWidth="2"/>
                        <circle className="progress__meter" cx="250" cy="250" r="200" strokeWidth="2"/>
                        <circle className="progress__value" cx="250" cy="250" r="200" strokeWidth="12" style={progressStyle}/>
                    </svg>
                    <div className="text">
                        <h4>{this.state.currentTime}</h4>
                        <h5>{SongList[currentSong].songName}</h5>
                        <h6>{SongList[currentSong].songAuthor}</h6>
                    </div>
                    <div className="buttons">
                        <button onClick={this.togglePause} className="player-icon icon-list">
                            <img src={`${process.env.PUBLIC_URL}/img/icons/playlist.svg`}/>
                        </button>
                        <button onClick={this.togglePause} className="player-icon icon-play">
                            <img src={`${process.env.PUBLIC_URL}/img/icons/playpause.svg`}/>
                        </button>
                        <button onClick={this.prevSong} className="player-icon icon-prev">
                            <img src={`${process.env.PUBLIC_URL}/img/icons/prev.svg`}/>
                        </button>
                        <button onClick={this.nextSong} className="player-icon icon-next">
                            <img src={`${process.env.PUBLIC_URL}/img/icons/next.svg`}/>
                        </button>
                    </div>
                </div>
                <Playlist
                    progress={progressSong}
                />
            </div>
        );
    }
}

export default Player;
