import { exit } from "process";

/*
 * API Responses going to be different
 * than internal types due to serialization
 * and deserialization
 */
interface WorkplaceAPIResponse {
  id: number;
  name: string;
  status: number;
}

interface ShiftAPIResponse {
  workplaceId: number;
  cancelledAt: string | null;
  endAt: string;
}

/*
 * While the README states that the API simply returns,
 * the codebase indicates that the API is paginated.
 */
interface PaginatedResponse<T> {
  data: T[];
  links: {
    next?: string;
  };
}

/*
 * Function that fetches all paginated results from the API. As stated in the prompt,
 * performance is not paramount here.
 */
async function getAllPaginatedResults<T>(baseUrl: string): Promise<T[]> {
  const results: T[] = [];
  let nextUrl: string | undefined = baseUrl;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    if (!response.ok) {
      process.stderr.write(`Error: API request failed with status ${response.status}\n`);
      exit(1);
    }

    const page: PaginatedResponse<T> = await response.json();
    results.push(...page.data);
    nextUrl = page.links.next;
  }

  return results;
}

/*
 * Extra formatting needed due to bad requirements 
 */
function formatResults(results: { name: string; shifts: number }[]): string {
  const lines = results.map(
    ({ name, shifts }) =>
      `  { name: "${name}", shifts: ${shifts.toString().padStart(2, " ")} }`
  );

  return `[\n${lines.join(",\n")}\n]\n`;
}

async function fetchTopWorkplaces(): Promise<void> {
  try {
    // API Calls
    const workplaces = await getAllPaginatedResults<WorkplaceAPIResponse>(
      "http://localhost:3000/workplaces"
    );
    const shifts = await getAllPaginatedResults<ShiftAPIResponse>(
      "http://localhost:3000/shifts"
    );

    const workplacesById = Object.fromEntries(workplaces.map((w) => [w.id, w]));
    const shiftsByWorkplaceId = new Map<number, number>();

    // Only count completed shifts that haven't been cancelled
    const now = new Date();
    shifts.forEach((shift) => {
      if (!shift.cancelledAt && new Date(shift.endAt) < now) {
        const workplace = workplacesById[shift.workplaceId];
        if (workplace) {
          const count = shiftsByWorkplaceId.get(shift.workplaceId) || 0;
          shiftsByWorkplaceId.set(shift.workplaceId, count + 1);
        }
      }
    });

    // Convert to array, sort by shifts, and take top 3
    const results = [...shiftsByWorkplaceId.entries()]
      .map(([id, shifts]) => ({
        name: workplacesById[id].name,
        shifts,
      }))
      .sort((a, b) => b.shifts - a.shifts)
      .slice(0, 3);

    /*
     * We use process.stdout.write instead of console.log for two important reasons:
     * 1. console.log automatically adds a newline, which would break our precise formatting
     * 2. stdout gives us better control over the output stream and plays better with
     *    Unix pipes, making it easier to redirect the output to files or other processes
     */
    process.stdout.write(formatResults(results));
  } catch (error) {
    process.stderr.write(`Error: Failed to fetch top workplaces - ${error}\n`);
    exit(1);
  }
}

// Execute the script
fetchTopWorkplaces().catch((error) => {
  process.stderr.write(`Error: Unhandled error - ${error}\n`);
  exit(1);
});
