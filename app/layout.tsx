/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getClientConfig } from "./config/client";
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getServerSideConfig } from "./config/server";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const serverConfig = getServerSideConfig();

export const metadata: Metadata = {
  title: "Pogo AI",
  description: "Tu bot asistente IA personal. ",
  appleWebApp: {
    title: "Pogo AI",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme={serverConfig.themeColor}>
      <head>
        <meta name="config" content={JSON.stringify(getClientConfig())} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
          crossOrigin="use-credentials"
        ></link>
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body>
        <AntdRegistry>{children}</AntdRegistry>
        {serverConfig?.isVercel && (
          <>
            <SpeedInsights />
          </>
        )}
        {serverConfig?.gtmId && (
          <>
            <GoogleTagManager gtmId={serverConfig.gtmId} />
          </>
        )}
        {serverConfig?.gaId && (
          <>
            <GoogleAnalytics gaId={serverConfig.gaId} />
          </>
        )}
      </body>
    </html>
  );
}
