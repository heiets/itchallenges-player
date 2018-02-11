import React from 'react';

import SongList from '../SongList';
import './Playlist.css';

class Playlist extends React.Component {
    render() {
        const {
            progress,
        } = this.props;
        return (
            <div>
                <svg width="400" height="20" viewBox="0 0 400 20">
                    <line x1="0" y1="4" y2="4" x2="400" strokeWidth="4" stroke="gray" />
                    <line x1="0" y1="4" y2="4" x2={`${progress*100}%`} strokeWidth="8" stroke="white" />
                </svg>
            </div>
        );
    }
}

export default Playlist;
