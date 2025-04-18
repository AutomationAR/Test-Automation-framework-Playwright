# Test-Automation-framework-Playwright

### Tech Stack:
- Playwright (UI)
- PostgreSQL (CRUD via Knex)
- gRPC (echo mock from grpcb.in)

### Structure
- `tests/ui`: UI automation
- `tests/db`: DB CRUD
- `tests/grpc`: gRPC mock tests

### Run Tests
```bash
npm install
npm run test         # All tests
npm run test:ui      # UI
npm run test:db      # DB
npm run test:grpc    # gRPC
