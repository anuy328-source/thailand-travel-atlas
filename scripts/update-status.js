const fs = require("fs");

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATA_SOURCE_ID = process.env.NOTION_DATABASE_ID || "";

if (!NOTION_TOKEN || !DATA_SOURCE_ID) {
  throw new Error("NOTION_TOKEN or NOTION_DATABASE_ID is missing.");
}

// =============================
// 県名 → amCharts県コード変換
// =============================

const provinceMap = new Map();

function normalizeKey(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/県$/g, "")
    .replace(/[・･.\-_'’\s]/g, "")
    .replace(/[^\p{Letter}\p{Number}\u3040-\u30ff\u4e00-\u9fff]/gu, "");
}

function add(id, ...names) {
  for (const name of names) {
    provinceMap.set(normalizeKey(name), id);
  }
}

// バンコク・首都圏
add("TH-10", "バンコク", "Bangkok", "Bangkok Metropolis", "Krung Thep Maha Nakhon");
add("TH-11", "サムットプラカーン", "Samut Prakan");
add("TH-12", "ノンタブリー", "Nonthaburi");
add("TH-13", "パトゥムターニー", "パトゥムタニー", "Pathum Thani");
add("TH-14", "アユタヤ", "プラナコーンシーアユタヤ", "Phra Nakhon Si Ayutthaya", "Ayutthaya");
add("TH-15", "アーントーン", "Ang Thong");
add("TH-16", "ロッブリー", "Lop Buri", "Lopburi");
add("TH-17", "シンブリー", "Sing Buri", "Singburi");
add("TH-18", "チャイナート", "Chai Nat", "Chainat");
add("TH-19", "サラブリー", "Saraburi");

// 東部
add("TH-20", "チョンブリー", "Chon Buri", "Chonburi");
add("TH-21", "ラヨーン", "Rayong");
add("TH-22", "チャンタブリー", "チャンダブリー", "Chanthaburi");
add("TH-23", "トラート", "Trat");
add("TH-24", "チャチューンサオ", "Chachoengsao");
add("TH-25", "プラーチーンブリー", "Prachin Buri", "Prachinburi");
add("TH-26", "ナコーンナーヨック", "Nakhon Nayok");
add("TH-27", "サケーオ", "Sa Kaeo", "Sakaeo");

// 南イサーン・中イサーン
add("TH-30", "ナコーンラーチャシーマー", "ナコンラチャシマ", "ナコンラチャシマー", "ナコンラーチャシマー", "コラート", "Nakhon Ratchasima", "Korat");
add("TH-31", "ブリーラム", "Buri Ram", "Buriram");
add("TH-32", "スリン", "Surin");
add("TH-33", "シーサケート", "Si Sa Ket", "Sisaket");
add("TH-34", "ウボンラーチャターニー", "ウボン", "Ubon Ratchathani");
add("TH-35", "ヤソートーン", "ヤソトーン", "Yasothon");
add("TH-36", "チャイヤプーム", "Chaiyaphum");
add("TH-37", "アムナートチャルーン", "Amnat Charoen");
add("TH-38", "ブンカーン", "Bueng Kan");
add("TH-39", "ノーンブアラムプー", "ノンブアランプー", "ノンブアラムプー", "Nong Bua Lam Phu");

// 北イサーン
add("TH-40", "コンケン", "Khon Kaen");
add("TH-41", "ウドンターニー", "ウドンタニー", "Udon Thani");
add("TH-42", "ルーイ", "Loei");
add("TH-43", "ノーンカーイ", "Nong Khai");
add("TH-44", "マハーサーラカーム", "Maha Sarakham");
add("TH-45", "ローイエット", "Roi Et");
add("TH-46", "カーラシン", "Kalasin");
add("TH-47", "サコンナコーン", "サコンナコン", "Sakon Nakhon");
add("TH-48", "ナコンパノム", "ナコーンパノム", "Nakhon Phanom");
add("TH-49", "ムックダーハーン", "Mukdahan");

// 北部
add("TH-50", "チェンマイ", "Chiang Mai");
add("TH-51", "ランプーン", "ラムプーン", "Lamphun");
add("TH-52", "ランパーン", "Lampang");
add("TH-53", "ウタラディット", "Uttaradit");
add("TH-54", "プレー", "Phrae");
add("TH-55", "ナーン", "Nan");
add("TH-56", "パヤオ", "Phayao");
add("TH-57", "チェンライ", "Chiang Rai");
add("TH-58", "メーホンソーン", "メーホーンソーン", "Mae Hong Son");

// 中部・西部
add("TH-60", "ナコーンサワン", "Nakhon Sawan");
add("TH-61", "ウタイターニー", "Uthai Thani");
add("TH-62", "カムペーンペット", "Kamphaeng Phet");
add("TH-63", "ターク", "Tak");
add("TH-64", "スコータイ", "Sukhothai");
add("TH-65", "ピッサヌローク", "Phitsanulok");
add("TH-66", "ピチット", "Phichit");
add("TH-67", "ペッチャブーン", "ペッチャブン", "Phetchabun");

add("TH-70", "ラーチャブリー", "Ratchaburi");
add("TH-71", "カンチャナブリー", "Kanchanaburi");
add("TH-72", "スパンブリー", "Suphan Buri", "Suphanburi");
add("TH-73", "ナコーンパトム", "Nakhon Pathom");
add("TH-74", "サムットサーコーン", "Samut Sakhon");
add("TH-75", "サムットソンクラーム", "Samut Songkhram");
add("TH-76", "ペッチャブリー", "Phetchaburi");
add("TH-77", "プラチュワップキーリーカン", "Prachuap Khiri Khan");

// 南部
add("TH-80", "ナコーンシータマラート", "ナコンシータマラート", "ナコーンナクマラート", "Nakhon Si Thammarat");
add("TH-81", "クラビー", "Krabi");
add("TH-82", "パンガー", "Phangnga", "Phang Nga");
add("TH-83", "プーケット", "Phuket");
add("TH-84", "スラートターニー", "Surat Thani");
add("TH-85", "ラノーン", "Ranong");
add("TH-86", "チュムポーン", "チュムポン", "Chumphon");

add("TH-90", "ソンクラー", "Songkhla");
add("TH-91", "サトゥーン", "Satun");
add("TH-92", "トラン", "Trang");
add("TH-93", "パッタルン", "Phatthalung");
add("TH-94", "パッタニー", "Pattani");
add("TH-95", "ヤラー", "Yala");
add("TH-96", "ナラーティワート", "ナラティワート", "Narathiwat");

// Notion表記ゆれ追加
add("TH-15", "アントーン");
add("TH-61", "ウタイタニー");
add("TH-34", "ウボンラチャタニー", "ウボンラーチャタニー");
add("TH-46", "カラシン");
add("TH-81", "クラビ");
add("TH-40", "コーンケーン");
add("TH-74", "サムットサコーン");
add("TH-84", "スラタニー", "スラータニー");
add("TH-24", "チャチュンサオ");
add("TH-60", "ナコンサワン");
add("TH-26", "ナコンナヨック", "ナコーンナヨック");
add("TH-73", "ナコンパトム");
add("TH-43", "ノンカーイ");
add("TH-31", "ブリラム");
add("TH-25", "プラチンブリー");
add("TH-49", "ムクダハーン");
add("TH-70", "ラチャブリー");
add("TH-45", "ロイエット");
// =============================
// Notion property読み取り
// =============================

function propToText(prop) {
  if (!prop) return "";

  if (prop.type === "title") {
    return prop.title.map(t => t.plain_text).join("");
  }

  if (prop.type === "rich_text") {
    return prop.rich_text.map(t => t.plain_text).join("");
  }

  if (prop.type === "select") {
    return prop.select?.name || "";
  }

  if (prop.type === "status") {
    return prop.status?.name || "";
  }

  if (prop.type === "multi_select") {
    return prop.multi_select.map(s => s.name).join(",");
  }

  if (prop.type === "checkbox") {
    return prop.checkbox ? "true" : "false";
  }

  if (prop.type === "number") {
    return String(prop.number ?? "");
  }

  if (prop.type === "formula") {
    const f = prop.formula;

    if (f.type === "string") return f.string || "";
    if (f.type === "boolean") return f.boolean ? "true" : "false";
    if (f.type === "number") return String(f.number ?? "");
    if (f.type === "date") return f.date?.start || "";
  }

  if (prop.type === "rollup") {
    const r = prop.rollup;

    if (r.type === "number") return String(r.number ?? "");

    if (r.type === "array") {
      return r.array.map(item => propToText(item)).join(",");
    }

    if (r.type === "date") return r.date?.start || "";
  }

  return "";
}

function getTitle(page) {
  const props = page.properties || {};

  for (const prop of Object.values(props)) {
    if (prop.type === "title") {
      return propToText(prop).trim();
    }
  }

  return "";
}

function getPropByNames(props, names) {
  const targets = names.map(name => normalizeKey(name));

  for (const [actualName, prop] of Object.entries(props)) {
    if (targets.includes(normalizeKey(actualName))) {
      return prop;
    }
  }

  return null;
}

// =============================
// 訪問済み判定
// =============================

function textIsVisited(text) {
  const value = String(text || "").trim();

  if (!value) return false;

  const positiveWords = [
    "true",
    "yes",
    "done",
    "visited",
    "行った",
    "訪問済み",
    "訪問済",
    "済",
    "完了",
    "○",
    "〇",
    "✓",
    "✔"
  ];

  if (positiveWords.some(k => value.includes(k))) return true;

  const num = Number(value);
  if (!Number.isNaN(num) && num > 0) return true;

  return false;
}

function propLooksVisited(prop) {
  if (!prop) return false;

  if (prop.type === "checkbox") {
    return prop.checkbox === true;
  }

  if (prop.type === "number") {
    return Number(prop.number || 0) > 0;
  }

  if (prop.type === "formula") {
    const f = prop.formula;

    if (f.type === "boolean") return f.boolean === true;
    if (f.type === "number") return Number(f.number || 0) > 0;
    if (f.type === "string") return textIsVisited(f.string);
  }

  if (prop.type === "rollup") {
    return textIsVisited(propToText(prop));
  }

  return textIsVisited(propToText(prop));
}

function isVisited(props) {
  const visitedProp = getPropByNames(props, [
    "行った",
    "行った回数",
    "訪問済み",
    "訪問済",
    "訪問回数",
    "Visited",
    "visited"
  ]);

  if (propLooksVisited(visitedProp)) return true;

  const statusProp = getPropByNames(props, [
    "ステータス",
    "Status",
    "状態",
    "訪問状況"
  ]);

  if (textIsVisited(propToText(statusProp))) return true;

  return false;
}

// =============================
// Notion API
// =============================

async function queryNotion(cursor = null) {
  const body = {
    page_size: 100
  };

  if (cursor) {
    body.start_cursor = cursor;
  }

  const res = await fetch(`https://api.notion.com/v1/data_sources/${DATA_SOURCE_ID}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2025-09-03",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API error: ${res.status} ${text}`);
  }

  return res.json();
}

