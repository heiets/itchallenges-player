import React from 'react';

class Player extends React.Component {
    prevSong = () => {
        this.props.changeSong(this.props.currentSong - 1);
    };
    nextSong = () => {
        this.props.changeSong(this.props.currentSong + 1);
    };
    render() {
        return (
          <div>
              <button onClick={this.prevSong}>
                  prev
              </button>
              <button onClick={this.nextSong}>
                  next
              </button>
          </div>
        );
    }
}

export default Player;
