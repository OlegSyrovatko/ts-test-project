// /// <reference path = "./components/project-list.ts" />
// /// <reference path = "./components/project-input.ts" />

// import { ProjectList } from "./components/project-list.js";
// import { ProjectInput } from "./components/project-input.js";

import { ProjectList } from "./components/project-list";
import { ProjectInput } from "./components/project-input";

// namespace App {
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
// }

import _ from "lodash";
console.log(_.shuffle([1, 2, 3]));

declare var Global: any;
console.log(Global);
