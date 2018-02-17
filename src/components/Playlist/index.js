import React from 'react';

import SongList from '../SongList';
import './Playlist.css';

class Playlist extends React.Component {
    toggleList = () => {
        this.props.toggleList();
    };
    changeSong = (index) => () => {
        this.props.toggleList();
        this.props.changeSong(index);
    }
    render() {
        const {
            progress,
        } = this.props;
        return (
            <div className={`playlist-wrap ${!this.props.isPlaylistShow ? 'playlist-wrapp--hide' : '' }`}>
                <svg width="400" height="20" viewBox="0 0 400 20">
                    <line x1="0" y1="10" y2="10" x2="400" strokeWidth="2" stroke="white" />
                    <line x1="0" y1="10" y2="10" x2={`${progress*100}%`} strokeWidth="4" stroke="white" />
                </svg>
                <button onClick={this.toggleList} className='player-icon icon-close-list'>
                    <img src={`${process.env.PUBLIC_URL}/img/icons/close.svg`} alt="list"/>
                </button>
                <div className='separator' />
                <div className='list-wrap'>
                    {
                        Object.keys(SongList).map((key, index) => (
                            <button key={index} onClick={this.changeSong(index)} className='list-item'>
                                <h4>{SongList[key].songName}</h4>
                                <h5>{SongList[key].songAuthor}</h5>
                            </button>
                        ))
                    }
                </div>
                <div className='separator' />
            </div>
        );
    }
}

export default Playlist;
