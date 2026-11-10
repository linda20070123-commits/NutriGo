import { CalculatorPage } from "./components/CalculatorPage";
import { BmiPage } from "./components/BmiPage";
import { Footer, Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { MealBookingModal } from "./components/MealBookingModal";
import { MembershipPage } from "./components/MembershipPage";
import { ReportPage } from "./components/ReportPage";
import { mealBoxByProductId } from "./data/mealBoxes";
import { LanguageProvider } from "./i18n/language";
import { StoreProvider, useStore } from "./state/store";

function Shell() {
  const { state, dispatch } = useStore();
  const bookingMeal = state.bookingProductId ? mealBoxByProductId(state.bookingProductId) ?? null : null;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {state.view === "home" && <HomePage />}
        {state.view === "calculator" && <CalculatorPage />}
        {state.view === "bmi" && <BmiPage />}
        {state.view === "report" && <ReportPage />}
        {state.view === "membership" && <MembershipPage />}
      </main>
      <Footer />
      {/* Always mounted so that reopening the same box resets the flow: the
          modal sees `meal` go from null back to a box and clears its state. */}
      <MealBookingModal
        meal={bookingMeal}
        onClose={() => dispatch({ type: "close-booking" })}
        onConfirm={() => undefined}
      />
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
