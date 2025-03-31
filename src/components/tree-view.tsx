"use client";

import type React from "react";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Tree,
  type NodeModel as BaseNodeModel,
  type DropOptions,
} from "@minoru/react-dnd-treeview";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
} from "lucide-react";

interface FileData {
  fileType: string;
  content: string;
}

type NodeModel = BaseNodeModel<FileData>;

// Sample tree data
const initialData: NodeModel[] = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: "Project Files",
  },
  {
    id: 2,
    parent: 1,
    droppable: true,
    text: "src",
  },
  {
    id: 3,
    parent: 2,
    droppable: false,
    text: "App.tsx",
    data: {
      fileType: "tsx",
      content: "This is the main application file with React components.",
    },
  },
  {
    id: 4,
    parent: 2,
    droppable: false,
    text: "index.tsx",
    data: {
      fileType: "tsx",
      content: "Entry point for the React application.",
    },
  },
  {
    id: 5,
    parent: 1,
    droppable: true,
    text: "public",
  },
  {
    id: 6,
    parent: 5,
    droppable: false,
    text: "index.html",
    data: {
      fileType: "html",
      content: "HTML template for the React application.",
    },
  },
  {
    id: 7,
    parent: 0,
    droppable: true,
    text: "Configuration",
  },
  {
    id: 8,
    parent: 7,
    droppable: false,
    text: "package.json",
    data: {
      fileType: "json",
      content: "Dependencies and scripts for the project.",
    },
  },
  {
    id: 9,
    parent: 7,
    droppable: false,
    text: "tsconfig.json",
    data: {
      fileType: "json",
      content: "TypeScript configuration for the project.",
    },
  },
];

// Custom node component with variable heights
const CustomNode: React.FC<{
  node: NodeModel;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  isSelected: boolean;
  onSelect: (node: NodeModel) => void;
}> = ({ node, depth, isOpen, onToggle, isSelected, onSelect }) => {
  const indent = depth * 24;
  const isFolder = node.droppable;

  const handleToggle = (e: React.MouseEvent) => {
    if (isFolder) {
      onToggle(node.id);
    }
    onSelect(node);
  };

  return (
    <div
      className={`
        flex flex-col
        ${isSelected ? "bg-muted" : "hover:bg-muted/50"}
        ${isFolder ? "h-9" : "h-[140px]"}
        cursor-pointer
      `}
      onClick={handleToggle}
    >
      <div
        className="flex items-center py-2 px-2 justify-between"
        style={{ paddingLeft: indent }}
      >
        <div className="flex items-center gap-2">
          {isFolder ? (
            isOpen ? (
              <FolderOpen size={16} className="text-primary" />
            ) : (
              <Folder size={16} className="text-primary" />
            )
          ) : (
            <File size={16} className="text-muted-foreground" />
          )}
          <div className="text-sm text-foreground">{node.text}</div>
        </div>
        {isFolder && (
          <div className="mr-2">
            {isOpen ? (
              <ChevronDown size={16} className="text-foreground" />
            ) : (
              <ChevronRight size={16} className="text-foreground" />
            )}
          </div>
        )}
      </div>

      {!isFolder && node.data?.content && (
        <div
          className="px-2 text-xs text-muted-foreground overflow-auto h-[100px]"
          style={{ paddingLeft: indent + 40 }}
        >
          {node.data.content}
        </div>
      )}
    </div>
  );
};

export default function TreeViewComponent() {
  const [treeData, setTreeData] = useState<NodeModel[]>(initialData);
  const [open, setOpen] = useState<NodeModel["id"][]>([0, 1, 2, 5, 7]); // Added 0 for header
  const [selectedNode, setSelectedNode] = useState<NodeModel | null>(null);

  const handleDrop = (newTree: NodeModel[], options: DropOptions) => {
    setTreeData(newTree);
  };

  const handleToggle = (id: NodeModel["id"]) => {
    setOpen((prevOpen) => {
      if (prevOpen.includes(id)) {
        return prevOpen.filter((nodeId) => nodeId !== id);
      } else {
        return [...prevOpen, id];
      }
    });
  };

  const handleSelect = (node: NodeModel) => {
    setSelectedNode(node);
  };

  const isHeaderOpen = open.includes(0);

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between h-9 cursor-pointer border-b border-border"
        onClick={() => handleToggle(0)}
      >
        <div className="flex items-center gap-2 px-2">
          <h2 className="text-sm font-medium text-foreground">
            Project Explorer
          </h2>
        </div>
        <div className="px-2">
          {isHeaderOpen ? (
            <ChevronDown size={14} className="text-foreground" />
          ) : (
            <ChevronRight size={14} className="text-foreground" />
          )}
        </div>
      </div>

      {isHeaderOpen && (
        <DndProvider backend={HTML5Backend}>
          <div className="flex-1 overflow-auto">
            <Tree
              tree={treeData}
              rootId={0}
              render={(node, options) => (
                <CustomNode
                  node={node}
                  depth={options.depth}
                  isOpen={open.includes(node.id)}
                  onToggle={handleToggle}
                  isSelected={selectedNode?.id === node.id}
                  onSelect={handleSelect}
                />
              )}
              onDrop={handleDrop}
              classes={{
                root: "tree-root",
                container: "tree-container",
                dropTarget: "bg-muted",
              }}
              sort={false}
              insertDroppableFirst={false}
              canDrop={(tree, { dragSource, dropTargetId, dropTarget }) => {
                if (dragSource?.parent === dropTargetId) {
                  return true;
                }
                return dropTarget?.droppable;
              }}
              dropTargetOffset={5}
              placeholderRender={(node, { depth }) => (
                <div
                  className="bg-primary h-[2px]"
                  style={{ marginLeft: depth * 24 }}
                />
              )}
              initialOpen={open}
            />
          </div>
        </DndProvider>
      )}

      {selectedNode && !selectedNode.droppable && isHeaderOpen && (
        <div className="p-2 bg-muted/50">
          <h3 className="text-xs font-medium mb-2 text-foreground">
            File Details
          </h3>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Name:</span> {selectedNode.text}
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Type:</span>{" "}
            {selectedNode.data?.fileType || "Unknown"}
          </p>
        </div>
      )}
    </div>
  );
}
