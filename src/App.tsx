import { useState, useEffect } from "react";
import { TabBar } from "./components/TabBar";
import { FAB } from "./components/FAB";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { EatScreen } from "./screens/EatScreen";
import { SeeDoScreen } from "./screens/SeeDoScreen";
import { ShopScreen } from "./screens/ShopScreen";
import { CafeScreen } from "./screens/CafeScreen";
import { DessertScreen } from "./screens/DessertScreen";
import { EssentialsScreen } from "./screens/EssentialsScreen";
import { AIChatScreen } from "./screens/AIChatScreen";

export default function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showAIChat, setShowAIChat] = useState(false);

  // Simulate onboarding completion check
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("tokyoGuideOnboarded");
    if (hasCompletedOnboarding) {
      setIsOnboardingComplete(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("tokyoGuideOnboarded", "true");
    setIsOnboardingComplete(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowAIChat(false);
  };

  const handleFABClick = () => {
    setShowAIChat(true);
  };

  const handleNavigateToTab = (tabIndex: number) => {
    const tabs = ["home", "eat", "see", "shop", "cafe", "dessert", "essentials"];
    if (tabs[tabIndex]) {
      setActiveTab(tabs[tabIndex]);
      setShowAIChat(false);
    }
  };

  // Show onboarding if not completed
  if (!isOnboardingComplete) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Show AI Chat
  if (showAIChat) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background relative">
        <AIChatScreen />
        <TabBar activeTab="ai" onTabChange={handleTabChange} />
      </div>
    );
  }

  // Main app content
  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigateToTab={handleNavigateToTab} />;
      case "eat":
        return <EatScreen />;
      case "see":
        return <SeeDoScreen />;
      case "shop":
        return <ShopScreen />;
      case "cafe":
        return <CafeScreen />;
      case "dessert":
        return <DessertScreen />;
      case "essentials":
        return <EssentialsScreen />;
      default:
        return <HomeScreen onNavigateToTab={handleNavigateToTab} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative">
      {renderScreen()}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      <FAB onClick={handleFABClick} />
      
      {/* Essentials Screen (accessible via Home quick actions) */}
      {activeTab === "essentials" && <EssentialsScreen />}
    </div>
  );
}