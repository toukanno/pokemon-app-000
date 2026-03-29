const { useMemo, useState } = React;

const tools = [
  {
    id: "battle",
    title: "対戦ダメージ計算ツール",
    category: "対戦準備",
    usage: "勝率アップ",
    description:
      "技威力・タイプ相性・努力値・持ち物を考慮し、与ダメージ・被ダメージの見積もりを最短で確認。",
  },
  {
    id: "training",
    title: "個体値・努力値管理ツール",
    category: "育成効率化",
    usage: "育成時短",
    description:
      "育成中の個体を一覧化して、必要な努力値振りや性格候補を管理。育成ルートを迷わず進められます。",
  },
  {
    id: "dex",
    title: "ポケモン図鑑検索ツール",
    category: "情報収集",
    usage: "構築支援",
    description:
      "タイプ・特性・覚える技から逆引き検索して、パーティ構築に必要な候補を素早く比較できます。",
  },
  {
    id: "shiny",
    title: "色違い厳選カウンター",
    category: "やりこみ",
    usage: "進捗記録",
    description:
      "試行回数と遭遇結果を記録し、確率の推移を可視化。長期厳選のモチベーション維持に便利です。",
  },
];

const recommendations = [
  "対戦に勝ちたい: ダメージ計算 + 図鑑検索の併用",
  "育成を時短したい: 個体値・努力値管理ツール中心",
  "コレクションを楽しみたい: 色違い厳選カウンター活用",
];

function App() {
  const categories = ["すべて", ...new Set(tools.map((tool) => tool.category))];
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const categoryMatch =
        selectedCategory === "すべて" || tool.category === selectedCategory;
      const searchMatch =
        normalizedSearch.length === 0 ||
        `${tool.title}${tool.description}${tool.usage}`
          .toLowerCase()
          .includes(normalizedSearch);
      return categoryMatch && searchMatch;
    });
  }, [search, selectedCategory]);

  return (
    <>
      <div className="bg-glow bg-glow--one" aria-hidden="true"></div>
      <div className="bg-glow bg-glow--two" aria-hidden="true"></div>

      <header className="hero">
        <nav className="nav">
          <p className="logo">Pokemon Utility Hub</p>
          <a className="nav__link" href="#tool-grid">
            ツール一覧へ
          </a>
        </nav>

        <div className="hero__content">
          <p className="hero__badge">React Powered Directory</p>
          <h1>ポケモン ツール紹介まとめサイト</h1>
          <p className="hero__lead">
            Reactで検索とカテゴリ絞り込みに対応。対戦・育成・図鑑管理・色違い厳選など、目的に合うツールをすぐ見つけられます。
          </p>

          <div className="hero__actions">
            <a className="button button--primary" href="#tool-grid">
              ツールを見る
            </a>
            <a className="button button--ghost" href="#pick">
              目的別おすすめ
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section section--glass" id="about">
          <h2>このサイトについて</h2>
          <p>
            初心者でも使いやすいように、用途・主な機能・おすすめポイントをカードで整理。検索とカテゴリ絞り込みで、欲しい情報へ迷わず到達できます。
          </p>
        </section>

        <section className="section" id="tool-grid">
          <div className="section__header">
            <h2>カテゴリ別ツール紹介</h2>
            <p>{filteredTools.length}件表示中</p>
          </div>

          <div className="toolbar">
            <label className="search-field" htmlFor="tool-search">
              <span>検索</span>
              <input
                id="tool-search"
                type="search"
                placeholder="例: ダメージ / 厳選 / 図鑑"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <div className="chips" role="tablist" aria-label="カテゴリ選択">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`chip ${
                    selectedCategory === category ? "chip--active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <article className="card" key={tool.id}>
                  <div className="card__meta">
                    <p className="tag">{tool.category}</p>
                    <p className="usage">{tool.usage}</p>
                  </div>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </article>
              ))
            ) : (
              <p className="empty">該当するツールが見つかりませんでした。検索条件を変更してください。</p>
            )}
          </div>
        </section>

        <section className="section section--highlight" id="pick">
          <h2>目的別おすすめ</h2>
          <ul className="recommend-list">
            {recommendations.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">
        <small>© 2026 ポケモン ツール紹介まとめ</small>
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
