"use client"

import { useState, useEffect, useRef } from "react"
import { FiSend, FiX, FiMessageCircle, FiPhone, FiUser } from "react-icons/fi"

const randomBot =[
  {name:"Alok Singh",image:"https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVufGVufDB8fDB8fHww"},
  {name:"Ravi Kumar",image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fHww"},
  {name:"jaysingh",image:"https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {name:"Priya Sharma",image:"https://images.unsplash.com/photo-1586351012965-861624544334?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"}
]

export default function ChatBot() {
  const [open, setOpen] = useState(true)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [currentBot, setCurrentBot] = useState(() => randomBot[Math.floor(Math.random() * randomBot.length)])
  const [collectedData, setCollectedData] = useState({
    name: "",
    phone: "",
    service: "",
    location: "",
    message: "",
  })
  const [conversationStep, setConversationStep] = useState("greeting")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize with greeting
  useEffect(() => {
    if (open && messages.length === 0) {
      addBotMessage(
        `Hey! 👋 I'm ${currentBot.name}, Software Developer at Droute. How can I help you with your delivery needs today?`,
      )
      setConversationStep("service")
    }
  }, [open])

  const addBotMessage = (text) => {
    const message = {
      id: Date.now().toString(),
      sender: "bot",
      text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])
  }

  const addUserMessage = (text) => {
    const message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])
  }

  const simulateBotTyping = async (text, delay = 1000) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, delay))
    addBotMessage(text)
    setIsLoading(false)
  }

  const serviceOptions = [
    "📦 Same-Day Delivery",
    "🚚 Next-Day Delivery",
    "🌍 Long Distance Shipping",
    "📋 Get Delivery Quote",
    "📱 Track My Package",
    "📞 Schedule Pickup",
  ]
  const locationOptions = [
    "🏙️ Within City",
    "🌆 Nearby Cities", 
    "🗺️ Interstate",
    "✈️ International"
  ]
  const handleServiceSelect = async (service) => {
    addUserMessage(service)
    setCollectedData({ ...collectedData, service })
    await simulateBotTyping(`Great choice! 💫 What's your name so I can assist you better?`, 800)
    setConversationStep("name")
  }

  const handleLocationSelect = async (location) => {
    addUserMessage(location)
    setCollectedData({ ...collectedData, location })
    await simulateBotTyping(`Perfect! 📍 Any specific delivery instructions or requirements?`, 800)
    setConversationStep("message")
  }

  const handleNameSubmit = async () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    setCollectedData({ ...collectedData, name: inputValue })
    setInputValue("")

    await simulateBotTyping(
      `Nice to meet you, ${inputValue}! 🤝 Now, what's your contact number? (10-digit mobile number)`,
      800,
    )
    setConversationStep("phone")
  }

  const handlePhoneSubmit = async () => {
    if (!inputValue.trim()) return

    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(inputValue)) {
      addBotMessage("❌ Please enter a valid 10-digit mobile number starting with 6-9")
      return
    }

    addUserMessage(inputValue)
    setCollectedData({ ...collectedData, phone: inputValue })
    setInputValue("")

    await simulateBotTyping(
      `Great! 📱 What's your delivery location preference?`,
      800,
    )
    setConversationStep("location")
  }

  const handleMessageSubmit = async () => {
    const userMessage = inputValue.trim() || "No specific message"
    addUserMessage(userMessage)
    setCollectedData({ ...collectedData, message: userMessage })
    setInputValue("")

    const finalMessage = `Hi, I'm ${collectedData.name}. I need ${collectedData.service} for ${collectedData.location}. Additional details: ${userMessage}`

    await simulateBotTyping(
      `Perfect! ✨ I've received your delivery request. Our team will contact you shortly with pricing and pickup details. Thank you for choosing Droute! 🚚`,
      1000,
    )
  


    // Log the API payload
    console.log("API Payload 👉", {
      name: collectedData.name,
      mob: collectedData.phone,
      message: finalMessage,
    });

    setConversationStep("confirmation")
  }

  const handleSendMessage = () => {
    if (conversationStep === "name") {
      handleNameSubmit()
    } else if (conversationStep === "phone") {
      handlePhoneSubmit()
    } else if (conversationStep === "message") {
      handleMessageSubmit()
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full">
          {/* Chat Window */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            <div
              className="p-4 text-white flex items-center gap-3 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)" }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                <div className="h-3 w-3 rounded-full bg-green-400 absolute top-4 left-12"></div>
                <img 
                  src={currentBot.image}
                  alt={currentBot.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">{currentBot.name}</h3>
                <p className="text-xs opacity-90">Droute Delivery</p>
              </div>
              <button className="p-1 hover:bg-white/20 rounded-full transition" onClick={() => setOpen(false)}>
                <FiX size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.sender === "bot" ? (
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img 
                          src={currentBot.image}
                          alt="Bot" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="max-w-xs">
                        <div className="bg-white p-3 shadow-sm" style={{borderRadius: "0px 12px 12px 12px"}}>
                          <p className="text-sm text-gray-700 leading-relaxed">{msg.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-2">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <div className="max-w-xs">
                        <div
                          className="p-3 text-white"
                          style={{
                            background: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
                            borderRadius: "12px 12px 0px 12px"
                          }}
                        >
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 mr-2 text-right">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img 
                      src={currentBot.image}
                      alt="Bot" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="bg-white p-3 shadow-sm" style={{borderRadius: "0px 12px 12px 12px"}}>
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ animation: "pulse 1.4s infinite", background: "#ea580c" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          animation: "pulse 1.4s infinite 0.2s",
                          background: "#ea580c",
                        }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          animation: "pulse 1.4s infinite 0.4s",
                          background: "#ea580c",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Service Selection */}
            {conversationStep === "service" && (
              <div className="flex gap-2 justify-end p-4 bg-gray-50">
                <div className="max-w-xs">
                  <div
                    className="p-3 text-white"
                    style={{
                      background: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
                      borderRadius: "12px 12px 0px 12px"
                    }}
                  >
                    <p className="text-sm mb-3">What delivery service do you need?</p>
                    <div className="space-y-2">
                      {serviceOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleServiceSelect(option)}
                          className="w-full text-left p-2 rounded border-2 border-white text-white transition hover:bg-white hover:text-gray-800"
                        >
                          <p className="text-xs font-medium">{option}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location Selection */}
            {conversationStep === "location" && (
              <div className="flex gap-2 justify-end p-4 bg-gray-50">
                <div className="max-w-xs">
                  <div
                    className="p-3 text-white"
                    style={{
                      background: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
                      borderRadius: "12px 12px 0px 12px"
                    }}
                  >
                    <p className="text-sm mb-3">Where do you need delivery?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {locationOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleLocationSelect(option)}
                          className="p-2 rounded border-2 border-white text-white transition hover:bg-white hover:text-gray-800"
                        >
                          <p className="text-xs font-medium">{option}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Input Area */}
            {(conversationStep === "name" || conversationStep === "phone" || conversationStep === "message") && (
              <div className="p-4 border-t bg-white flex-shrink-0 space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 border-2 rounded-lg px-3 border-gray-300">
                    {conversationStep === "name" ? (
                      <FiUser size={16} className="text-gray-500" />
                    ) : conversationStep === "phone" ? (
                      <FiPhone size={16} className="text-gray-500" />
                    ) : (
                      <FiMessageCircle size={16} className="text-gray-500" />
                    )}
                    <input
                      type={conversationStep === "phone" ? "tel" : "text"}
                      className="w-full py-3 outline-none text-sm"
                      placeholder={
                        conversationStep === "name" 
                          ? "Enter your name..." 
                          : conversationStep === "phone" 
                          ? "Enter mobile number..." 
                          : "Enter delivery instructions..."
                      }
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleSendMessage()
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={conversationStep !== "message" && !inputValue.trim()}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
                    }}
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation State */}
            {conversationStep === "confirmation" && (
              <div className="p-4 border-t bg-white flex-shrink-0 text-center space-y-2">
                <p className="text-sm font-medium text-gray-700">✅ Your delivery request has been submitted</p>
                <p className="text-xs text-gray-500">Our delivery team will contact you soon</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xl transition hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
          }}
        >
          <FiMessageCircle size={24} />
        </button>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
