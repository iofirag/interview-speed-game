import { Button, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import './GameOverView.css';

interface GameOverViewProps {
    children?: any;
    levelInfo: any;
    level: number;
    name: string;
    onRecordDataClick: (event: any) => Promise<void>
}

export const GameOverView: React.FC<GameOverViewProps> = ({ levelInfo, level, name, onRecordDataClick }) => {
    return (
        <>
            <CardMedia
                sx={{ height: 190 }}
                image="/game-over.png"
                title="Record"
            />

            <CardContent>
                <Typography variant="h3" color="text.primary">
                    {levelInfo?.message}
                </Typography>
                <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                    Level: {level} ({name})
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={onRecordDataClick} size="small">Records Page</Button>
            </CardActions>
        </>
    )
}


