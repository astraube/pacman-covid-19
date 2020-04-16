import { STAGE_HEIGHT } from './constants';

export function cssPosition(position, gridSize) {
    return {
        left: (position[0] + 1.5) * gridSize,
        top: (STAGE_HEIGHT - position[1] - 3) * gridSize
    };
}

