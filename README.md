# xmem-n8n-node

> **Official n8n Integration Node for xMem**

---

## Overview

**xMem** is an open-source memory orchestrator for LLMs (Large Language Models), designed to combine long-term (vector DB) and short-term (session/context) memory with advanced RAG (Retrieval-Augmented Generation) logic. xMem maximizes value for LLM applications by providing modular, API-first, and future-proof memory management for GenAI, chatbots, and agentic workflows.

**n8n** is a leading open-source workflow automation platform, enabling you to connect anything to everything with low-code/no-code workflows. Integrating xMem with n8n allows you to automate memory operations, build AI-powered automations, and connect LLM memory to hundreds of other apps and services.

---

## Features

- Seamlessly connect n8n workflows to xMem APIs
- Upsert/query memory, manage sessions, and trigger LLM-powered actions
- Use xMem as a knowledge base, context provider, or memory store in your automations
- Supports all xMem REST API endpoints (memory, session, agent chat, etc.)
- Secure API key authentication
- Designed for public listing on [n8n.io/integrations](https://n8n.io/integrations/)

---

## xMem API Endpoints

The following endpoints are most relevant for n8n integration:

- `POST /api/session-memory/` — Add a new session memory or message
- `GET /api/session-memory/` — List all messages for a session or all sessions
- `POST /api/sessions/` — Create or update a session memory
- `GET /api/sessions/` — Fetch a session or list all sessions
- `POST /api/agent-chat/` — Query the agent with context, sources, and session info
- `GET /api/vector-sources/` — List vector sources
- `POST /api/vector-sources/` — Create a new vector source
- `GET /api/qdrant-queries/` — Query Qdrant vector DB for relevant memory
- `POST /api/api-keys/` — Create an API key for secure access

See the [xMem API documentation](https://github.com/your-org/xmem) for full details.

---

## Example: n8n HTTP Request Node

You can use the built-in HTTP Request node in n8n to call xMem endpoints. Example config for upserting session memory:

```json
{
  "url": "https://your-xmem.com/api/session-memory",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  "body": {
    "sessionId": "session-123",
    "content": "Remember this fact.",
    "role": "user"
  },
  "bodyContentType": "json"
}
```

---

## Local Development & Testing

1. Clone this repo:
   ```bash
   git clone https://github.com/your-org/xmem-n8n-node.git
   cd xmem-n8n-node
   ```
2. Install dependencies:
   ```bash
   pnpm install
   # or npm install
   ```
3. Develop your node using the [n8n node starter template](https://github.com/n8n-io/n8n-nodes-starter).
4. Link your node to a local n8n instance for testing:
   ```bash
   # See n8n docs for custom node development
   ```
5. Use your xMem API key and endpoint in your test workflows.

---

## Documentation & Resources

- [xMem Documentation](https://github.com/your-org/xmem)
- [xMem API Reference](https://github.com/your-org/xmem/tree/main/src/app/docs)
- [n8n Node Creation Guide](https://docs.n8n.io/integrations/creating-nodes/create-node/)
- [n8n Contribution Guidelines](https://github.com/n8n-io/n8n/blob/master/CONTRIBUTING.md)

---

## Contribution Guidelines

- Fork this repo and submit pull requests for improvements or bug fixes.
- Follow the code style and best practices from the [n8n node starter template](https://github.com/n8n-io/n8n-nodes-starter).
- Add tests and documentation for new features.
- To submit to the official n8n integrations directory, open a PR to [n8n-io/n8n](https://github.com/n8n-io/n8n) following their process.

---

## Open Source & License

- This project is open source under the MIT License.
- xMem and this node are designed to be modular, API-first, and open to community contributions.

---

## Contact & Support

- For xMem questions, see [xMem GitHub](https://github.com/your-org/xmem) or open an issue.
- For n8n node issues, use this repo’s issues or the [n8n community forum](https://community.n8n.io/).

---

## Architectural Philosophy (from xMem)

- **Open Source First:** Prefer open-source LLMs and vector DBs; avoid proprietary dependencies.
- **API-First:** All features are accessible via REST APIs for easy integration.
- **Modular & Decoupled:** Logic is decoupled for maintainability and reusability.
- **Security:** Use API keys or OAuth for secure access.
- **Observability:** Designed for monitoring, logging, and production readiness.
- **Documentation:** All public APIs and features are documented for easy onboarding.

---

## Changelog

- _[Add your release notes here as you develop the node]_
