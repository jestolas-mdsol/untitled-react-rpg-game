import React, { Component } from 'react';
import PropTypes from 'prop-types';
import animation from './animation';

import styles from './style.scss';
// import playerSprite from '../../images/playerSprites.png';

export default class Game extends Component {
  state = {
    playerIsMoving: false,
    playerXPos: 320,
    playerYPos: 320,
    playerSpriteX: 0,
    playerSpriteY: 0,
    playerXMultiplier: 41,
    playerYMultiplier: 36,
    movementDirection: null,
    posDelta: 20,
    movementIntervalId: null,

  }

  // transfer movement logic into tween animatio

  movePlayer = (keyCode) => {
    if (keyCode === 87) {
      this.setState({
        playerYPos: this.state.playerYPos - this.state.posDelta,
        playerIsMoving: true,
        movementDirection: 'up',
        playerSpriteX: this.state.playerXMultiplier * 1,
        playerSpriteY: this.state.playerYMultiplier * 2,
      })
    } else if (keyCode === 83) {
      this.setState({
        playerYPos: this.state.playerYPos + this.state.posDelta,
        playerIsMoving: true,
        movementDirection: 'down',
        playerSpriteX: 0,
        playerSpriteY: 0,
      })
    } else if (keyCode === 65) {
      this.setState({
        playerXPos: this.state.playerXPos - this.state.posDelta,
        playerIsMoving: true,
        movementDirection: 'right',
        playerSpriteX: this.state.playerXMultiplier * 1,
        playerSpriteY: this.state.playerYMultiplier * 1,
      })
    } else if (keyCode === 68) {
      this.setState({
        playerXPos: this.state.playerXPos + this.state.posDelta,
        playerIsMoving: true,
        movementDirection: 'left',
        playerSpriteX: this.state.playerXMultiplier * 1,
        playerSpriteY: this.state.playerYMultiplier * 3,
      })
    }
  }

  handleKeyDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.persist();

    if (this.state.playerIsMoving) {
      return false
    }

    if (!this.state.movementIntervalId) {
      this.setState({
        movementIntervalId: setInterval(() => { this.movePlayer(e.keyCode) }, 100),
      });
    } else {
      this.movePlayer(e.keyCode);
    }
  }

  handleKeyUp = (e) => {
    console.log('key up! ', e.keyCode);
    this.handleClearInterval();

    this.setState({
      playerIsMoving: false,
      movementDirection: null,
      movementIntervalId: null,
    });
  }

  handleClearInterval = () => {
    clearInterval(this.state.movementIntervalId);
  }

  render() {
    return (
      <div
        className={styles.gameContainer}
        tabIndex="0"
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        <div
          className={styles.playerContainer}
          style={{
            left: this.state.playerXPos,
            top: this.state.playerYPos,
            backgroundPositionX: this.state.playerSpriteX,
            backgroundPositionY: this.state.playerSpriteY,
          }}
        >
        </div>
      </div>
    );
  }
}
