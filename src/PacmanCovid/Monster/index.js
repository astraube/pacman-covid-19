import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cssPosition } from '../helpers';
import './style.scss';

function MonsterEye({ radius, offset, direction }) {
    const eyeballCenterX = radius * (1 + 0.4 * offset);
    const eyeballCenterY = radius * 0.7;
    const eyeballRadius = radius * 0.2;

    const reverse = (-1) ** ((direction < 2) >> 0);
    const vertical = direction % 2;
    const horizontal = 1 - vertical;

    const irisOffsetX = -horizontal * reverse;
    const irisOffsetY = vertical * reverse;

    const outerProps = {
        cx: eyeballCenterX,
        cy: eyeballCenterY,
        'r': eyeballRadius,
        fill: 'white'
    };

    const irisProps = {
        cx: eyeballCenterX + eyeballRadius / 2 * irisOffsetX,
        cy: eyeballCenterY + eyeballRadius / 2 * irisOffsetY,
        'r': eyeballRadius / 2,
        fill: 'black'
    };

    return (
        <g className="eye">
            <circle {...outerProps} />
            <circle {...irisProps} />
        </g>
    );
}

MonsterEye.propTypes = {
    radius: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    direction: PropTypes.number.isRequired
};

function getMonsterPath(radius) {
    const width = radius * 2;
    const height = radius * 2;
    const radiusSmall = radius / 5;

    return [
        `M${radius},0`,
        `A${radius},${radius} 0 0 1 ${width},${radius}`,
        `L${width},${height - radiusSmall}`,
        `A${radiusSmall},${radiusSmall} 0 0 1 ${width - radiusSmall * 2},${height - radiusSmall}`,
        `A${radiusSmall},${radiusSmall} 0 0 0 ${width - radiusSmall * 4},${height - radiusSmall}`,
        `A${radiusSmall},${radiusSmall} 0 0 1 ${width - radiusSmall * 6},${height - radiusSmall}`,
        `A${radiusSmall},${radiusSmall} 0 0 0 ${width - radiusSmall * 8},${height - radiusSmall}`,
        `A${radiusSmall},${radiusSmall} 0 0 1 ${width - radiusSmall * 10},${height - radiusSmall}`,
        `L0,${height - radiusSmall}`,
        `L0,${radius}`,
        `A${radius},${radius} 0 0 1 ${radius},0`
    ]
        .join(' ');
}

function getColor(eating, eatingFlash, color) {
    if (eating) {
        if (eatingFlash) {
            return '#c9a';
        }
        return '#06c';
    }
    return color;
}

