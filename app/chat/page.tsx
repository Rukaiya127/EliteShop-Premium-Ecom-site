"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, MessageCircle } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const botResponses = [
  "Hello! How can I help you today?",
  "I'm here to assist you with any questions about our products.",
  "Would you like me to help you find something specific?",
  "Our customer service team is available 24/7 to help you.",
  "Is there anything else I can help you with?",
  "Thank you for contacting us! We appreciate your business.",
  "I can help you with product information, orders, and general inquiries.",
  "Feel free to ask me about our latest deals and promotions!",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to EliteShop customer support! How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot response delay
    setTimeout(
      () => {
        const botMessage: Message = {
          id: messages.length + 2,
          text: botResponses[Math.floor(Math.random() * botResponses.length)],
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <MessageCircle className="w-10 h-10 mr-4 text-blue-600" />
            Customer Support Chat
          </h1>
          <p className="text-xl text-gray-600">Get instant help from our AI assistant</p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              EliteShop Support Bot
              <span className="ml-auto text-sm opacity-75">Online</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && <Bot className="w-4 h-4 mt-1 text-blue-600" />}
                      {message.sender === "user" && <User className="w-4 h-4 mt-1 text-white" />}
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 max-w-xs">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-4">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 rounded-full px-6 py-3 border-2 border-gray-200 focus:border-blue-500"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className="rounded-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send • Our AI assistant is here to help 24/7
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="p-4 h-auto text-left justify-start bg-transparent"
              onClick={() => setInputMessage("I need help with my order")}
            >
              <div>
                <h4 className="font-medium">Order Help</h4>
                <p className="text-sm text-gray-600">Track or modify your order</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="p-4 h-auto text-left justify-start bg-transparent"
              onClick={() => setInputMessage("Tell me about your return policy")}
            >
              <div>
                <h4 className="font-medium">Returns</h4>
                <p className="text-sm text-gray-600">Learn about our return policy</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="p-4 h-auto text-left justify-start bg-transparent"
              onClick={() => setInputMessage("What are your current promotions?")}
            >
              <div>
                <h4 className="font-medium">Promotions</h4>
                <p className="text-sm text-gray-600">Current deals and offers</p>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
