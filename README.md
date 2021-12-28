# shop-manage

食材管理と買い物効率化を実現するアプリ。
 
# Features
 
- 食材をカテゴリーごとに管理。
- 登録した食材から買い物リストを作成。
- 買い物リストから購入すると食材の数量が更新
 
# Installation

## expoクライアントを利用（Androidのみ）
expoアプリをplayストアからインストール後、下記のURLからQRコードを読み取る

https://expo.dev/@shusuke/shop-manage

## コードから確認
1. node.js/yarnをインストール
2. プロジェクトフォルダでyarn installを実行
3. yarn startを実行
4. expoアプリをインストールし、QRコードを読み取る
 
# Usage

- 食材管理
  - カテゴリーごとに確認することが可能。
  - 食材の登録／更新／削除が可能。
- 買い物リスト
  - 食材管理で登録されている食材から選択することでリストに追加できます。
  - 買い物リストでは数量を変更することができます（デフォルト１）
  - 買い物リストでタップすると、チェックが入り購入することが可能です。
    - 購入すると食材管理に数量が加算されます。

# 使用技術
- typescript 4.3.5
- react-native 0.64.3
  - react-navigation 6系
- react 17.0.1
  - react-hook-form 7.19.5
  - yup 0.32.11
- firebase 9.1.3

# こだわりポイント
- 各種ライブラリは最新バージョンを導入
- Functionコンポーネントなど現在主流のコーディングスタイル
- 再利用性／保守性を意識（コンポーネントの切りだしや重複コードの排除、eslint/prettierの適用など）

