# 書籍管理システム (Book Manager)

Node.js + Express + Prisma で構築された書籍管理 RESTful API サーバー

## 技術スタック

- **Node.js** / **TypeScript**
- **Express** - Web フレームワーク
- **Prisma** - ORM とデータベース管理
- **PostgreSQL** - データベース
- **Passport.js** - 認証ライブラリ
- **argon2** - パスワードハッシュ化
- **Redis** - セッション管理 (オプション)

## クイックスタート

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

ルートディレクトリに`.env`ファイルを作成:

```env
# 必須
DATABASE_URL="postgresql://book_manager:book_manager@localhost:5432/book_manager"
SHADOW_DATABASE_URL="postgresql://book_manager:book_manager@localhost:5432/_book_manager"
SESSION_SECRET="ランダムな文字列"

# オプション (デフォルト値が使用されます)
PORT=3000
REDIS_URL="redis://localhost:6379"
SHOW_REQUEST_LOG=true
SHOW_DB_ERRORS=true
DB_SESSION_INTERVAL=0
APP_USER_PASS_MIN_LENGTH=8
APP_DUE_DAYS=7
```

### 3. アプリケーションの起動

```bash
# Docker + アプリケーションを起動
pnpm run dev

# アプリケーションのみ起動
pnpm run dev:app
```

## プロジェクト構造

```
src/
├── routes/          # APIルート定義
│   ├── user/       # ユーザー認証・管理
│   ├── book/       # 書籍閲覧・貸出・返却
│   ├── admin/      # 管理者機能
│   ├── search/     # 検索機能
│   └── development/ # 開発用エンドポイント
├── lib/            # ライブラリとユーティリティ
│   ├── db/         # データベースアクセス層
│   ├── app/        # アプリケーションロジック
│   └── development/ # 開発用ツール
├── types/          # TypeScript型定義
├── generated/      # Prisma生成ファイル
└── server/         # サーバー設定
```

## API エンドポイント

### ユーザー認証

- `POST /user/register` - ユーザー登録
- `POST /user/login` - ログイン
- `GET /user/history` - 貸出履歴
- `PUT /user/change` - ユーザー情報変更

### 書籍管理

- `GET /book/list/:page` - 書籍一覧
- `GET /book/detail/:isbn` - 書籍詳細
- `POST /book/rental` - 書籍貸出
- `PUT /book/return` - 書籍返却

### 管理者機能

- `POST/PUT/DELETE /admin/author` - 著者管理
- `POST/PUT/DELETE /admin/publisher` - 出版社管理
- `POST/PUT/DELETE /admin/book` - 書籍管理

### 検索

- `GET /search/author` - 著者検索
- `GET /search/publisher` - 出版社検索

## 開発

```bash
# TypeScript型チェック
npx tsc --noEmit

# Dockerコンテナ起動
pnpm run docker

# Dockerコンテナ停止
pnpm run docker:down
```
# Book_Manager_Kimatu
