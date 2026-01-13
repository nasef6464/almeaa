"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, BookOpen, GitBranch, ListTree, Sparkles, Plus, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

export type TaxonomyNode = {
  id: string;
  name: string;
  type: "subject" | "branch" | "section" | "skill";
  children?: TaxonomyNode[];
};

const typeIcon: Record<TaxonomyNode["type"], ReactNode> = {
  subject: <BookOpen className="h-4 w-4 text-amber-600" />,
  branch: <GitBranch className="h-4 w-4 text-blue-600" />,
  section: <ListTree className="h-4 w-4 text-emerald-600" />,
  skill: <Sparkles className="h-4 w-4 text-purple-600" />,
};

export function TreeNode({ node, depth = 0 }: { node: TaxonomyNode; depth?: number }) {
  const [open, setOpen] = useState(true);
  const hasChildren = (node.children?.length ?? 0) > 0;

  return (
    <div className="flex flex-col gap-1" dir="rtl">
      <div
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-2 border border-slate-200 bg-white shadow-sm",
          hasChildren ? "cursor-pointer hover:border-amber-300" : ""
        )}
        style={{ marginRight: depth * 16 }}
        onClick={() => hasChildren && setOpen((p) => !p)}
      >
        <div className="flex items-center gap-2">
          {hasChildren ? (
            open ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronLeft className="h-4 w-4 text-slate-500" />
          ) : (
            <span className="w-4" />
          )}
          {typeIcon[node.type]}
          <span className="font-medium text-slate-800">{node.name}</span>
        </div>
        <span className="text-xs text-slate-400 capitalize">{node.type}</span>
      </div>

      {hasChildren && open && (
        <div className="flex flex-col gap-1">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
