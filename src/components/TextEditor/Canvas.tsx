import { useState, useRef, useCallback } from "react";
import { Plus, Share2, ZoomIn, ZoomOut } from "lucide-react";
import TextFrame from "./TextFrame";
import ShareDialog from "./ShareDialog";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";

interface TextFrameData {
  id: string;
  content: string;
  position: { x: number; y: number };
}

const Canvas = () => {
  const [frames, setFrames] = useState<TextFrameData[]>([]);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addFrame = () => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    // Calculate center position of the visible canvas
    const centerX = window.innerWidth / 2 - panOffset.x;
    const centerY = window.innerHeight / 2 - panOffset.y;

    const newFrame: TextFrameData = {
      id: uuidv4(),
      content: "",
      position: { x: centerX - 250, y: centerY - 150 }, // Center the new frame
      headerColor: "#f9fafb", // Default light gray color
    };

    setFrames([...frames, newFrame]);
  };

  const deleteFrame = (id: string) => {
    setFrames(frames.filter((frame) => frame.id !== id));
  };

  const updateFramePosition = (
    id: string,
    position: { x: number; y: number },
  ) => {
    setFrames(
      frames.map((frame) => (frame.id === id ? { ...frame, position } : frame)),
    );
  };

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start panning if it's a direct click on the canvas, not on a frame
    if (e.target === e.currentTarget) {
      setIsPanning(true);
      setStartPanPosition({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        const deltaX = e.clientX - startPanPosition.x;
        const deltaY = e.clientY - startPanPosition.y;
        setPanOffset({
          x: panOffset.x + deltaX,
          y: panOffset.y + deltaY,
        });
        setStartPanPosition({ x: e.clientX, y: e.clientY });
      }
    },
    [isPanning, startPanPosition, panOffset],
  );

  const handleCanvasMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleZoomIn = () => {
    setZoom(Math.min(2, zoom + 0.1));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(0.5, zoom - 0.1));
  };

  const getCanvasData = () => {
    // In a real implementation, this would serialize the canvas state
    return {
      frames,
      panOffset,
      zoom,
    };
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <Button
          onClick={addFrame}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
          variant="outline"
        >
          <Plus size={16} />
          Add Text Frame
        </Button>

        <div className="flex items-center bg-white border border-gray-200 rounded-md">
          <Button
            onClick={handleZoomOut}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-r-none border-r border-gray-200"
          >
            <ZoomOut size={16} />
          </Button>
          <div className="px-2 text-sm">{Math.round(zoom * 100)}%</div>
          <Button
            onClick={handleZoomIn}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-l-none border-l border-gray-200"
          >
            <ZoomIn size={16} />
          </Button>
        </div>

        <ShareDialog canvasData={getCanvasData()}>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
          >
            <Share2 size={16} />
            Share
          </Button>
        </ShareDialog>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="absolute w-[10000px] h-[10000px] transform origin-top-left"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
          cursor: isPanning ? "grabbing" : "grab",
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
      >
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-pattern" />

        {/* Text frames */}
        {frames.map((frame) => (
          <TextFrame
            key={frame.id}
            id={frame.id}
            initialContent={frame.content}
            initialPosition={frame.position}
            onDelete={deleteFrame}
            onPositionChange={updateFramePosition}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
