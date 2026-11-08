import { CalculatorPage } from "./components/CalculatorPage";
import { BmiPage } from "./components/BmiPage";
import { Footer, Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ReportPage } from "./components/ReportPage";
import { LanguageProvider } from "./i18n/language";
import { StoreProvider, useStore } from "./state/store";

function Shell() {
  const { state } = useStore();
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {state.view === "home" && <HomePage />}
        {state.view === "calculator" && <CalculatorPage />}
        {state.view === "bmi" && <BmiPage />}
        {state.view === "report" && <ReportPage />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <Shell />
      </StoreProvider>
    </LanguageProvider>
  );
}
