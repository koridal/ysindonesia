import "../globals.css";

export const metadata = {
  title: "Yunsung Indonesia",
  description: "Korean Machinery @ Electric Equipment Company in Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}