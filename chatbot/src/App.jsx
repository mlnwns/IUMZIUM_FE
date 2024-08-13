import { useState, useRef, useEffect } from "react";
import {
  Sun,
  Moon,
  User,
  ChevronDown,
  ArrowRight,
  Send,
  Mic,
  X,
} from "lucide-react";

import { BarChart2, PieChart, DollarSign, TrendingUp } from "lucide-react";

const FinanceApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          {
            text: "Thanks for your message. How can I assist you today?",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            FinWise
          </h1>
          <nav className="hidden lg:flex space-x-6">
            <a href="#" className="hover:text-blue-500 transition-colors">
              대시보드
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              투자
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              상품
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              뉴스
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              교육
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-gray-600" />
              )}
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
                <User size={20} />
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  프로필
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  설정
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  로그아웃
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-20">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h2 className="text-3xl font-bold mb-4">
            당신의 재무 건강을 책임집니다
          </h2>
          <p className="text-l mb-8">
            AI기반 금융 상담으로 스마트한 투자를 시작하세요
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105">
            무료 상담 시작하기
          </button>
        </section>
        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          <div
            className={`p-6 rounded-2xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg transform hover:scale-105 transition-all duration-300`}
          >
            <PieChart className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">포트폴리오 분석</h3>
            <p>
              AI가 당신의 투자 포트폴리오를 분석하고 최적화 방안을 제시합니다.
            </p>
          </div>
          <div
            className={`p-6 rounded-2xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg transform hover:scale-105 transition-all duration-300`}
          >
            <BarChart2 className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">시장 동향 분석</h3>
            <p>최신 시장 동향을 실시간으로 분석하여 투자 기회를 포착합니다.</p>
          </div>
          <div
            className={`p-6 rounded-2xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg transform hover:scale-105 transition-all duration-300`}
          >
            <DollarSign className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">맞춤형 상품 추천</h3>
            <p>당신의 투자 성향과 목표에 맞는 최적의 금융 상품을 추천합니다.</p>
          </div>
        </section>
        {/* Market Overview */}
        <section
          className={`p-8 rounded-2xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg my-12`}
        >
          <h2 className="text-2xl font-bold mb-6">시장 개요</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`flex items-center justify-between p-4 rounded-lg bg-opacity-50 ${
                isDarkMode ? "bg-blue-900" : "bg-blue-100"
              }`}
            >
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  KOSPI
                </p>
                <p className="text-2xl font-bold">3,125.24</p>
              </div>
              <div className="flex items-center text-green-500">
                <TrendingUp size={20} className="mr-1" />
                <span>1.2%</span>
              </div>
            </div>
            <div
              className={`flex items-center justify-between p-4 rounded-lg bg-opacity-50 ${
                isDarkMode ? "bg-purple-900" : "bg-purple-100"
              }`}
            >
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  NASDAQ
                </p>
                <p className="text-2xl font-bold">14,242.36</p>
              </div>
              <div className="flex items-center text-red-500">
                <TrendingUp size={20} className="mr-1 transform rotate-180" />
                <span>0.8%</span>
              </div>
            </div>
            <div
              className={`flex items-center justify-between p-4 rounded-lg bg-opacity-50 ${
                isDarkMode ? "bg-green-900" : "bg-green-100"
              }`}
            >
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  USD/KRW
                </p>
                <p className="text-2xl font-bold">1,132.50</p>
              </div>
              <div className="flex items-center text-blue-500">
                <TrendingUp size={20} className="mr-1 transform rotate-45" />
                <span>0.3%</span>
              </div>
            </div>
          </div>
        </section>
        {/* News & Education */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12">
          <div
            className={`p-6 rounded-2xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            <h2 className="text-2xl font-bold mb-4">최신 금융 뉴스</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <ArrowRight className="mr-2 mt-1 flex-shrink-0 text-blue-500" />
                <p>중앙은행, 기준금리 동결 결정... 경제 회복 모멘텀 유지</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="mr-2 mt-1 flex-shrink-0 text-blue-500" />
                <p>가상화폐 시장 회복세, 비트코인 6만달러 돌파</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="mr-2 mt-1 flex-shrink-0 text-blue-500" />
                <p>글로벌 공급망 차질 지속... 인플레이션 우려 고조</p>
              </li>
            </ul>
            <button className="mt-4 text-blue-500 hover:text-blue-600 transition-colors duration-300 flex items-center">
              더 보기 <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div
            className={`p-6 rounded-2xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            <h2 className="text-2xl font-bold mb-4">금융 교육 컨텐츠</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <ArrowRight className="mr-2 mt-1 flex-shrink-0 text-green-500" />
                <p>초보자를 위한 주식 투자 가이드</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="mr-2 mt-1 flex-shrink-0 text-green-500" />
                <p>퇴직 연금의 모든 것: 안정적인 노후 준비</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="mr-2 mt-1 flex-shrink-0 text-green-500" />
                <p>세금 절약 전략: 합법적으로 세금 부담 줄이기</p>
              </li>
            </ul>
            <button className="mt-4 text-green-500 hover:text-green-600 transition-colors duration-300 flex items-center">
              더 보기 <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} py-12`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                FinWise
              </h3>
              <p className="text-sm mb-4">
                스마트한 금융 결정을 위한 당신의 파트너
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-500">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-700">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-blue-700 hover:text-blue-800">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">빠른 링크</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    서비스 소개
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    요금제
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    고객지원
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">법적 고지</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    이용약관
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    개인정보처리방침
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    책임의 한계와 법적고지
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">뉴스레터 구독</h4>
              <p className="text-sm mb-4">
                최신 금융 소식과 투자 팁을 받아보세요.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="flex-grow px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors"
                >
                  구독
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center">
            <p className="text-sm">&copy; 2024 FinWise. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div
        className={`fixed bottom-6 right-6 z-50 ${
          isChatOpen ? "w-96 h-[32rem]" : "w-16 h-16"
        } transition-all duration-300 ease-in-out`}
      >
        {isChatOpen ? (
          <div
            className={`w-full h-full flex flex-col rounded-lg shadow-xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold">FinWise 챗봇</h3>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  className="flex-grow px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors"
                >
                  <Send size={20} />
                </button>
                <button className="ml-2 bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                  <Mic size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleChat}
            className="w-full h-full bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
export default FinanceApp;
