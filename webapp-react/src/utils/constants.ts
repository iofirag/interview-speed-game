export const GameState = {
  Loading: 'Loading',
  Started: 'Started',
  GameOver: 'GameOver',
};

export const ShapeSide = {
  Left: 'left',
  Right: 'right',
};

export const LevelStateType = {
  Error1: {
    state: 'Mistake',
    message: 'Too Soon',
    messageInfo: 'User taps any key in the waiting state',
  },
  Error2: {
    state: 'Mistake',
    message: 'Wrong Key',
    messageInfo: 'User taps an incorrect key in the indicator showing state',
  },
  Error3: {
    state: 'Mistake',
    message: 'Too Late',
    messageInfo: 'The indicator disappears before the user types any key',
  },
  Success: {
    state: 'Success',
  },
};

export const HostUrl: string = 'http://localhost:3001';
export const HostPath: string = '/api/v1';
export const GameResultPath: string = '/game-result';
