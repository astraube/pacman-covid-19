import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PLAYER_RADIUS } from '../constants';
import { cssPosition } from '../helpers';
import './style.scss';

const ANIMATION_SPEED = 30;
const initialState = {
  angle: 1,
  timerBite: null,
  timerLose: null,
};

function pacmanPath(radius, angle, offset) {
  if (!angle) {
    return [
      `M0,${radius}`,
      `A${radius},${radius} 0 1 0 ${radius * 2},${radius}`,
      `A${radius},${radius} 0 1 0 0,${radius}`
    ]
      .join(' ');
  }

  const offsetX = radius * Math.cos(angle / 2);
  const offsetY = radius * Math.sin(angle / 2);

  const polarity = (-1) ** Math.floor(offset / 2);

  const m00 = ((offset + 1) % 2) * polarity;
  const m01 = (offset % 2) * polarity;

  const biteX1 = offsetX * m00 - offsetY * m01;
  const biteY1 = -offsetX * m01 - offsetY * m00;
  const biteX2 = offsetX * m00 + offsetY * m01;
  const biteY2 = -offsetX * m01 + offsetY * m00;

  const arcFlag = (angle < Math.PI) >> 0;

  return [
    `M${radius},${radius}`,
    `L${radius + biteX1},${radius + biteY1}`,
    `A${radius},${radius}`,
    `0 ${arcFlag} 0`,
    `${radius + biteX2},${radius + biteY2}`,
    `L${radius},${radius}`
  ]
    .join(' ');
}

function calcAngle(isRunning, startTime) {
  return (isRunning) ? (1 + 0.5 * Math.sin((Date.now() - startTime) / 50)) : 1
}

function calcAngleLose({ angle }) {
  return Math.min(Math.PI * 2, angle + 0.1)
}

export default class Player extends Component {

  constructor(props) {
    super(props);

    this.state = initialState;

    // Aqui utilizo o `bind` para que o `this` funcione dentro d0 callback
    this.handleTheEnd = this.handleTheEnd.bind(this);
  }

  componentDidMount() {
    this.startTime = Date.now();
    this.setState({
      timerBite: setInterval(() => this.setState({
        angle: calcAngle(this.props.isRunning, this.startTime)
      }), ANIMATION_SPEED)
    });
  }

  timerReset({timerBite, timerLose}) {
    clearInterval(timerBite);
    clearTimeout(timerLose);
  }

  componentWillUnmount() {
    this.timerReset(this.state)
  }

  componentDidUpdate(prevProps) {
    // console.log('Player - componentDidUpdate')

    if (!prevProps.lost && this.props.lost) {
      this.timerReset(this.state)
      this.setState({ angle: 0, timerLose: this.onLoseAnimation() });
    }
  }

  onLoseAnimation() {
    if (this.state.angle < Math.PI * 2) {
      return setTimeout(() => {
        this.setState({
          angle: calcAngleLose(this.state),
          timerLose: this.onLoseAnimation()
        });
      }, ANIMATION_SPEED);
    }

    setImmediate(() => this.handleTheEnd());

    return null;
  }

  /*
  static getDerivedStateFromProps(props, state) {
    // Sempre quando mudar o estado de STOP para RUN ...
    if (props.isRunning !== state.isRunning) {
      //console.log('getDerivedStateFromProps props: ', props.isRunning)
      //console.log('getDerivedStateFromProps state: ', state.isRunning)
      return {
        isRunning: props.isRunning
      };
    }
    return null;
  }*/

  handleTheEnd() {
    if (this.props.onEnd) {
      this.props.onEnd()
    }

    this.componentWillUnmount()
    this.setState(initialState)
    this.componentDidMount()
  }

  render() {
    const { gridSize, lost, position, direction } = this.props;

    const pathProps = {
      stroke: 'none',
      fill: 'yellow'
    };

    const radius = gridSize * PLAYER_RADIUS;

    const style = {
      ...cssPosition(position, gridSize),
      width: radius * 2,
      height: radius * 2,
      marginLeft: -radius,
      marginTop: -radius
    };

    const offset = lost ? 1 : direction;

    return (
      <svg className="pacmancovid-player" style={style}>
          <path d={pacmanPath(radius, this.state.angle, offset)} {...pathProps} />
      </svg>
    );
  }
}

Player.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  animate: PropTypes.bool,
  gridSize: PropTypes.number.isRequired,
  lost: PropTypes.bool.isRequired,
  position: PropTypes.array.isRequired,
  direction: PropTypes.number.isRequired,
  onEnd: PropTypes.func
};
