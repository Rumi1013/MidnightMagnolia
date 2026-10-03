# RAG test plan

- Ingestion accepts supported sanitized source files.
- Chunking preserves source identifiers.
- Index manifests record embedding and chunk settings.
- Retrieval returns expected sources for fixed evaluation questions.
- Prompt versions are traceable.
- Updated upstream records do not silently leave stale indexed content.
