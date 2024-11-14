import Vapor
import Fluent

struct ChatController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
        let chats = routes.grouped("chats")
        
        chats.post(use: createChat)
        chats.delete(":chatID", use: deleteChat)
        chats.get(use: getAllChats)
    }

    // 1. Метод для создания нового чата
    func createChat(req: Request) async throws -> Chat {
        let chatData = try req.content.decode(ChatData.self)
        let chat = Chat(userID: UUID(), title: chatData.title)

        try await chat.save(on: req.db)
        return chat
    }

    // 2. Метод для удаления чата
    func deleteChat(req: Request) async throws -> HTTPStatus {
        // Получаем chatID из параметров маршрута
        guard let chatID = req.parameters.get("chatID", as: UUID.self) else {
            throw Abort(.badRequest, reason: "Invalid chat ID.")
        }

        // Ищем чат по chatID
        guard let chat = try await Chat.find(chatID, on: req.db) else {
            throw Abort(.notFound, reason: "Chat not found.")
        }

        // Удаляем чат
        try await chat.delete(on: req.db)
        return .noContent
    }
    
    func getAllChats(req: Request) async throws -> [Chat] {
         return try await Chat.query(on: req.db).all()
     }
}



//
//  ChatController.swift
//  server
//
//  Created by Дмитрий Головащук on 12.11.2024.
//

