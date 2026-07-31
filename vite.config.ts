import path from "path"
import fs from "fs"
import type { IncomingMessage, ServerResponse } from "node:http"
import react from "@vitejs/plugin-react"
import { defineConfig, type ViteDevServer } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import contactHandler from "./api/contact"

// Load .env manually for the dev middleware (process.env isn't auto-populated)
function loadEnvFile() {
  const envPath = path.resolve(__dirname, ".env")
  if (!fs.existsSync(envPath)) return
  const content = fs.readFileSync(envPath, "utf-8")
  for (const line of content.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "")
    if (!(key in process.env)) process.env[key] = value
  }
}

// Emulates the /api/contact serverless function in local dev
function contactApiPlugin() {
  return {
    name: "contact-api-dev",
    configureServer(server: ViteDevServer) {
      loadEnvFile()
      server.middlewares.use("/api/contact", (req: IncomingMessage, res: ServerResponse, next: (err?: unknown) => void) => {
        if (req.method !== "POST") return next()
        let raw = ""
        req.on("data", (chunk: Buffer) => { raw += chunk.toString("utf-8") })
        req.on("end", () => {
          try {
            raw = JSON.stringify(JSON.parse(raw))
          } catch {
            // keep raw
          }
          // Build a minimal Vercel-like req/res shim for the shared handler
          const shimRes = {
            status(code: number) {
              res.statusCode = code
              return this
            },
            json(payload: unknown) {
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify(payload))
              return this
            },
          }
          const shimReq = { method: "POST", body: raw }
          contactHandler(shimReq, shimRes)
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react(), contactApiPlugin()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
