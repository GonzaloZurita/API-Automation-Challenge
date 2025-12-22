API Testing Challenge – Playwright

This project contains automated API tests implemented as part of a technical challenge. Basic github action added to run tests on each push for the main branch.

__Tech Stack__
- Playwright
- TypeScript
- Node.js

__Project Structure__

```text
📁 src/
    └─ api/
    │   ├─ assertions/
    │   │   ├─ user.assertions.ts
    │   │   └─ users.assertions.ts
    │   ├─ clients/
    │   │   └─ users.client.ts
    │   ├─ models/
    │   │   ├─ register.model.ts
    │   │   ├─ user.model.ts
    │   │   └─ users.model.ts
    │   └─ payloads/
    │        └─ register.payload.ts
    └─ utils/
        └─ random.ts
📁 tests/
    └─ api/
        ├─ users.happy.spec.ts
        └─ users.negative.spec.ts
```


- **Happy tests**: valid scenarios with expected successful responses
- **Negative tests**: invalid inputs and error scenarios

__How to Run the Tests__

#1. Install dependencies
-bash
-npm install

#2. Run all tests
-bash
-Copiar código
-npx playwright test

#3. View HTML report
-bash
-Copiar código
-npx playwright show-report

__Limitations__

Mock API constraints:

	-The project uses Reqres.in as a mock API.
	
	-Data is not persisted between requests -> Limited data consistency
	
	-No real authentication
	
	-Reqres API does not require real authentication. The x-api-key header is only illustrative and does not enforce security.
	
	-Pagination testing limited to available pages
	
	-No side-effects on the server: DELETE and POST requests do not actually modify server data, so tests related to data creation/deletion are only demonstrative.
	
	-Environment variables dependency
	
	-Limited error handling testing
	
	-Negative scenarios (e.g., invalid IDs, malformed requests) are not exhaustively tested due to API limitations.



