import React, { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const handleFormatClick = (format: string) => {
    setSelectedFormat(format);
    // In a real implementation, this would apply formatting to the selected text
    // For now, we're just simulating the UI interaction
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-1 p-2 bg-white rounded-md mb-2">
        <div className="flex items-center gap-1 mr-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 p-0",
                    selectedFormat === "bold" && "bg-gray-100",
                  )}
                  onClick={() => handleFormatClick("bold")}
                >
                  <Bold size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bold</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 p-0",
                    selectedFormat === "italic" && "bg-gray-100",
                  )}
                  onClick={() => handleFormatClick("italic")}
                >
                  <Italic size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Italic</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 p-0",
                    selectedFormat === "underline" && "bg-gray-100",
                  )}
                  onClick={() => handleFormatClick("underline")}
                >
                  <Underline size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Underline</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 p-0",
                    selectedFormat === "link" && "bg-gray-100",
                  )}
                  onClick={() => handleFormatClick("link")}
                >
                  <Link size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="h-6 w-px bg-gray-200 mx-2" />

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 p-0",
                    selectedFormat === "align-left" && "bg-gray-100",
                  )}
                  onClick={() => handleFormatClick("align-left")}
                >
                  <AlignLeft size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 p-0",
                    selectedFormat === "align-center" && "bg-gray-100",
                  )}
                  onClick={() => handleFormatClick("align-center")}
                >
                  <AlignCenter size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Center</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 p-0",
                    selectedFormat === "align-right" && "bg-gray-100",
                  )}
                  onClick={() => handleFormatClick("align-right")}
                >
                  <AlignRight size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align Right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="min-h-[150px] p-3">
        <textarea
          className="w-full h-full min-h-[150px] resize-none focus:outline-none bg-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type something..."
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
