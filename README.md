# Overview 

## Summary 

This is a **Hatchways** assesment completed on behalf of **Clipboard Health**. Any Candidate has the explicit and express permission to use this code in your own interview process. The script I wrote is in `top-workspaces.ts`


## My Interview Experience

This is a [Hatchways](https://www.hatchways.io/) assessment for a company called [Clipboard Health](https://www.clipboardhealth.com/). This was given to me before I spoke to any engineer, despite the fact that Clipboard reached out to me. I was pressured to get to the problem ASAP, which led me completing it after a day of travel on Saturday of Easter weekend. I completed it slower than I normally would, on account of interacting with my family memebers in an attempt to not let work consume my personal life. 

On Monday morning, I recieved a rejection from Clipboard. Apparently, when they said something "should" take an hour and a half, they mean there is a hard time requirement that will fail a candidate. 

To be honest, I did not consider myself respect as part of this process. Here is a short summary of my points of frustration
* I understand that take home assessments are sometimes required, but I get the impression they are cold calling candidates on LinkedIn with minimal effort, and then giving them these exams.
* I understand that in the professional world time is sometimes of the essence, but it's unreasonable to dictate the time requirements on a PR a candidate is doing in their off hours, unpaid.
* I understand that I ultimately agreed to this exam and the rules, but I also feel Clipboard was being "sneaky" about these requirements. I've been given PRs that "should take about an hour" as part of take homes before; They were never timed. If I did recieve a timed coding exam, it was part of a in browser assessment and had the time requirement clearly stated. Clipboard's process does not follow existing design patterns. If Clipboard feels that it should be an exception, it should explicitly and directly call that requirement out.
* In the PR itself, there were a ton of tiny "gotchas" due to poor requirements. For example the requirements docs said the API information was in the README.md, but the README doesn't include the fact the APIs are paginated. The output required is not standard JSON and requires running the string through a regex. There's a section on that, but it's included in the normal flow of multiple paragraphs of pretty mundane information. It just seems like these guys are taking the shotgun approach to interviewing. That would be fine if I had applied, but the recruiter reached out to me.

  At any rate, this is the solved version of my problem. If you are a candidate given this problem or one with superficial differences, you have my explicit permission to use this for interviewing. I understand this is a bit unethical. However this company doesn't respect your time, so I don't think you should respect the time of the Clipboard Health team. 


<h1 align="center">Red Planet Staffing</h1>
<img src="./assets/red-planet.webp" alt="Red Planet Staffing" >

Welcome to the red planet! At just over one million people as of the 2050 census, Martian settlements are flourishing. As the leading staffing marketplace on Mars, Red Planet connects workplaces with workers to fill shifts.

### Business context

Our primary customers are Martian workplaces. While they have full-time staff, they occasionally need short-term flexible staff to fill gaps in their operations (for example, when a worker is sick or on a vacation to the Moon).

When they need a worker, workplaces post a "shift" on our marketplace. Workers on our marketplace then claim these shifts and are assigned to them. Once assigned, workers perform the work at the shift's start time until it's end time, and are paid based on the hours worked.

## Getting started

This microservice uses technologies that have stood the test of time.

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs/concepts/components/prisma-client)

### Local development commands

```bash
# Install dependencies
npm install

# Create and migrate the database, and then apply seed data located at `./prisma/seed`
npx prisma migrate dev --name init

# Drop and re-seed the database
npx prisma migrate reset

# Start the server in watch mode with hot-reloading
npm run start:dev
```

## Submission

Submit your solution by creating a pull request (PR) on this repository. Please **do not** merge your PR. Instead, return to your Hatchways assessment page to confirm your submission.

## API

### Workers

- `POST /workers`: Create a worker.
  - Body: [`createWorkerSchema`](./src/modules/workers/workers.schemas.ts).
- `GET /workers/:id`: Get a worker by ID.
  - Path parameters:
    - `:id`: Worker ID.
- `GET /workers`: Get workers.
- `GET /workers/claims`: Get worker claims.
  - Query parameters:
    - `:workerId`: Worker ID.

### Workplaces

- `POST /workplaces`: Create a workplace.
  - Body: [`createWorkplaceSchema`](./src/modules/workplaces/workplaces.schemas.ts).
- `GET /workplaces/:id`: Get a workplace by ID.
  - Path parameters:
    - `:id`: Workplace ID.
- `GET /workplaces`: Get workplaces.

### Shifts

- `POST /shifts`: Create a shift.
  - Body: [`createShiftSchema`](./src/modules/shifts/shifts.schemas.ts).
- `GET /shifts/:id`: Get a shift by ID.
  - Path parameters:
    - `:id`: Shift ID.
- `POST /shifts/:id/claim`: Claim a shift.
  - Path parameters:
    - `:id`: Shift ID.
  - Body:
    - `workerId`: Worker ID.
- `POST /shifts/:id/cancel`: Cancel a claimed shift.
  - Path parameters:
    - `:id`: Shift ID.
- `GET /shifts`: Get shifts.
