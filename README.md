# Test Automation Framework with Playwright
A full-stack test automation framework using Playwright, PostgreSQL, and gRPC

### Tech Stack:
- Playwright for UI Automation
- PostgreSQL tested (DB CRUD)
- gRPC tested using grpcb.in for mock services

### Structure
- `tests/ui`: UI automation
- `tests/db`: DB CRUD
- `tests/grpc`: gRPC mock tests
- `Framework/ui/pages`: POM

### Run Tests

- `npm install`
- `npx playwright install`
- `npm run test`	                        # Run all tests
- `npm run test:ui`	                      # Run UI tests (tests/e2e)
- `npm run test:db`	                      # Run DB tests (tests/db)
- `npm run test:grpc`	                    # Run gRPC tests (tests/grpc)
- `npm run test:smoke`	                  # Run smoke tests tagged with @smoke
- `npm run test:headed`	                  # Run UI test in headed mode
- `npm run record`	                      # Launch Playwright Codegen tool

### Code Quality
- `npm run format`	                      # Format code with Prettier
- `npm run format:check`                # Check formatting (excluding .ts files)
- `npm run lint`	                        # Run ESLint and catch issues
- `npm run tsc:check`	                    # Run TypeScript checks (no emit)

### Notes
- Ensure your PostgreSQL database is running and accessible before running test:db.
- You can tag tests with @smoke or other markers for selective execution.
- Adjust or extend Playwright projects if you need cross-browser support.
