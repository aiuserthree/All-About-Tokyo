import { useState, useEffect } from "react";
import { TabBar } from "./components/TabBar";
import { FloatingMenu } from "./components/FloatingMenu";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { EatScreen } from "./screens/EatScreen";
import { SeeDoScreen } from "./screens/SeeDoScreen";
import { ShopScreen } from "./screens/ShopScreen";
import { CafeScreen } from "./screens/CafeScreen";
import { DessertScreen } from "./screens/DessertScreen";
import { EssentialsScreen } from "./screens/EssentialsScreen";
import { AIChatScreen } from "./screens/AIChatScreen";
import { FlightInfoScreen } from "./screens/FlightInfoScreen";
import { HotelInfoScreen } from "./screens/HotelInfoScreen";
import { LocationBasedScreen } from "./screens/LocationBasedScreen";
import { TokyoLiveInfoScreen } from "./screens/TokyoLiveInfoScreen";
import { JapaneseScreen } from "./screens/JapaneseScreen";

export default function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showAIChat, setShowAIChat] = useState(false);
  const [showFlightInfo, setShowFlightInfo] = useState(false);
  const [showHotelInfo, setShowHotelInfo] = useState(false);
  const [showLocationBased, setShowLocationBased] = useState(false);
  const [showLiveInfo, setShowLiveInfo] = useState(false);
  const [showJapanese, setShowJapanese] = useState(false);

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
    setShowFlightInfo(false);
    setShowHotelInfo(false);
    setShowLocationBased(false);
    setShowLiveInfo(false);
    setShowJapanese(false);
    // 탭 변경 시 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFABClick = () => {
    setShowAIChat(true);
    setShowFlightInfo(false);
    setShowHotelInfo(false);
    setShowLocationBased(false);
    setShowLiveInfo(false);
    setShowJapanese(false);
    // AI 채팅 화면으로 이동 시 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFlightInfoClick = () => {
    setShowFlightInfo(true);
    setShowAIChat(false);
    setShowHotelInfo(false);
    setShowLocationBased(false);
    setShowLiveInfo(false);
    setShowJapanese(false);
    // 항공권 정보 화면으로 이동 시 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHotelInfoClick = () => {
    setShowHotelInfo(true);
    setShowAIChat(false);
    setShowFlightInfo(false);
    setShowLocationBased(false);
    setShowLiveInfo(false);
    setShowJapanese(false);
    // 호텔 정보 화면으로 이동 시 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFlightInfoBack = () => {
    setShowFlightInfo(false);
  };

  const handleHotelInfoBack = () => {
    setShowHotelInfo(false);
  };

  const handleLocationBasedClick = () => {
    setShowLocationBased(true);
    setShowAIChat(false);
    setShowFlightInfo(false);
    setShowHotelInfo(false);
    setShowLiveInfo(false);
    setShowJapanese(false);
    // 위치 기반 추천 화면으로 이동 시 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLocationBasedBack = () => {
    setShowLocationBased(false);
  };

  const handleLiveInfoClick = () => {
    setShowLiveInfo(true);
    setShowAIChat(false);
    setShowFlightInfo(false);
    setShowHotelInfo(false);
    setShowLocationBased(false);
    setShowJapanese(false);
    // 실시간 정보 화면으로 이동 시 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLiveInfoBack = () => {
    setShowLiveInfo(false);
  };

  const handleJapaneseClick = () => {
    setShowJapanese(true);
    setShowAIChat(false);
    setShowFlightInfo(false);
    setShowHotelInfo(false);
    setShowLocationBased(false);
    setShowLiveInfo(false);
    // 일본어 화면으로 이동 시 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJapaneseBack = () => {
    setShowJapanese(false);
  };

  const handleHomeClick = () => {
    setActiveTab("home");
    setShowAIChat(false);
    setShowFlightInfo(false);
    setShowHotelInfo(false);
    setShowLocationBased(false);
    setShowLiveInfo(false);
    setShowJapanese(false);
    // 홈 화면으로 이동 시 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTab = (tabIndex: number) => {
    const tabs = ["home", "eat", "see", "shop", "cafe", "dessert", "essentials"];
    if (tabs[tabIndex]) {
      setActiveTab(tabs[tabIndex]);
      setShowAIChat(false);
      setShowFlightInfo(false);
      setShowHotelInfo(false);
      setShowLocationBased(false);
      setShowLiveInfo(false);
      setShowJapanese(false);
      // 탭으로 이동 시 최상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <FloatingMenu 
          onFlightInfoClick={handleFlightInfoClick}
          onHotelInfoClick={handleHotelInfoClick}
          onHomeClick={handleHomeClick}
          onAIChatClick={handleFABClick}
          onLiveInfoClick={handleLiveInfoClick}
          onJapaneseClick={handleJapaneseClick}
        />
      </div>
    );
  }

  // Show Flight Info
  if (showFlightInfo) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background relative">
        <FlightInfoScreen onBack={handleFlightInfoBack} />
        <FloatingMenu 
          onFlightInfoClick={handleFlightInfoClick}
          onHotelInfoClick={handleHotelInfoClick}
          onHomeClick={handleHomeClick}
          onAIChatClick={handleFABClick}
          onLiveInfoClick={handleLiveInfoClick}
          onJapaneseClick={handleJapaneseClick}
        />
      </div>
    );
  }

  // Show Hotel Info
  if (showHotelInfo) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background relative">
        <HotelInfoScreen onBack={handleHotelInfoBack} />
        <FloatingMenu 
          onFlightInfoClick={handleFlightInfoClick}
          onHotelInfoClick={handleHotelInfoClick}
          onHomeClick={handleHomeClick}
          onAIChatClick={handleFABClick}
          onLiveInfoClick={handleLiveInfoClick}
          onJapaneseClick={handleJapaneseClick}
        />
      </div>
    );
  }

  // Show Location Based Screen
  if (showLocationBased) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background relative">
        <LocationBasedScreen onBack={handleLocationBasedBack} />
        <FloatingMenu 
          onFlightInfoClick={handleFlightInfoClick}
          onHotelInfoClick={handleHotelInfoClick}
          onHomeClick={handleHomeClick}
          onAIChatClick={handleFABClick}
          onLiveInfoClick={handleLiveInfoClick}
          onJapaneseClick={handleJapaneseClick}
        />
      </div>
    );
  }

  // Show Tokyo Live Info
  if (showLiveInfo) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background relative">
        <TokyoLiveInfoScreen onBack={handleLiveInfoBack} />
        <FloatingMenu 
          onFlightInfoClick={handleFlightInfoClick}
          onHotelInfoClick={handleHotelInfoClick}
          onHomeClick={handleHomeClick}
          onAIChatClick={handleFABClick}
          onLiveInfoClick={handleLiveInfoClick}
          onJapaneseClick={handleJapaneseClick}
        />
      </div>
    );
  }

  // Show Japanese Screen
  if (showJapanese) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background relative">
        <JapaneseScreen onBack={handleJapaneseBack} />
        <FloatingMenu 
          onFlightInfoClick={handleFlightInfoClick}
          onHotelInfoClick={handleHotelInfoClick}
          onHomeClick={handleHomeClick}
          onAIChatClick={handleFABClick}
          onLiveInfoClick={handleLiveInfoClick}
          onJapaneseClick={handleJapaneseClick}
        />
      </div>
    );
  }

  // Main app content
  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigateToTab={handleNavigateToTab} onLocationBasedClick={handleLocationBasedClick} />;
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
      <FloatingMenu 
        onFlightInfoClick={handleFlightInfoClick}
        onHotelInfoClick={handleHotelInfoClick}
        onHomeClick={handleHomeClick}
        onAIChatClick={handleFABClick}
        onLiveInfoClick={handleLiveInfoClick}
        onJapaneseClick={handleJapaneseClick}
      />
    </div>
  );
}