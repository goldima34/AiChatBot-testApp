import Fluent

struct CreateMessage: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("messages")
            .id()
            .field("chat_id", .uuid, .required, .references("chats", "id", onDelete: .cascade))
            .field("sender", .string, .required)
            .field("content", .string, .required)
            .field("created_at", .datetime)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("messages").delete()
    }
}
//
//  CreateMessage.swift
//  server
//
//  Created by Дмитрий Головащук on 12.11.2024.
//

