<div align="center">

# 📚 書籍管理システム (Book Manager)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-lightgrey?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-blue?logo=postgresql)](https://www.postgresql.org/)

*モダンな技術スタックで構築された、エンタープライズグレードの書籍管理 RESTful API*

[特徴](#-特徴) • [クイックスタート](#-クイックスタート) • [API仕様](#-api-エンドポイント) • [開発](#-開発)

</div>

---

## ✨ 特徴

- 🔐 **セキュアな認証**: Passport.js + argon2 による強固なユーザー認証
- 📖 **完全な書籍管理**: CRUD操作、貸出・返却管理、在庫追跡
- 🔍 **高度な検索**: 著者・出版社による柔軟な検索機能
- 🎯 **型安全性**: TypeScript による完全な型チェック
- 🚀 **高パフォーマンス**: Redis によるセッション管理
- 🐳 **簡単デプロイ**: Docker Compose による一発構築
- 📊 **データベース管理**: Prisma ORM による効率的なデータ操作

## 🛠️ 技術スタック

<table>
<tr>
<td>

**Backend**
- Node.js 24
- TypeScript 5.9
- Express 5.1

</td>
<td>

**Database**
- PostgreSQL
- Prisma ORM 6.19
- Redis (Session)

</td>
<td>

**Security**
- Passport.js
- argon2
- express-session

</td>
</tr>
</table>

## 🚀 クイックスタート

### 前提条件

- Node.js 24.x 以上
- pnpm 10.x 以上
- Docker & Docker Compose

### インストール手順

#### 1️⃣ リポジトリのクローン

```bash
git clone https://github.com/itc-s24003/book-manager.git
cd book-manager
```

#### 2️⃣ 依存関係のインストール

```bash
pnpm install
```

#### 3️⃣ 環境変数の設定

ルートディレクトリに `.env` ファイルを作成し、以下の内容を設定:

```env
# データベース接続
DATABASE_URL="postgresql://book_manager:book_manager@localhost:5432/book_manager"
SHADOW_DATABASE_URL="postgresql://book_manager:book_manager@localhost:5432/_book_manager"

# セッション設定
SESSION_SECRET="your-super-secret-random-string-here"

# Redis設定（オプション）
REDIS_URL="redis://localhost:6379"

```

#### 4️⃣ アプリケーションの起動

```bash
# Docker + アプリケーションを同時起動（推奨）
pnpm run dev
```

**個別起動の場合:**

```bash
# Dockerコンテナのみ起動
pnpm run docker

# アプリケーションのみ起動
pnpm run dev:app
```

#### 5️⃣ 動作確認

サーバーが起動したら、ブラウザまたは curl でアクセス:

```bash
curl http://localhost:3000/
```

🎉 これで準備完了です！

## 📁 プロジェクト構造

```
Book_Manager_Kimatu-main/
│
├── 📂 src/                      # ソースコード
│   ├── 📂 routes/              # APIルート定義
│   │   ├── 👤 user/           # ユーザー認証・管理
│   │   ├── 📚 book/           # 書籍閲覧・貸出・返却
│   │   ├── 🔧 admin/          # 管理者機能
│   │   └── 🔍 search/         # 検索機能
│   │
│   ├── 📂 lib/                 # ライブラリとユーティリティ
│   │   ├── 💾 db/             # データベースアクセス層
│   │   ├── 🎯 app/            # アプリケーションロジック
│   │   ├── 🔐 auth.ts         # 認証ロジック
│   │   └── ✅ validation.ts   # バリデーション
│   │
│   ├── 📂 generated/           # Prisma自動生成ファイル
│   ├── 📂 server/              # サーバー設定
│   ├── 📄 app.ts               # アプリケーションエントリーポイント
│   └── 📄 evn.config.ts        # 環境変数設定
│
├── 📂 prisma/                   # Prismaスキーマとマイグレーション
│   ├── 📄 schema.prisma        # データベーススキーマ定義
│   └── 📂 migrations/          # マイグレーション履歴
│
├── 📂 docker/                   # Docker設定
│   ├── 📄 compose.yaml         # Docker Compose設定
│   └── 📂 init/                # 初期化スクリプト
│
├── 📄 package.json             # パッケージ定義
├── 📄 tsconfig.json            # TypeScript設定
└── 📄 README.md                # このファイル
```

## 📡 API エンドポイント

### 👤 ユーザー認証

| メソッド | エンドポイント | 説明 | 認証 |
|---------|---------------|------|-----|
| `POST` | `/user/register` | 新規ユーザー登録 | 不要 |
| `POST` | `/user/login` | ログイン | 不要 |
| `POST` | `/user/logout` | ログアウト | 必須 |
| `GET` | `/user/history` | 貸出履歴取得 | 必須 |
| `PUT` | `/user/change` | ユーザー情報変更 | 必須 |

**リクエスト例:**

```bash
# ユーザー登録
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'

# ログイン
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "SecurePass123!"
  }'
```

---

### 📚 書籍管理

| メソッド | エンドポイント | 説明 | 認証 |
|---------|---------------|------|-----|
| `GET` | `/book/list/:page` | 書籍一覧（ページネーション） | 不要 |
| `GET` | `/book/detail/:isbn` | 書籍詳細情報 | 不要 |
| `POST` | `/book/rental` | 書籍貸出 | 必須 |
| `PUT` | `/book/return` | 書籍返却 | 必須 |

**リクエスト例:**

```bash
# 書籍一覧取得（1ページ目）
curl http://localhost:3000/book/list/1

# 書籍詳細取得
curl http://localhost:3000/book/detail/9784123456789

# 書籍貸出
curl -X POST http://localhost:3000/book/rental \
  -H "Content-Type: application/json" \
  -H "Cookie: mb_sid=your-session-id" \
  -d '{
    "isbn": "9784123456789"
  }'
```

---

### 🔧 管理者機能

| メソッド | エンドポイント | 説明 | 認証 |
|---------|---------------|------|-----|
| `POST` | `/admin/author` | 著者追加 | 管理者 |
| `PUT` | `/admin/author` | 著者情報更新 | 管理者 |
| `DELETE` | `/admin/author` | 著者削除 | 管理者 |
| `POST` | `/admin/publisher` | 出版社追加 | 管理者 |
| `PUT` | `/admin/publisher` | 出版社情報更新 | 管理者 |
| `DELETE` | `/admin/publisher` | 出版社削除 | 管理者 |
| `POST` | `/admin/book` | 書籍追加 | 管理者 |
| `PUT` | `/admin/book` | 書籍情報更新 | 管理者 |
| `DELETE` | `/admin/book` | 書籍削除 | 管理者 |

---

### 🔍 検索機能

| メソッド | エンドポイント | 説明 | 認証 |
|---------|---------------|------|-----|
| `GET` | `/search/author?name=:name` | 著者名で検索 | 不要 |
| `GET` | `/search/publisher?name=:name` | 出版社名で検索 | 不要 |

**リクエスト例:**

```bash
# 著者検索
curl "http://localhost:3000/search/author?name=夏目漱石"

# 出版社検索
curl "http://localhost:3000/search/publisher?name=岩波書店"
```

## 🔧 開発

### 利用可能なコマンド

```bash
# 開発環境の起動（Docker + アプリ）
pnpm run dev

# アプリケーションのみ起動
pnpm run dev:app

# Dockerコンテナ起動
pnpm run docker

# Dockerコンテナ停止
pnpm run docker:down

# TypeScript型チェック
npx tsc --noEmit

# Prismaスキーマの適用
npx prisma migrate dev

# Prisma Studioの起動（GUIデータベース管理）
npx prisma studio
```

### 📊 データベーススキーマ

主要なデータモデル:

```prisma
model User {
  id           Int          @id @default(autoincrement())
  username     String       @unique
  email        String       @unique
  password     String
  rentalLogs   RentalLog[]
}

model Book {
  isbn         String       @id
  title        String
  authorId     Int
  publisherId  Int
  stock        Int          @default(0)
  author       Author       @relation(fields: [authorId], references: [id])
  publisher    Publisher    @relation(fields: [publisherId], references: [id])
  rentalLogs   RentalLog[]
}

model RentalLog {
  id           Int          @id @default(autoincrement())
  userId       Int
  isbn         String
  rentalDate   DateTime     @default(now())
  returnDate   DateTime?
  user         User         @relation(fields: [userId], references: [id])
  book         Book         @relation(fields: [isbn], references: [isbn])
}
```

### 🐛 トラブルシューティング

<details>
<summary>ポートが既に使用されている場合</summary>

```bash
# ポート3000を使用しているプロセスを確認
lsof -i :3000

# プロセスを終了
kill -9 <PID>
```
</details>

<details>
<summary>Dockerコンテナがエラーで起動しない場合</summary>

```bash
# コンテナとボリュームを完全削除して再構築
pnpm run docker:down
docker volume prune -f
pnpm run docker
```
</details>

<details>
<summary>Prismaマイグレーションエラー</summary>

```bash
# マイグレーションをリセット
npx prisma migrate reset

# 新しいマイグレーションを作成
npx prisma migrate dev --name init
```
</details>

---

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 👥 コントリビューター

- [@itc-s24003](https://github.com/itc-s24003) - 開発者

## 🤝 コントリビューション

プルリクエストは大歓迎です！大きな変更の場合は、まず issue を開いて変更内容を議論してください。

---

<div align="center">

**⭐ このプロジェクトが役に立った場合は、スターをお願いします！**

Made with ❤️ by Book Manager Team

</div>
