import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { CustomModal } from './components/CustomModal';
import { GameOverView } from './components/GameOverView/GameOverView';
import { HeaderDetails } from './components/HeaderDetails/HeaderDetails';
import { randomIntFromInterval } from './utils/helpers';
import { GameResultPath, GameState, HostPath, HostUrl, LevelStateType, ShapeSide } from './utils/constants';
import { CustomShape } from './components/CustomShape/CustomShape';
import { ShapeViewer } from './components/ShapeViewer/ShapeViewer';


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
                fetch(`${HostUrl}${HostPath}${GameResultPath}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ level, name })
                })
                    .then(console.log)
                    .catch(console.error)
            }
        }
    }, [gameState, id, userAnswer, shapeSide, level, levelInfo.state, name])

    const onChangeName = (event: any) => {
        setName(event.target.value)
        setIsNameError(!event.target.value)
    }

    const onRecordDataClick = async (event: any) => {
        fetch(`${HostUrl}${HostPath}${GameResultPath}`)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(console.error)
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

    return (
        <div className="App">
            {/* Header */}
            <h1>Speed-Game</h1>

            {/* Details */}
            <HeaderDetails name={name} gameState={gameState}
                isNameError={isNameError}
                onChangeName={onChangeName}
                onRestartClick={onRestartClick}
                onRecordDataClick={onRecordDataClick} />

            {/* Image Viewer */}
            {gameState === GameState.Loading &&
                <div>Loading...</div>
            }
            {gameState === GameState.Started && shapeSide &&
                <div>
                    <div>Level:<span>{level}</span></div>
                    <ShapeViewer shapeSide={shapeSide}>
                        <CustomShape levelInfo={levelInfo} />
                    </ShapeViewer>
                </div>
            }

            <CustomModal isModalOpen={isModalOpen} onCloseHandler={() => setIsModalOpen(false)}>
                <GameOverView levelInfo={levelInfo} level={level} name={name} onRecordDataClick={onRecordDataClick} ></GameOverView>
            </CustomModal>
        </div>
    )
};
