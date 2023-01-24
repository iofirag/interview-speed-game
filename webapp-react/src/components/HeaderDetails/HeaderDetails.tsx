import { Button, TextField } from "@mui/material"
import { GameState } from "../../utils/constants";
import './HeaderDetails.css';

interface HeaderDetailsProps {
    name: string;
    gameState: string;
    isNameError: boolean;
    onChangeName: (event: any) => void;
    onRestartClick: (event: any) => void;
    onRecordDataClick: (event: any) => void;
    children?: any;
}

export const HeaderDetails = (props: HeaderDetailsProps) => {
    const { name, gameState, isNameError, onChangeName, onRestartClick, onRecordDataClick } = props;

    return (
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
            <Button variant="outlined"
                className='start-game-button'
                onClick={onRecordDataClick}>Leaderboard</Button>
        </div>
    )
}