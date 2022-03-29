import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --modePrimary: ${({ mode }) => mode.primary};
    --modeSecondary: ${({ mode }) => mode.secondary};
    --modeTertiary: ${({ mode }) => mode.tertiary};
    --modeQuaternary: ${({ mode }) => mode.quaternary};
    --modeQuinary: ${({ mode }) => mode.quinary};
    --modeSenary: ${({ mode }) => mode.senary};
    --modeAccent: ${({ mode }) => mode.accent};
    --themeAccent: ${({ mode }) => mode.accent};
    --themeDanger: ${({ theme }) => theme.danger};
    --themeWarning: ${({ theme }) => theme.warning};
    --themeInfo: ${({ theme }) => theme.info};
    --themeSuccess: ${({ theme }) => theme.success};
    --themePrimary: ${({ theme }) => theme.primary};
    --themeSecondary: ${({ theme }) => theme.secondary};
    --themeDangerT: ${({ theme }) => theme.dangerT};
    --themeWarningT: ${({ theme }) => theme.warningT};
    --themeInfoT: ${({ theme }) => theme.infoT};
    --themeSuccessT: ${({ theme }) => theme.successT};
    --themePrimaryT: ${({ theme }) => theme.primaryT};
    --themeSecondaryT: ${({ theme }) => theme.secondaryT};
    font-size: ${({ fontSize }) => fontSize};
    background: var(--modePrimary);
    color: var(--modeSenary);
  }

  #root {
    background: var(--modePrimary);
    color: var(--modeSenary);
    margin: 0;
  }

  ::-webkit-scrollbar {
    background: transparent;
    width: .5rem;
  }

  ::-webkit-scrollbar-thumb {
      background: var(--modeSecondary);
      border-radius: .25rem;
      max-width: .5rem;
  }

  details {
  }

  summary {
    list-style: none;
    position: relative;
  }
  
  summary::after {
    content: '▶';
    position: absolute;    
    top: .8rem;
    transform: translateY(-50%);
    right: .8rem;
  }

  summary span {
  }

  details[open] {
  }

  details[open] summary::after {
    content: "▼";
  }

  .form-control {
    background: var(--modeSecondary);
    color: var(--modeSenary);
    border: 1px solid var(--modeQuinary);
  }

  .form-control:hover {
    background: var(--modeSecondary);
    color: var(--modeSenary);
    border: 1px solid var(--modeSenary);
  }

  .form-control:focus {
    box-shadow: 0 0 0 0.1rem var(--modeAccent));
    background: var(--modeSecondary);
    color: var(--modeSenary);
    outline: none;
  }

  .form-control:disabled {
    background: var(--modePrimary);
    color: var(--modeSenary);
    outline: none;
  }

  .form-control::-webkit-input-placeholder {
    color: var(--modeQuinary);
  }

  .form-label {
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }

  .form-error {
    color: rgb(var(--themeDanger));
    border-radius: .5rem;
  }

  .pswrd {
    display: flex;
    justify-content: space-between;
  }

  .input-group-text {
    background: var(--modeSenary);
    border: 1px solid var(--modeSenary);
    color: var(--modePrimary);
  }

  .dropdown.show {
    width: 100%;
  }

  input[type="checkbox"] + label { 
    cursor: pointer;
    display: block;
    width: inherit;
    padding: .25rem 0 0 2rem;
    margin: -.25rem 0 0 -1.5rem;
    color: var(--modeSenary);
  }

  div.dropdown-menu.show {
    display: block;
    min-width: 0;
    width: 100%;
    background: var(--modePrimary) !important;
  }

  div.dropdown-menu.show > span.dropdown-item-text {
    display: block;
    min-width: 0;
    width: 100%;
    color: var(--modeSenary) !important;
    padding: 0;
  }

  div.dropdown-menu.show > a.dropdown-item {
    display: block;
    min-width: 0;
    width: 100%;
    color: var(--modeSenary) !important;
    padding: .5rem;
  }

  div.dropdown-menu.show > a.dropdown-item:hover {
    background: var(--modeSecondary)!important;
    color: var(--modeQuinary) !important;
  }

  .borderLeft-accent {
    border-left: 3px solid var(--themeAccent);
  }

  .borderLeft-danger {
    border-left: 3px solid rgb(var(--themeDanger));
  }

  .borderLeft-warning {
    border-left: 3px solid rgb(var(--themeWarning));
  }

  .borderLeft-info {
    border-left: 3px solid rgb(var(--themeInfo));
  }

  .borderLeft-success {
    border-left: 3px solid rgb(var(--themeSuccess));
  }

  .borderLeft-primary {
    border-left: 3px solid rgb(var(--themePrimary));
  }

  .borderLeft-secondary {
    border-left: 3px solid rgb(var(--themeSecondary));
  }

  .borderRight-accent {
    border-right: 3px solid var(--themeAccent);
  }

  .borderRight-danger {
    border-right: 3px solid rgb(var(--themeDanger));
  }

  .borderRight-warning {
    border-right: 3px solid rgb(var(--themeWarning));
  }

  .borderRight-info {
    border-right: 3px solid rgb(var(--themeInfo));
  }

  .borderRight-success {
    border-right: 3px solid rgb(var(--themeSuccess));
  }

  .borderRight-primary {
    border-right: 3px solid rgb(var(--themePrimary));
  }

  .borderRight-secondary {
    border-right: 3px solid rgb(var(--themeSecondary));
  }

  .dropdown-toggle {
    display: block;
    text-align: left;
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: 2.35rem;
  }

  .dropdown-toggle > p {
    position: absolute;
    top: .35rem;
  }

  .dropdown-toggle:after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
  }

  .btn.btn-accent {
    color: var(--modeSenary);
    background-color: var(--modeSecondary);
    border-color: var(--modeQuinary);
  }

  .btn.btn-accent:hover {
    color: var(--modeSenary);
    background-color: var(--modeAccent);
    border-color: var(--modeAccent);
  }

  .btn.btn-accent:active {
    color: var(--modeSenary) !important;
    background-color: var(--modeAccent) !important;
    border-color: var(--modeSenary) !important;
  }

  .btn.btn-accent.active {
    color: var(--modeSenary) !important;
    background-color: var(--modeAccent) !important;
    border-color: var(--modeAccent) !important;
  }

  .btn.btn-accent:focus {
    border-color: transparent;
    box-shadow: 0 0 0 0.1rem var(--modeAccent) !important;
  }

  .btn.btn-danger {
    color: var(--modeSenary);
    background-color: var(--modeSecondary);
    border-color: rgb(var(--themeDanger));
  }

  .btn.btn-danger:hover {
    color: rgb(var(--themeDangerT));
    background-color: rgb(var(--themeDanger));
    border-color: rgb(var(--themeDanger));
  }

  .btn.btn-danger:active {
    color: rgb(var(--themeDangerT)); !important;
    background-color: rgb(var(--themeDanger)) !important;
    border-color: var(--modeSenary) !important;
  }

  .btn.btn-danger.active {
    color: rgb(var(--themeDangerT)); !important;
    background-color: rgb(var(--themeDanger)) !important;
    border-color: rgb(var(--themeDanger)) !important;
  }

  .btn.btn-danger:focus {
    box-shadow: 0 0 0 0.1rem rgb(var(--themeDanger));
  }

  .btn.btn-warning {
    color: var(--modeSenary);
    background-color: var(--modeSecondary);
    border-color: rgb(var(--themeWarning));
  }

  .btn.btn-warning:hover {
    color: rgb(var(--themeWarningT));
    background-color: rgb(var(--themeWarning));
    border-color: rgb(var(--themeWarning));
  }

  .btn.btn-warning:active {
    color: rgb(var(--themeWarningT)) !important;
    background-color: rgb(var(--themeWarning)) !important;
    border-color: var(--modeSenary) !important;
  }

  .btn.btn-warning.active {
    color: rgb(var(--themeWarningT)) !important;
    background-color: rgb(var(--themeWarning)) !important;
    border-color: rgb(var(--themeWarning)) !important;
  }

  .btn.btn-warning:focus {
    box-shadow: 0 0 0 0.1rem rgb(var(--themeWarning));
  }

  .btn.btn-info {
    color: var(--modeSenary);
    background-color: var(--modeSecondary);
    border-color: rgb(var(--themeInfo));
  }

  .btn.btn-info:hover {
    color: rgb(var(--themeInfoT));
    background-color: rgb(var(--themeInfo));
    border-color: rgb(var(--themeInfo));
  }

  .btn.btn-info:active {
    color: rgb(var(--themeInfoT)) !important;
    background-color: rgb(var(--themeInfo)) !important;
    border-color: var(--modeSenary) !important;
  }

  .btn.btn-info.active {
    color: rgb(var(--themeInfoT)) !important;
    background-color: rgb(var(--themeInfo)) !important;
    border-color: rgb(var(--themeInfo)) !important;
  }

  .btn.btn-info:focus {
    box-shadow: 0 0 0 0.1rem rgb(var(--themeInfo));
  }


  .btn.btn-success {
    color: var(--modeSenary);
    background-color: var(--modeSecondary);
    border-color: rgb(var(--themeSuccess));
  }

  .btn.btn-success:hover {
    color: rgb(var(--themeSuccessT));
    background-color: rgb(var(--themeSuccess));
    border-color: rgb(var(--themeSuccess));
  }

  .btn.btn-success:active {
    color: rgb(var(--themeSuccessT)) !important;
    background-color: rgb(var(--themeSuccess)) !important;
    border-color: var(--modeSenary) !important;
  }

  .btn.btn-success.active {
    color: rgb(var(--themeSuccessT)) !important;
    background-color: rgb(var(--themeSuccess)) !important;
    border-color: rgb(var(--themeSuccess)) !important;
  }

  .btn.btn-success:focus {
    box-shadow: 0 0 0 0.1rem rgb(var(--themeSuccess));
  }


  a.btn-accent {
    color: var(--modeSenary);
    background-color: var(--modeSecondary);
    border: 1px solid var(--modeSenary);
    border-radius: .25rem;
    padding: .375rem .75rem;
    vertical-align: center;
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  a.btn-accent:hover {
    color: var(--modeSenary);
    background-color: var(--modeAccent);
    border-color: var(--modeAccent);
  }

  a.btn-accent:active {
    color: var(--modeSenary) !important;
    background-color: var(--modeAccent) !important;
    border-color: var(--modeSenary) !important;
  }

  a.btn-accent.active {
    color: var(--modeSenary) !important;
    background-color: var(--modeAccent) !important;
    border-color: var(--modeAccent) !important;
  }

  a.btn-accent:focus {
    box-shadow: 0 0 0 0.1rem var(--modeAccent);
  }
  .btn.btn-primary {
    color: var(--modeSenary);
    background-color: var(--modeSecondary);
    border-color: rgb(var(--themePrimary));
  }

  .btn.btn-primary:hover {
    color: rgb(var(--themePrimaryT));
    background-color: rgb(var(--themePrimary));
    border-color: rgb(var(--themePrimary));
  }

  .btn.btn-primary:active {
    color: rgb(var(--themePrimaryT))!important;
    background-color: rgb(var(--themePrimary)) !important;
    border-color: var(--modeSenary) !important;
  }

  .btn.btn-primary.active {
    color: rgb(var(--themePrimaryT)) !important;
    background-color: rgb(var(--themePrimary)) !important;
    border-color: rgb(var(--themePrimary)) !important;
  }

  .btn.btn-primary:focus {
    box-shadow: 0 0 0 0.1rem rgb(var(--themePrimary));
  }

  .btn.btn-secondary {
    color: var(--modeSenary);
    background-color: var(--modeSecondary);
    border-color: rgb(var(--themeSecondary));
  }

  .btn.btn-secondary:hover {
    color: rgb(var(--themeSecondaryT));
    background-color: rgb(var(--themeSecondary));
    border-color: rgb(var(--themeSecondary));
  }

  .btn.btn-secondary:active {
    color: rgb(var(--themeSecondaryT)) !important;
    background-color: rgb(var(--themeSecondary)) !important;
    border-color: var(--modeSenary) !important;
  }

  .btn.btn-secondary.active {
    color: rgb(var(--themeSecondaryT)) !important;
    background-color: rgb(var(--themeSecondary)) !important;
    border-color: rgb(var(--themeSecondary)) !important;
  }

  .btn.btn-secondary:focus {
    box-shadow: 0 0 0 0.1rem rgb(var(--themeSecondary));
  }

  .hcpWrapper {
    display: block;
    width: 100%;
  }

  .hcpWrapper .react-colorful {
    width: 100%;
  }

  .gridwrapper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-content: stretch;
  }
  .gridwrapper > div:nth-child(1) {
    width: 17rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    border-right: 1px solid var(--modeSecondary);
  }
  .gridwrapper > div:nth-child(2) {
    flex-grow: 1;
    height: 100vh;
    padding: 1rem;
    align-items: center;
    justify-content: center;
    display: flex;
    max-width: calc(100vw - 17rem);
    margin: auto;
    position: relative;
    overflow: hidden;
  }
  .gridwrapper > div:nth-child(2) > svg {
    position: absolute;
    height: auto;
    fill: "var(--modeSenary)";
    min-width: calc(100vw - 17rem);
  }
  .gridwrapper > div:nth-child(1) > .inner {
    height: 100vh;
    overflow: scroll;
    padding: 0 0 0 .5rem;
    margin: 0;
    width: 100%;
    overflow-x: hidden;
  }
  .innerGrid {
    display: grid;
    grid-gap: 1rem;
    margin-bottom: 1rem;
  }
  .gridDataWrapper {
    position: relative;
    height: 0;
    margin: auto;
    vertical-align: center;
    align-self: center;
    z-index: 10;
  }
  .gridwrapper > div:nth-child(1) > h2 {
    font-size: 1.8rem;
    background: var(--modePrimary);
    position: sticky;
    top: 0;
    padding: 1rem;
    vertical-align: center;
    z-index: 1000;
  }
  .numberpad {
    display: grid;
    grid-template-columns: repeat(19, 1fr);
    grid-template-rows: repeat(24, 1fr);
    min-width: 80%;
    max-width: 80%;
    min-height: 100%;
    max-height: 100%;
    margin-left: 10%;
  }
  .numberpad div,
  .numberpad button {
    overflow-y: auto;
    overflow-x: hidden;
    grid-column: span 5;
    grid-row: span 5;
    min-width: 80%;
    min-height: 80%;
    max-width: 80%;
    max-height: 80%;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s ease transition;
    position: relative;
  }
  .numberpad div > span:first-child,
  .numberpad button > span:first-child {
    position: absolute;
    top: .5rem;
    left: .5rem;
    min-height: fit-content;
    max-height: fit-content;
    text-align: left;
    white-space: nowrap;
    pointer-events: none;
  }
  .numberpad div > span:first-child > hr,
  .numberpad button > span:first-child > hr {
    margin: 0;
  }
  .numberpad div > span,
  .numberpad button > span {
    position: absolute;
    top: 2rem;
    left: .5rem;
    min-width: calc(100% - .5rem);
    min-height: fit-content;
    max-width: calc(100% - .5rem);
    max-height: fit-content;
    text-align: left;
    word-break: break-all;
    pointer-events: none;
    padding: 0 0 .5rem 0;
  }
  .numberpad div > span:nth-child(2),
  .numberpad button > span:nth-child(2),
  .keyboard div > span:nth-child(2),
  .keyboard button > span:nth-child(2),
  .touch div > span:nth-child(2),
  .touch button > span:nth-child(2) {
    font-size: min(2.67vw, 2.67vh);
  }
  .numberpad div:nth-child(4),
  .numberpad button:nth-child(4) {
    grid-column: span 4;
    min-width: 100%;
    max-width: 100%;
  }
  .numberpad div:nth-child(8),
  .numberpad button:nth-child(8) {
    grid-column: span 4;
    grid-row: span 10;
    min-width: 100%;
    min-height: 90%;
    max-width: 100%;
    max-height: 90%;
  }
  .numberpad div:nth-child(15),
  .numberpad button:nth-child(15) {
    grid-column: span 4;
    grid-row: span 9;
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
  .numberpad div:nth-child(16),
  .numberpad button:nth-child(16) {
    grid-column: span 10;
    grid-row: span 4;
    min-width: 90%;
    min-height: 100%;
    max-width: 90%;
    max-height: 100%;
  }
  .numberpad div:nth-child(17),
  .numberpad button:nth-child(17) {
    grid-row: span 4;
    min-height: 100%;
    max-height: 100%;
  }
  .keyboard {
    display: grid;
    grid-template-columns: repeat(23, 1fr);
    grid-template-rows: repeat(24, 1fr);
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    margin: auto;
  }
  .keyboard div,
  .keyboard button {
    overflow-y: auto;
    overflow-x: hidden;
    grid-column: span 5;
    grid-row: span 5;
    min-width: 80%;
    min-height: 80%;
    max-width: 80%;
    max-height: 80%;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s ease transition;
    position: relative;
  }
  .keyboard div > span:first-child,
  .keyboard button > span:first-child {
    position: absolute;
    top: .5rem;
    left: .5rem;
    min-height: fit-content;
    max-height: fit-content;
    text-align: left;
    white-space: nowrap;
    pointer-events: none;
  }
  .keyboard div > span:first-child > hr,
  .keyboard button > span:first-child > hr {
    margin: 0;
  }
  .keyboard div > span,
  .keyboard button > span {
    position: absolute;
    top: 2rem;
    left: .5rem;
    min-width: calc(100% - .5rem);
    min-height: fit-content;
    max-width: calc(100% - .5rem);
    max-height: fit-content;
    text-align: left;
    word-break: break-all;
    pointer-events: none;
    padding: 0 0 .5rem 0;
  }
  .keyboard div:nth-child(3),
  .keyboard button:nth-child(3) {
    grid-column-start: 11;
    grid-column-end: 16;
  }
  .keyboard div:nth-child(5),
  .keyboard button:nth-child(5) {
    grid-column-start: 2;
    grid-column-end: 7;
  }
  .keyboard div:nth-child(4),
  .keyboard button:nth-child(4) {
    grid-row-start: 6;
    grid-row-end: 11;
    grid-column-start: 17;
    grid-column-end: 22;
  }
  .keyboard div:nth-child(8),
  .keyboard button:nth-child(8) {
    grid-column-start: 18;
    grid-column-end: 23;
    grid-row-start: 11;
    grid-row-end: 16;
  }
  .keyboard div:nth-child(9),
  .keyboard button:nth-child(9) {
    grid-column-start: 3;
    grid-column-end: 8;
    grid-row-start: 11;
    grid-row-end: 16;
  }
  .keyboard div:nth-child(12),
  .keyboard button:nth-child(12) {
    grid-column-start: 5;
    grid-column-end: 10;
  }
  .keyboard div:nth-child(15),
  .keyboard button:nth-child(15) {
    grid-column: span 4;
    min-width: 100%;
    max-width: 100%;
  }
  .keyboard div:nth-child(16),
  .keyboard button:nth-child(16) {
    grid-column-start: 1;
    grid-column-end: 18;
    grid-row: span 4;
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
  .keyboard div:nth-child(17),
  .keyboard button:nth-child(17) {
    grid-column-start: 19;
    grid-column-end: 24;
    grid-row: span 4;
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  .touch {
    display: grid;
    grid-template-columns: repeat(19, 1fr);
    grid-template-rows: repeat(19, 1fr);
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
    margin: auto;
  }
  .touch div,
  .touch button {
    overflow-y: auto;
    overflow-x: hidden;
    grid-column: span 5;
    grid-row: span 5;
    min-width: 80%;
    min-height: 80%;
    max-width: 80%;
    max-height: 80%;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s ease transition;
    position: relative;
  }
  .touch div > span:first-child,
  .touch button > span:first-child {
    position: absolute;
    top: .5rem;
    left: .5rem;
    min-height: fit-content;
    max-height: fit-content;
    text-align: left;
    white-space: nowrap;
    pointer-events: none;
  }
  .touch div > span:first-child > hr,
  .touch button > span:first-child > hr {
    margin: 0;
  }
  .touch div > span,
  .touch button > span {
    position: absolute;
    top: 2rem;
    left: .5rem;
    min-width: calc(100% - .5rem);
    min-height: fit-content;
    max-width: calc(100% - .5rem);
    max-height: fit-content;
    text-align: left;
    word-break: break-all;
    pointer-events: none;
    padding: 0 0 .5rem 0;
  }
  .touch div:nth-child(1),
  .touch button:nth-child(1) {
    display: none;
  }
  .touch div:nth-child(5),
  .touch button:nth-child(5) {
    grid-column: span 4;
    min-width: 100%;
    max-width: 100%;
  }
  .touch div:nth-child(9),
  .touch button:nth-child(9) {
    grid-column: span 4;
    min-width: 100%;
    max-width: 100%;
  }
  .touch div:nth-child(13),
  .touch button:nth-child(13) {
    grid-column: span 4;
    min-width: 100%;
    max-width: 100%;
  }
  .touch div:nth-child(14),
  .touch button:nth-child(14),
  .touch div:nth-child(15),
  .touch button:nth-child(15),
  .touch div:nth-child(16),
  .touch button:nth-child(16)  {
    grid-row: span 4;
    min-height: 100%;
    max-height: 100%;
  }
  .touch div:nth-child(17),
  .touch button:nth-child(17) {
    grid-column: span 4;
    min-width: 100%;
    max-width: 100%;
    grid-row: span 4;
    min-height: 100%;
    max-height: 100%;
  }

  @media (max-width: 600px) {
    .numberpad div > span:nth-child(2),
    .numberpad button > span:nth-child(2),
    .keyboard div > span:nth-child(2),
    .keyboard button > span:nth-child(2),
    .touch div > span:nth-child(2),
    .touch button > span:nth-child(2) {
      font-size: 1rem;
    }
    .gridwrapper > div:nth-child(1) {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      margin-bottom: 3rem;
      border-right: none;
    }
    .gridwrapper > div:nth-child(2) {
      display: none;
    }
    .innerGrid {
      grid-template-columns: repeat(3, 1fr);
    }
    .mobileOnly {
      display: grid;
    }
    .gridDataWrapper {
      width: min(calc(100vw - 1rem), calc(100vh - 8.7rem));
      padding-bottom: min(calc(100vw - 1rem), calc(100vh - 8.7rem));
    }
  }
  
  @media (min-width: 601px) {
    .innerGrid {
      grid-template-columns: repeat(2, 1fr);
    }
    .innerGrid > button:nth-child(3) {
      display: none;
    }
    .gridDataWrapper {
      width: min(calc(100vw - 19rem), calc(100vh - 2rem));
      padding-bottom: min(calc(100vw - 19rem), calc(100vh - 2rem));
    }
  }
  `; // Keep this last line for the ` as required to close the code
