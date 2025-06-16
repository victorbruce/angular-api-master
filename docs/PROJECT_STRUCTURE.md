# Project Structure

Below is an high-level overview of the project folder structure starting from the **source folder**.



- **src/**:
	- `app/`
		- `models/`: type definitions / interfaces
		=
		- `pages/`: routed views or screens(smart components)
		- `components/`: shared UI parts(buttons, cards, etc.)
		- `shared/`: utils, pipes, etc.
		- `services/`: business logic (data fetching, persistence)
		- `app.routes.ts`: route definitions
		- `app.component.ts`: root component

