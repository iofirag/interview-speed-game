import './ShapeViewer.css';

interface ShapeViewerProps {
    children?: any;
    shapeSide: string;
}

export const ShapeViewer = (props: ShapeViewerProps) => {
    const { shapeSide, children } = props;

    return (
        <div className={`${shapeSide}-image`}>
            {children}
        </div>
    )
}