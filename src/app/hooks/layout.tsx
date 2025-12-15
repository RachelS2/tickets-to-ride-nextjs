// layout.tsx ou _app.tsx
import { ToastProvider } from "@/app/components/toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <ToastProvider /> {/* Necessário para exibir os toasts */}
      </body>
    </html>
  );
}
