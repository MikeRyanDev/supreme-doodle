import axios from "axios";
import chalk from "chalk";

const LOCATIONS = new Map([
  ["Decatur", 16],
  ["Madison", 13],
  ["Limestone", 12],
  ["Marshall", 15],
  ["Lawrence", 11],
  ["Lauderdale", 86],
  ["Jackson", 86],
  ["Dekalb", 92],
]);

function getApiUrl(locationId: number): string {
  return `https://al-telegov.egov.com/alabamavaccine/CustomerCreateAppointments/GetEarliestAvailability?appointmentTypeId=1&locationId=${locationId}`;
}

function getScheduleUrl(locationId: number): string {
  return `https://al-telegov.egov.com/alabamavaccine/AppointmentWizard/1/${locationId}/1`;
}

async function main() {
  while (true) {
    console.log("\n\n");
    for (let [name, id] of LOCATIONS) {
      const response = await axios.get(getApiUrl(id));

      console.log(`${name}: ${response.data}`);

      const nextDate: string = response.data;

      if (nextDate.startsWith("March 17") || nextDate.startsWith("March 18")) {
        console.log(chalk.red.bold.bgBlack(getScheduleUrl(id)));
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 5_000));
  }
}

main();
