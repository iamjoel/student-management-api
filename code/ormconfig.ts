// TypeOrm 配置
module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '#Mysql123',
  database: 'student_management',
  entities: ['dist/**/**.entity{.ts,.js}'], // 是 dist 不是 src。https://stackoverflow.com/questions/59435293/typeorm-entity-in-nestjs-cannot-use-import-statement-outside-a-module
  synchronize: true, // 同步
  insecureAuth : true,
  logging: ["error"] // 报错时 log sql
  // logging: ["query", "error"] //query: log 所有的 sql
  // 数据库表结构变化后的迁移：https://www.bookstack.cn/read/TypeORM-0.2.20-zh/migrations.md
}