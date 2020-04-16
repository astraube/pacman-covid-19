import React from 'react';
import PropTypes from 'prop-types';
import { STAGE_WIDTH, STAGE_HEIGHT } from '../constants';
import Walls from './Walls';
import './style.scss';

export default function Stage(props) {
    const { gridSize } = props;

    const stageWidth = gridSize * STAGE_WIDTH;
    const stageHeight = gridSize * STAGE_HEIGHT;

    return (
        <div className="pacmancovid-stage">
            <svg width={stageWidth} height={stageHeight}>
                <rect x={0} y={0} width={stageWidth} height={stageHeight} fill="#000" />
                <Walls {...props} />
            </svg>
        </div>
    );
}

Stage.propTypes = {
    gridSize: PropTypes.number.isRequired
};

