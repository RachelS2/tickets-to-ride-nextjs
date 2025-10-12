import { BoardProvider } from "@/app/lib/board-context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <BoardProvider>
          {children} {/* Agora todos os componentes podem usar useBoard() */}
        </BoardProvider>
      </body>
    </html>
  );
}