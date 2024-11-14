import NIOSSL
import Fluent
import FluentPostgresDriver
import Vapor

public func configure(_ app: Application) async throws {
    let corsConfiguration = CORSMiddleware.Configuration(
        allowedOrigin: .custom("http://localhost:3000"),
        allowedMethods: [.GET, .POST, .PUT, .DELETE, .OPTIONS, .PATCH],
        allowedHeaders: [.accept, .authorization, .contentType, .origin, .xRequestedWith, .userAgent]
    )
    let corsMiddleware = CORSMiddleware(configuration: corsConfiguration)
    app.middleware.use(corsMiddleware)
    
    app.databases.use(DatabaseConfigurationFactory.postgres(configuration: .init(
        hostname: Environment.get("DATABASE_HOST") ?? "localhost",
        port: Environment.get("DATABASE_PORT").flatMap(Int.init(_:)) ?? SQLPostgresConfiguration.ianaPortNumber,
        username: Environment.get("DATABASE_USERNAME") ?? "testchat_username",
        password: Environment.get("DATABASE_PASSWORD") ?? "testchat_password",
        database: Environment.get("DATABASE_NAME") ?? "testchat_database",
        tls: .prefer(try .init(configuration: .clientDefault)))
    ), as: .psql)

    app.migrations.add(CreateChat())
    app.migrations.add(CreateMessage())
    
    try await app.autoMigrate()
    
    try routes(app)
}
