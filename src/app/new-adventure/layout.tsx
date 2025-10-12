import { BoardProvider } from "@/app/lib/board-context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <BoardProvider>
          {children}
        </BoardProvider>
  );
}