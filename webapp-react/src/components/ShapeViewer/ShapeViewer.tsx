import './ShapeViewer.css';

interface ShapeViewerProps {
    children?: any;
    shapeSide: string;
}

export const ShapeViewer: React.FC<ShapeViewerProps> = ({ shapeSide, children }) => {
    return (
        <div className={`${shapeSide}-image`}>
            {children}
        </div>
    )
}