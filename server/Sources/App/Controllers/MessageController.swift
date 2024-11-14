import Vapor
import Fluent

struct MessageController: RouteCollection {
    
    // Метод для создания нового сообщения в чате
    func boot(routes: RoutesBuilder) throws {
        let messagesRoute = routes.grouped("messages")
        messagesRoute.post(use: create)
        messagesRoute.get(":chatID", use: getMessages)
    }
    
    // Обработчик для отправки сообщения
    func create(req: Request) throws -> EventLoopFuture<Message> {
        // Получаем данные из запроса
        let createMessageData = try req.content.decode(CreateMessageRequest.self)
        
        // Проверяем, существует ли чат с переданным chat_id
        return Chat.find(createMessageData.chatID, on: req.db).flatMap { chat in
            guard let chat = chat else {
                return req.eventLoop.makeFailedFuture(Abort(.notFound, reason: "Chat not found"))
            }
            
            // Создаем новое сообщение
            let message = Message(
                chatID: createMessageData.chatID,
                sender: createMessageData.sender,
                content: createMessageData.content
            )
            
            // Сохраняем сообщение и возвращаем результат
            return message.save(on: req.db).map {
                message
            }
        }
    }
    
    // Обработчик для получения всех сообщений из чата
    func getMessages(req: Request) throws -> EventLoopFuture<[Message]> {
        // Получаем chatID из URL-параметра
        guard let chatID = req.parameters.get("chatID", as: UUID.self) else {
            throw Abort(.badRequest, reason: "Missing or invalid chatID")
        }
        
        // Ищем все сообщения, принадлежащие данному чату
        return Message.query(on: req.db)
            .filter(\.$chat.$id == chatID)
            .all()
    }
}


//
//  MessageController.swift
//  server
//
//  Created by Дмитрий Головащук on 12.11.2024.
//

