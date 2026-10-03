import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const careerRoot = path.resolve(root, "..");
const port = Number(process.env.PORT || 4173);
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".md": "text/markdown; charset=utf-8", ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };

const server = http.createServer(async (request, response) => {
  try {
    const urlPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    if (urlPath === "/master-achievement-library") {
      const filename = "Latisha Vincent-Waters - Master Achievement Library.docx";
      const target = path.join(careerRoot, "02 Achievement Library", filename);
      const body = await fs.readFile(target);
      response.writeHead(200, {
        "Content-Type": mime[".docx"],
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store"
      });
      response.end(body);
      return;
    }
    if (urlPath === "/evidence-registry") {
      const target = path.join(careerRoot, "02 Achievement Library", "EVIDENCE_REGISTRY.md");
      const markdown = await fs.readFile(target, "utf8");
      const escaped = markdown.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
      const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Career Command Evidence Registry</title><style>body{margin:0;background:#f5f0e8;color:#251f1b;font:16px/1.55 system-ui,sans-serif}main{max-width:980px;margin:auto;padding:40px 24px}a{color:#6e3a45}pre{white-space:pre-wrap;font:inherit;background:#fff;border:1px solid #d8cec2;border-radius:14px;padding:24px;box-shadow:0 8px 24px #2b1d1510}</style></head><body><main><p><a href="/#assets">← Back to Résumés &amp; proof</a></p><pre>${escaped}</pre></main></body></html>`;
      response.writeHead(200, { "Content-Type": mime[".html"], "Cache-Control": "no-store" });
      response.end(body);
      return;
    }
    const relative = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
    const target = path.resolve(root, relative);
    if (!target.startsWith(`${root}${path.sep}`) && target !== path.join(root, "index.html")) throw new Error("Invalid path");
    const body = await fs.readFile(target);
    response.writeHead(200, { "Content-Type": mime[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-store" });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => console.log(`Career Command is running at http://127.0.0.1:${port}`));
