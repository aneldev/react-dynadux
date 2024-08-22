import * as React from 'react';
import {createRoot} from "react-dom/client";

import { App } from "./AppExamples/ColorPickerApp/App";

const appWrapperID: string = 'app-container';
const appElement: HTMLElement = document.createElement("DIV");
appElement.id = appWrapperID;
document.body.appendChild(appElement);

createRoot(appElement).render(<App />);
