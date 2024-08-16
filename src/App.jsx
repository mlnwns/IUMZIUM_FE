import React, { useState, useEffect, useRef } from "react";
import {
  Coffee,
  IceCream,
  Cake,
  MessageCircle,
  CreditCard,
  Minus,
  Mic,
} from "lucide-react";

const categories = [
  { name: "커피", icon: Coffee },
  { name: "블렌디드", icon: IceCream },
  { name: "티", icon: Coffee },
  { name: "기타 음료", icon: Coffee },
  { name: "디저트", icon: Cake },
];

const menuItems = {
  커피: ["아메리카노", "카페라떼", "카푸치노"],
  프라푸치노: ["자바칩 프라푸치노", "카라멜 프라푸치노"],
  블렌디드: ["망고 블렌디드", "베리 블렌디드"],
  티: ["얼그레이", "캐모마일", "그린티"],
  "기타 음료": ["핫초코", "바닐라라떼"],
  디저트: ["치즈케이크", "초코 머핀", "크루아상"],
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("커피");
  const [showChat, setShowChat] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { text: "안녕하세요! 무엇을 도와드릴까요?", isUser: false },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const chatRef = useRef(null);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowChat(false);
      }
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addToOrder = (item) => {
    setSelectedItem(item);
    setShowOptions(true);
  };

  const confirmOrder = (options) => {
    setOrderItems([...orderItems, { ...selectedItem, ...options }]);
    setShowOptions(false);
  };

  const removeFromOrder = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + 4500, 0);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { text: inputMessage, isUser: true }]);
      setInputMessage("");
      // Here you would typically call an API to get the chatbot's response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            text: "죄송합니다. 아직 답변을 생성하지 못했습니다.",
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "ko-KR";
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
      };
      recognition.start();
    } else {
      alert("죄송합니다. 음성 인식이 지원되지 않는 브라우저입니다.");
    }
  };

  return (
    <div
      className="h-screen bg-gray-100 flex flex-col"
      style={{ width: "820px", margin: "0 auto" }}
    >
      {/* Header */}
      <header className="bg-green-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">AI 카페 키오스크</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-white p-4 flex flex-col">
        {/* Categories */}
        <div className="flex mb-4 space-x-2 overflow-x-auto justify-center">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`flex items-center p-2 rounded ${
                selectedCategory === category.name
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <category.icon className="mr-2" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-3 gap-4 justify-items-center mb-4">
          {menuItems[selectedCategory].map((item) => (
            <button
              key={item}
              className="bg-gray-200 p-4 rounded-lg text-center w-full"
              onClick={() => addToOrder({ name: item, price: 4500 })}
            >
              <Coffee className="mx-auto mb-2" />
              <p>{item}</p>
            </button>
          ))}
        </div>
      </main>

      {/* Order Summary and Payment */}
      <div className="bg-gray-200 p-4 rounded-t-lg">
        <h2 className="text-xl font-semibold mb-4">주문 내역</h2>
        <ul className="mb-4">
          {orderItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>
                {item.name} ({item.temperature}, {item.sweetness})
              </span>
              <button
                onClick={() => removeFromOrder(index)}
                className="text-red-500"
              >
                <Minus size={16} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <span>총 금액:</span>
          <span className="font-bold">{totalAmount}원</span>
        </div>
        <button className="mt-4 bg-green-600 text-white p-2 rounded-lg w-full flex items-center justify-center">
          <CreditCard className="mr-2" />
          결제하기
        </button>
      </div>

      {/* Options Modal */}
      {showOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div ref={optionsRef} className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              {selectedItem.name} 옵션
            </h3>
            <div className="mb-4">
              <p className="font-semibold">온도:</p>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                  아이스
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  핫
                </button>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold">당도:</p>
              <div className="flex space-x-2">
                <button className="bg-gray-300 px-2 py-1 rounded">
                  덜 달게
                </button>
                <button className="bg-gray-300 px-2 py-1 rounded">보통</button>
                <button className="bg-gray-300 px-2 py-1 rounded">달게</button>
              </div>
            </div>
            <button
              className="bg-green-600 text-white p-2 rounded-lg w-full"
              onClick={() =>
                confirmOrder({ temperature: "아이스", sweetness: "보통" })
              }
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* Chatbot Button */}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full"
        onClick={() => setShowChat(!showChat)}
      >
        <MessageCircle />
      </button>

      {/* Chatbot Window */}
      {showChat && (
        <div
          ref={chatRef}
          className="fixed bottom-16 right-4 w-80 h-96 bg-white border rounded-lg shadow-lg p-4 flex flex-col"
        >
          <h3 className="text-lg font-semibold mb-2">AI 챗봇</h3>
          <div className="flex-grow overflow-y-auto bg-gray-100 p-2 rounded mb-2">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.isUser ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.isUser ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="메시지를 입력하세요..."
              className="flex-grow p-2 border rounded-l"
            />
            <button
              onClick={handleVoiceInput}
              className="bg-green-500 text-white p-2"
            >
              <Mic size={20} />
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r"
            >
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
