import { ProvedorJogo } from "@/app/lib/contexto-jogo";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <ProvedorJogo>
          {children}
        </ProvedorJogo>
  );
}