import React from 'react';

class Player extends React.Component {
    changeSong = () => {
        console.log('changeSong');
        this.props.changeSong(this.props.currentSong + 1);
    };
    render() {
        return (
          <div>
              <button onClick={this.changeSong}>
                  CHANGE
              </button>
          </div>
        );
    }
}

export default Player;
