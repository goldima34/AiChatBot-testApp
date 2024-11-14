import Vapor

struct CreateMessageRequest: Content {
    let chatID: UUID
    let sender: String
    let content: String
}

//
//  CreateMessageRequest.swift
//  server
//
//  Created by Дмитрий Головащук on 12.11.2024.
//

