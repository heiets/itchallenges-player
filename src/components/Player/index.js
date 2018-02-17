import React from 'react';
import moment from 'moment';

import SongList from '../SongList';
import './Player.css';

const RADIUS = 200;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songDuration: 0,
            currentTime: 0,
            strokeDashoffset: CIRCUMFERENCE,
            strokeDasharray: CIRCUMFERENCE,
        };
    }
    componentDidMount() {
        window.moment = moment
        this.refs.audio.addEventListener('loadeddata', (audio) => {
            this.setState({
                songDuration: audio.target.duration,
            });
            setInterval(() => this.progress(), 1000);
        });
    }
    progress = () => {
        if (!this.props.isPaused) {
            this.refs.audio.play();
            this.props.setProgress(this.refs.audio.currentTime/this.state.songDuration);
            this.setState({
                strokeDashoffset: CIRCUMFERENCE * (1 - this.refs.audio.currentTime/this.state.songDuration),
                currentTime: this.refs.audio.currentTime,
            });
            if (this.state.songDuration === this.refs.audio.currentTime) {
                this.nextSong();
            }
        }
    }
    togglePause = () => {
        if (this.props.isPaused) {
            this.refs.audio.play();
        }
        else {
            this.refs.audio.pause();
        }
        this.props.togglePause();
    }
    clearProgress = () => {
        this.setState({
            strokeDashoffset: CIRCUMFERENCE,
            strokeDasharray: CIRCUMFERENCE,
        });
    }
    toggleList = () => {
        this.props.toggleList();
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
            strokeDashoffset,
            strokeDasharray,
        } = this.state;
        const progressStyle = {
            strokeDashoffset: strokeDashoffset,
            strokeDasharray: strokeDasharray,
        }
        return (
            <div className={`player-wrap ${this.props.isPlaylistShow ? 'player-wrapp--hide' : '' }`}>
                <audio
                    src={`${process.env.PUBLIC_URL}/music/${SongList[currentSong].songSrc}`}
                    ref='audio'
                />
                <div className="player">
                    <svg className="progress" width="400" height="400" viewBox="0 0 500 500">
                        <circle className="progress__meter" cx="250" cy="250" r="140" strokeWidth="2"/>
                        <circle className="progress__meter" cx="250" cy="250" r="200" strokeWidth="2"/>
                        <circle className="progress__value" cx="250" cy="250" r="200" strokeWidth="12" style={progressStyle}/>
                    </svg>
                    <div className="text">
                        <h1>{moment.utc(this.state.currentTime*1000).format('mm:ss')}</h1>
                        <h4>{SongList[currentSong].songName}</h4>
                        <h5>{SongList[currentSong].songAuthor}</h5>
                    </div>
                    <div className="buttons">
                        <button onClick={this.toggleList} className="player-icon icon-list">
                            <img src={`${process.env.PUBLIC_URL}/img/icons/playlist.svg`} alt="playlist"/>
                        </button>
                        <button onClick={this.togglePause} className="player-icon icon-play">
                            <img src={`${process.env.PUBLIC_URL}/img/icons/playpause.svg`} alt="play"/>
                        </button>
                        <button onClick={this.prevSong} className="player-icon icon-prev">
                            <img src={`${process.env.PUBLIC_URL}/img/icons/prev.svg`} alt="prev"/>
                        </button>
                        <button onClick={this.nextSong} className="player-icon icon-next">
                            <img src={`${process.env.PUBLIC_URL}/img/icons/next.svg`} alt="next"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
