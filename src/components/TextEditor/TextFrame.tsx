import { useState, useRef, useEffect } from "react";
import { X, GripVertical, Maximize2 } from "lucide-react";
import RichTextEditor from "./RichTextEditor";

interface TextFrameProps {
  id: string;
  initialContent?: string;
  initialPosition?: { x: number; y: number };
  onDelete: (id: string) => void;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
}

const TextFrame = ({
  id,
  initialContent = "",
  initialPosition = { x: 0, y: 0 },
  initialHeaderColor = "#f9fafb",
  onDelete,
  onPositionChange,
}: TextFrameProps) => {
  const [content, setContent] = useState(initialContent);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isResizing, setIsResizing] = useState(false);
  const [frameSize, setFrameSize] = useState({ width: 500, height: 300 });
  const [headerColor, setHeaderColor] = useState(initialHeaderColor);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target === e.currentTarget ||
      (e.target as HTMLElement).classList.contains("frame-header") ||
      (e.target as HTMLElement).classList.contains("drag-handle")
    ) {
      setIsDragging(true);
      const rect = frameRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      };
      setPosition(newPosition);
      onPositionChange(id, newPosition);
    } else if (isResizing) {
      const rect = frameRef.current?.getBoundingClientRect();
      if (rect) {
        const newWidth = Math.max(300, e.clientX - rect.left);
        const newHeight = Math.max(200, e.clientY - rect.top);
        setFrameSize({ width: newWidth, height: newHeight });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleScaleChange = (delta: number) => {
    const newScale = Math.max(0.5, Math.min(2, scale + delta * 0.1));
    setScale(newScale);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  return (
    <div
      ref={frameRef}
      className="absolute bg-white rounded-xl border border-gray-200 overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${frameSize.width}px`,
        height: `${frameSize.height}px`,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      <div
        className="frame-header flex justify-between items-center bg-gray-50 p-2 cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="drag-handle cursor-grab">
            <GripVertical size={16} className="text-gray-400" />
          </div>
          <div className="text-xs text-gray-500 font-medium">
            Frame {id.slice(0, 4)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleScaleChange(1)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none p-1"
          >
            <Maximize2 size={14} />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-gray-500 hover:text-red-500 focus:outline-none p-1"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="p-2">
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
        onMouseDown={handleResizeStart}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className="absolute bottom-1 right-1"
        >
          <path d="M0 10L10 0L10 10H0Z" fill="#CCCCCC" />
        </svg>
      </div>
    </div>
  );
};

export default TextFrame;