function MonsterIcon({ ...props }) {
    const { gridSize, eating, eatingFlash, position, direction, color } = props;
    const radius = gridSize * 0.75;
    const monsterSize = gridSize + 10;
    //const monsterPath = getMonsterPath(radius);
    const pathProps = {
        stroke: 'none',
        fill: getColor(eating, eatingFlash, color)
    };

    const style = {
        ...cssPosition(position, gridSize),
        width: monsterSize,
        height: monsterSize,
        marginLeft: -radius,
        marginTop: -radius
    };

    return (
        <svg className="pacmancovid-monster" viewBox="0 0 18 18" style={style}>
          <path
            {...pathProps}
            d="M9.15 6.495a.657.657 0 10.008 1.315.665.665 0 00.663-.661.665.665 0 00-.672-.654zM10.481 8.724c-.13.004-.202.086-.199.218.003.133.08.2.214.207.127-.008.208-.077.208-.207 0-.14-.083-.222-.223-.218zM8.707 9.614c-.127-.001-.211.08-.214.21-.002.14.084.226.221.222.126-.004.202-.085.203-.227-.005-.127-.084-.203-.21-.205z"
          />
          <path
            {...pathProps}
            d="M8.917 3.56a5.308 5.308 0 100 10.616 5.308 5.308 0 000-10.617zm-.195 6.674c-.257.008-.418-.154-.413-.417.004-.243.162-.394.4-.39.235.002.384.144.393.383-.002.266-.144.417-.38.424zm.436-2.162a.919.919 0 11-.01-1.839.93.93 0 01.937.914.93.93 0 01-.927.925zm1.34 1.256c-.247-.014-.389-.137-.394-.382-.005-.243.127-.393.367-.4.257-.008.412.143.411.4 0 .24-.15.367-.384.382z"
          />
          <path
            {...pathProps}
            d="M10.252 1.106C10.252.494 9.765.005 9.153 0a1.112 1.112 0 00-1.12 1.11c0 .45.282.846.673 1.019l-.005 1.577s.321-.07.883 0V2.129c.394-.172.669-.567.668-1.023zM16.793 7.649a1.108 1.108 0 00-1.024.677l-1.593-.006s.07.321 0 .883h1.594c.169.392.557.666 1.012.668A1.115 1.115 0 0017.9 8.756a1.122 1.122 0 00-1.107-1.107zM9.578 15.665l.006-1.597s-.321.07-.883 0v1.602a1.127 1.127 0 00-.668 1.029 1.111 1.111 0 001.112 1.097c.62 0 1.111-.496 1.107-1.118a1.116 1.116 0 00-.674-1.013zM3.698 8.497h-1.59A1.112 1.112 0 000 8.987c0 .602.5 1.105 1.103 1.11.479.004.888-.297 1.046-.723l1.55.006s-.07-.322 0-.883zM4.069 3.197a1.338 1.338 0 00-1.21-1.899 1.33 1.33 0 00-1.331 1.33 1.33 1.33 0 001.928 1.197l2.521 2.53s.117-.338.625-.625L4.069 3.197zM15.456 2.268a.954.954 0 00-.956.955.94.94 0 00.1.416l-1.877 1.667s.235.096.418.469l1.907-1.7a.948.948 0 10.407-1.808zM15.952 14.01a1.315 1.315 0 00-.624.153L12.8 11.627s-.116.337-.624.624l2.551 2.551c-.077.17-.12.356-.117.552a1.337 1.337 0 001.34 1.322 1.328 1.328 0 001.329-1.33c0-.735-.594-1.333-1.326-1.337zM6.887 12.372s-.338-.117-.625-.625l-2.536 2.537a1.31 1.31 0 00-.603-.145 1.333 1.333 0 00-1.328 1.335 1.335 1.335 0 002.667.013 1.305 1.305 0 00-.125-.573l2.55-2.542z"
          />
          <MonsterEye radius={radius} direction={direction} offset={-0.5} />
        </svg>
    );
}

MonsterIcon.propTypes = {
    eating: PropTypes.bool.isRequired,
    eatingFlash: PropTypes.number,
    gridSize: PropTypes.number.isRequired,
    position: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
    direction: PropTypes.number.isRequired
};

export default class Monster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eatingFlash: 0,
            timerFlash: this.getTimerFlash()
        };
    }
    getTimerFlash() {
        if (this.state) {
            clearInterval(this.state.timerFlash);
        }

        if (!this.props.eatingTime) {
            return null;
        }

        return setInterval(() => {
            this.setState({ eatingFlash: (this.state.eatingFlash + 1) % 2 });
        }, 500);
    }
    componentDidUpdate(prevProps) {
        if ((this.props.eatingTime > 0 && prevProps.eatingTime === 0) ||
            (this.props.eatingTime === 0 && prevProps.eatingTime > 0)) {

            this.setState({ timerFlash: this.getTimerFlash() });
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.timerFlash);
    }
    static propTypes = {
        gridSize: PropTypes.number.isRequired,
        position: PropTypes.array.isRequired,
        direction: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        eatingTime: PropTypes.number.isRequired,
        deadTime: PropTypes.number.isRequired
    };
    render() {
        if (this.props.deadTime > 0) {
            return null;
        }

        const { eatingTime, ...props } = this.props;
        const eating = eatingTime > 0;

        return (
            <MonsterIcon eating={eating} {...props} {...this.state} />
        );
    }
}
