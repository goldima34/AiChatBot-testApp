import Vapor
import Fluent

final class Message: Model, Content {
    static let schema = "messages"
    
    @ID(key: .id)
    var id: UUID?

    @Parent(key: "chat_id")
    var chat: Chat

    @Field(key: "sender")
    var sender: String

    @Field(key: "content")
    var content: String

    @Timestamp(key: "created_at", on: .create)
    var createdAt: Date?

    init() {}

    init(id: UUID? = nil, chatID: UUID, sender: String, content: String) {
        self.id = id
        self.$chat.id = chatID
        self.sender = sender
        self.content = content
    }
}
