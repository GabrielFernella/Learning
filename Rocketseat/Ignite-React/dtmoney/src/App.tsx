import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";

export function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <GlobalStyle />
    </>
  );
}


/*
 "@typescript-eslint/eslint-plugin": "^4.3.0",
    "@typescript-eslint/parser": "^4.3.0",
    "eslint": "6.8.0",
    "eslint-config-airbnb": "^18.2.0",
    "eslint-config-prettier": "^6.12.0",
    "eslint-import-resolver-typescript": "^2.3.0",
    "eslint-plugin-import": "2.20.1",
    "eslint-plugin-jsx-a11y": "6.2.3",
    "eslint-plugin-prettier": "^3.1.4",
    "eslint-plugin-react": "7.19.0",
    "eslint-plugin-react-hooks": "2.5.0",
    "prettier": "^2.1.2"

*/