// =============================
// Main
// =============================
async function main() {
  let cursor = null;
  const pages = [];

  do {
    const data = await queryNotion(cursor);

    pages.push(...data.results);

    cursor = data.has_more ? data.next_cursor : null;
  } while (cursor);

  const visited = [];
  const planned = [];
  const unknown = [];

  for (const page of pages) {
    const title = getTitle(page);

    if (!title) {
      continue;
    }

    const id = provinceMap.get(normalizeKey(title));

    if (!id) {
      unknown.push(title);
      continue;
    }

    const props = page.properties || {};

    if (title === "バンコク" || title === "チョンブリー" || title === "チェンマイ") {
      console.log("DEBUG TITLE:", title);
      console.log("DEBUG PROPERTIES:", JSON.stringify(props, null, 2));
    }

    if (isVisited(props)) {
      visited.push(id);
    }
  }

  const output = {
    updatedAt: new Date().toISOString(),
    visited: [...new Set(visited)].sort(),
    planned: [...new Set(planned)].sort(),
    unknown: [...new Set(unknown)].sort()
  };

  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync("data/status.json", JSON.stringify(output, null, 2));

  console.log(`Pages: ${pages.length}`);
  console.log(`Visited: ${output.visited.length}`);
  console.log(`Planned: ${output.planned.length}`);
  console.log(`Unknown: ${output.unknown.length}`);

  if (output.unknown.length) {
    console.log("Unknown province names:");
    console.log(output.unknown);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
