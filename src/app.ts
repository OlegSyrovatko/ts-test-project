/// <reference path = "./models/drag-drop-interfaces.ts" />
/// <reference path = "./models/project.ts" />
/// <reference path = "./state/project.ts" />
/// <reference path = "./util/validation.ts" />
/// <reference path = "./decorators/autobind-decorator.ts" />
/// <reference path = "./components/base-components.ts" />
/// <reference path = "./components/project-item.ts" />
/// <reference path = "./components/project-list.ts" />
/// <reference path = "./components/project-input.ts" />

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
