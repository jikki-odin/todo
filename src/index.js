import "./public/styling/styles.css";
import { AppView } from "./views";

// TODO: reconcile styling w/new structure
const appContainer = document.querySelector(".main");
const appView = new AppView(appContainer);
appView.render();
