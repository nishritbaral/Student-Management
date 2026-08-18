import { loadFromFile } from "./models/students.ts";
import { featuresChoice } from "./utils/feature.choice.ts";

const message = await loadFromFile();
console.log(`DB:${message.message}`);

await featuresChoice();
