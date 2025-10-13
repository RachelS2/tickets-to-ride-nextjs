import { ProvedorTabuleiro } from "@/app/lib/contexto-tabuleiro";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <ProvedorTabuleiro>
          {children}
        </ProvedorTabuleiro>
  );
}