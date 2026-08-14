# Esperanto X-Konvertilo (エスペラント語 X方式 リアルタイム変換器)

X方式（x-sistemo）で入力されたエスペラント文を、リアルタイムに特殊文字（ĉ, ĝ, ĥ, ĵ, ŝ, ŭ）へ変換するWebアプリケーションです。

PWA（Progressive Web Apps）に対応しており、PCやスマートフォンのホーム画面・デスクトップにアプリとしてインストールして、オフライン環境でも完全ローカルで高速に動作します。

---

## 🌟 主な特徴
- **完全ローカル処理**: リアルタイム変換がクライアントサイドで即時実行されます（サーバー通信なし）。
- **PWA（アプリ化）完全対応**: Chrome, Edge, Safari (iOS/macOS), Android など主要環境でインストール可能。
- **オフライン動作**: Service Worker により、インターネット接続がない環境でも起動・変換できます。
- **X方式の完全サポート**: `cx`, `gx`, `hx`, `jx`, `sx`, `ux` および大文字（`Cx`, `CX` など）に対応。
- **ワンクリック操作**: コピーボタン、クリアボタンを完備。
- **ダーク / ライトテーマ**: OS設定の自動反映および手動切り替えに対応。
- **GitHub Pages 対応**: 静的ファイル構成のため、リポジトリにプッシュしてGitHub Pagesを有効化するだけで即座に公開可能。

---

## 📱 PWA インストール方法（各ブラウザ）

### 🖥️ デスクトップ
- **Google Chrome / Microsoft Edge**:
  - アプリ画面右上の「**インストール**」ボタンをクリック、またはアドレスバー右側に表示されるインストールアイコン（パソコン＋下矢印アイコン）をクリックしてインストールします。
- **macOS (Safari)**:
  - 共有メニューから「Dockに追加」を選択します。

### 📱 スマートフォン / タブレット
- **Android (Chrome / Edge / Firefox)**:
  - 画面上部の「**インストール**」ボタン、またはブラウザメニュー（⋮）から「**アプリをインストール**」または「**ホーム画面に追加**」を選択します。
- **iOS / iPadOS (Safari)**:
  - 画面下の「**共有**」アイコン（四角と上矢印）をタップし、「**ホーム画面に追加**」を選択します。

---

## 変換対応一覧
| 入力 (X方式) | 変換後 (エスペラント文字) |
|:---:|:---:|
| `cx` / `cX` | `ĉ` |
| `Cx` / `CX` | `Ĉ` |
| `gx` / `gX` | `ĝ` |
| `Gx` / `GX` | `Ĝ` |
| `hx` / `hX` | `ĥ` |
| `Hx` / `HX` | `Ĥ` |
| `jx` / `jX` | `ĵ` |
| `Jx` / `JX` | `Ĵ` |
| `sx` / `sX` | `ŝ` |
| `Sx` / `SX` | `Ŝ` |
| `ux` / `uX` | `ŭ` |
| `Ux` / `UX` | `Ŭ` |

---

## 🚀 GitHub Pages への公開手順

1. **GitHub にリポジトリを作成**
   本フォルダ（`EsperantoXConverter`）の内容をGitHubリポジトリにプッシュします。

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Esperanto X-Converter with PWA"
   git branch -M main
   git remote add origin https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
   git push -u origin main
   ```

2. **GitHub Pages を有効化**
   1. GitHubのリポジトリページを開き、「**Settings**」タブをクリックします。
   2. 左メニューの「**Pages**」をクリックします。
   3. **Build and deployment** の **Source** で「**Deploy from a branch**」を選択します。
   4. **Branch** を `main` / `root` に設定して「**Save**」をクリックします。
   5. 数分後に公開URL（`https://<ユーザー名>.github.io/<リポジトリ名>/`）が発行されます。

---

## 📁 ファイル構成
```
EsperantoXConverter/
├── index.html          # メイン画面のHTML構造
├── style.css           # スタイル定義（デザイン・テーマ・レスポンシブ）
├── converter.js        # 変換ロジック & Service Worker / インストール制御
├── sw.js               # Service Worker（オフラインキャッシュ管理）
├── manifest.json       # Web App Manifest（PWA定義ファイル）
├── icons/              # アプリアイコン画像
│   ├── icon.svg        # ベクターアプリアイコン
│   ├── icon-192.png    # 192x192 PNGアイコン
│   └── icon-512.png    # 512x512 PNGアイコン
└── README.md           # ドキュメント
```
