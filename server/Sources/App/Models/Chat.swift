import Vapor
import Fluent

final class Chat: Model, Content {
    static let schema = "chats"
    
    @ID(key: .id)
    var id: UUID?
    
    @Field(key: "title")
    var title: String

    @Field(key: "user_id")
    var userID: UUID

    @Children(for: \.$chat)
    var messages: [Message]

    @Timestamp(key: "created_at", on: .create)
    var createdAt: Date?

    init() {}

    init(id: UUID? = nil, userID: UUID, title: String) {
        self.id = id
        self.userID = userID
        self.title = title
    }
}
