import { LevelStateType } from "../../utils/constants";
import './CustomShape.css';

interface CustomShapeProps {
    children?: any;
    levelInfo: { state: string };
}

export const CustomShape = (props: CustomShapeProps) => {
    const { levelInfo } = props;

    let answerClass = ''
    if (levelInfo.state === LevelStateType.Success.state) answerClass = 'hit'
    if (levelInfo.state === LevelStateType.Error1.state) answerClass = 'fail'

    return (
        <div className={answerClass}>
            <img src="/shape.png" className="image" alt="" />
        </div>
    )
}