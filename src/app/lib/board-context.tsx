'use client';
import { createContext, useContext, useRef } from "react";
import { Board } from "@/app/lib/board";

const BoardContext = createContext<Board | null>(null);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const boardRef = useRef<Board | null>(null);
  if (!boardRef.current) boardRef.current = new Board([]);

  return (
    <BoardContext.Provider value={boardRef.current}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const board = useContext(BoardContext);
  if (!board) throw new Error("useBoard must be used within BoardProvider");
  return board;
};