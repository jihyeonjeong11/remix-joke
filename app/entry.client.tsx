import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

// root.tsx 전체 내용.

hydrateRoot(document, <RemixBrowser />);
