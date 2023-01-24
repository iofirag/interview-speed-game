import { Box, Button, CardActions, CardContent, CardMedia, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { GameResultPath, GameState, HostUrl, LevelStateType, ShapeSide } from './utils/constants';
import { randomIntFromInterval } from './utils/helpers';


export default function App() {
    const [name, setName] = useState<string>('');
    const [isNameError, setIsNameError] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [gameState, setGameState] = useState<string>('');
    const [shapeSide, setShapeSide] = useState<string>();
    const [levelInfo, setLevelInfo] = useState<any>({})
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [level, setLevel] = useState<number>(0);
    const [id, setId] = useState<NodeJS.Timer>();

    const userAnswerRef = useRef(userAnswer)
    const levelRef = useRef(level)
    const levelInfoRef = useRef(levelInfo)


    useEffect(() => {
        levelRef.current = level;
        userAnswerRef.current = userAnswer
        levelInfoRef.current = levelInfo
    }, [level, userAnswer, levelInfo])

    useEffect(() => {
        const callback = () => {
            if (levelInfoRef.current.state === LevelStateType.Success.state || levelRef.current === 0) {
                // Change image side 
                const screenSide = Math.random() > 0.5 ? ShapeSide.Right : ShapeSide.Left;
                setShapeSide(screenSide)
                setUserAnswer('')
                setLevel(prev => prev + 1)
                setLevelInfo({})
            } else {
                if (!userAnswerRef.current && levelRef.current) {
                    // Too Late
                    setLevelInfo(LevelStateType.Error3)
                    setGameState(GameState.GameOver)
                } else {
                    // Wrong Key
                    setGameState(GameState.GameOver)
                }
            }
        }

        if (gameState === GameState.Loading) {
            if (userAnswer) {
                setLevelInfo(LevelStateType.Error1)
                setGameState(GameState.GameOver)
            }
            if (!id) {
                const LoadingTime = randomIntFromInterval(2000, 5000)
                const id = setTimeout(() => {
                    setGameState(GameState.Started)
                    setId(undefined)
                }, LoadingTime)
                setId(id)
            }
        } else if (gameState === GameState.Started) {
            if (!id) {
                const id = setInterval(callback, 1000)
                setId(id)
            }
            if (userAnswer && shapeSide) {
                if ((userAnswer === 'a' && shapeSide === ShapeSide.Left)
                    || (userAnswer === 'l' && shapeSide === ShapeSide.Right)) {
                    setLevelInfo(LevelStateType.Success)
                } else {
                    setLevelInfo(LevelStateType.Error2)
                }
            }
        } else if (gameState === GameState.GameOver) {
            if (id) {
                clearTimeout(id)
                setId(undefined)
                setIsModalOpen(true)
                fetch(`${HostUrl}${GameResultPath}`, { method: 'POST', body: JSON.stringify({ level, name }) })
                    .then((res) => console.log)
                    .catch(error => console.error)
            }
        }
    }, [gameState, id, userAnswer, shapeSide, level, levelInfo.state, name])

    const onChangeName = (event: any) => {
        setName(event.target.value)
        setIsNameError(!event.target.value)
    }

    const onRestartClick = () => {
        if (!name) {
            setIsNameError(true)
            return
        }
        setGameState(GameState.Loading)
        setShapeSide('')
        setLevelInfo({})
        setUserAnswer('')
        setLevel(0)
        setId(undefined)
        initWindowListener()
    }

    const initWindowListener = () => {
        document.removeEventListener('keypress', () => { })
        document.addEventListener('keypress', e => {
            setUserAnswer(_ => e.key.toLowerCase())
        });
    }

    let answerClass = ''
    if (levelInfo.state === LevelStateType.Success.state) answerClass = 'hit'
    if (levelInfo.state === LevelStateType.Error1.state) answerClass = 'fail'

    return (
        <div className="App">
            {/* Header */}
            <h1>Speed-Game</h1>

            {/* Details */}
            <div>
                <TextField id="outlined-basic" label="Name" variant="outlined"
                    onChange={onChangeName}
                    required={true}
                    error={isNameError}
                    value={name}
                    disabled={[GameState.Loading, GameState.Started].includes(gameState)} />
                <Button variant="contained"
                    className='start-game-button'
                    onClick={onRestartClick}
                    disabled={[GameState.Loading, GameState.Started].includes(gameState)}>Start Game!</Button>
            </div>

            {/* Image Viewer */}
            {gameState === GameState.Loading &&
                <div>Loading...</div>
            }
            {gameState === GameState.Started && shapeSide &&
                <div>
                    <div>Level:<span>{level}</span></div>
                    <div className={`${shapeSide}-image ${answerClass}`}>
                        <img src="/gift.png" className="image" alt="" />
                    </div>
                </div>
            }

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <CardMedia
                        sx={{ height: 190 }}
                        image="/game-over.png"
                        title="Record"
                    />

                    <CardContent>
                        <Typography variant="h3" color="text.primary">
                            {levelInfo.message}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                            Level: {level} ({name})
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Records Page</Button>
                    </CardActions>
                </Box>

            </Modal>
        </div>
    )
};

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
