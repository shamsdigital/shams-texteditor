import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ShareDialogProps {
  children: React.ReactNode;
  canvasData: any;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ children, canvasData }) => {
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const generateShareLink = () => {
    // In a real implementation, this would create a shareable link with the canvas data
    // For now, we'll just create a mock link
    const mockLink = `https://texteditor.app/share/${Math.random().toString(36).substring(2, 10)}`;
    setShareLink(mockLink);
    return mockLink;
  };

  const handleCopyLink = () => {
    const link = shareLink || generateShareLink();
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Canvas</DialogTitle>
          <DialogDescription>
            Anyone with the link will be able to view this canvas.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={shareLink || generateShareLink()}
              readOnly
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={handleCopyLink}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            This link will expire in 7 days. After that, viewers will no longer
            be able to access your canvas.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
