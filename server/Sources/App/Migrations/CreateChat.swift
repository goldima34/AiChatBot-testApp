import Fluent

struct CreateChat: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("chats")
            .id()
            .field("user_id", .uuid, .required)
            .field("title", .string, .required)
            .field("created_at", .datetime)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("chats").delete()
    }
}

//
//  CreateChat.swift
//  server
//
//  Created by Дмитрий Головащук on 12.11.2024.
//

