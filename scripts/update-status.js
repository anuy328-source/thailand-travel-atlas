const fs = require("fs");

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = (process.env.NOTION_DATABASE_ID || "").replace(/-/g, "");

if (!NOTION_TOKEN || !DATABASE_ID) {
  throw new Error("NOTION_TOKEN or NOTION_DATABASE_ID is missing.");
}

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

add("TH-10", "バンコク", "Bangkok", "Bangkok Metropolis", "Krung Thep Maha Nakhon");
add("TH-11", "サムットプラカーン", "Samut Prakan");
add("TH-12", "ノンタブリー", "Nonthaburi");
add("TH-13", "パトゥムターニー", "Pathum Thani");
add("TH-14", "アユタヤ", "プラナコーンシーアユタヤ", "Phra Nakhon Si Ayutthaya", "Ayutthaya");
add("TH-15", "アントーン", "Ang Thong");
add("TH-16", "ロッブリー", "Lop Buri", "Lopburi");
add("TH-17", "シンブリー", "Sing Buri", "Singburi");
add("TH-18", "チャイナート", "Chai Nat", "Chainat");
add("TH-19", "サラブリー", "Saraburi");

add("TH-20", "チョンブリー", "Chon Buri", "Chonburi");
add("TH-21", "ラヨーン", "Rayong");
add("TH-22", "チャンタブリー", "チャンダブリー", "Chanthaburi");
add("TH-23", "トラート", "Trat");
add("TH-24", "チャチュンサオ", "Chachoengsao");
add("TH-25", "プラチンブリー", "Prachin Buri", "Prachinburi");
add("TH-26", "ナコンナヨック", "Nakhon Nayok");
add("TH-27", "サケーオ", "Sa Kaeo", "Sakaeo");

add("TH-30", "ナコーンラーチャシーマー", "ナコンラチャシマ", "コラート", "Nakhon Ratchasima", "Korat");
add("TH-31", "ブリラム", "Buri Ram", "Buriram");
add("TH-32", "スリン", "Surin");
add("TH-33", "シーサケート", "Si Sa Ket", "Sisaket");
add("TH-34", "ウボンラチャタニー", "ウボン", "Ubon Ratchathani");
add("TH-35", "ヤソートーン", "Yasothon");
add("TH-36", "チャイヤプーム", "Chaiyaphum");
add("TH-37", "アムナートチャルーン", "Amnat Charoen");
add("TH-38", "ブンカーン", "Bueng Kan");
add("TH-39", "ノンブアラムプー", "Nong Bua Lam Phu");

add("TH-40", "コーンケーン", "Khon Kaen");
add("TH-41", "ウドンタニー", "Udon Thani");
add("TH-42", "ルーイ", "Loei");
add("TH-43", "ノンカーイ", "Nong Khai");
add("TH-44", "マハーサーラカーム", "Maha Sarakham");
add("TH-45", "ロイエット", "Roi Et");
add("TH-46", "カラシン", "Kalasin");
add("TH-47", "サコンナコン", "Sakon Nakhon");
add("TH-48", "ナコンパノム", "ナコーンパノム", "Nakhon Phanom");
add("TH-49", "ムクダハーン", "Mukdahan");

add("TH-50", "チェンマイ", "Chiang Mai");
add("TH-51", "ランプーン", "Lamphun");
add("TH-52", "ランパーン", "Lampang");
add("TH-53", "ウタラディット", "Uttaradit");
add("TH-54", "プレー", "Phrae");
add("TH-55", "ナーン", "Nan");
add("TH-56", "パヤオ", "Phayao");
add("TH-57", "チェンライ", "Chiang Rai");
add("TH-58", "メーホンソン", "Mae Hong Son");

add("TH-60", "ナコンサワン", "Nakhon Sawan");
add("TH-61", "ウタイタニー", "Uthai Thani");
add("TH-62", "カムペーンペット", "Kamphaeng Phet");
add("TH-63", "ターク", "Tak");
add("TH-64", "スコータイ", "Sukhothai");
add("TH-65", "ピッサヌローク", "Phitsanulok");
add("TH-66", "ピチット", "Phichit");
add("TH-67", "ペッチャブーン", "Phetchabun");

add("TH-70", "ラチャブリー", "Ratchaburi");
add("TH-71", "カンチャナブリー", "Kanchanaburi");
add("TH-72", "スパンブリー", "Suphan Buri", "Suphanburi");
add("TH-73", "ナコンパトム", "Nakhon Pathom");
add("TH-74", "サムットサコーン", "Samut Sakhon");
add("TH-75", "サムットソンクラーム", "Samut Songkhram");
add("TH-76", "ペッチャブリー", "Phetchaburi");
add("TH-77", "プラチュワップキーリーカン", "Prachuap Khiri Khan");

add("TH-80", "ナコンシータマラート", "Nakhon Si Thammarat");
add("TH-81", "クラビ", "Krabi");
add("TH-82", "パンガー", "Phangnga", "Phang Nga");
add("TH-83", "プーケット", "Phuket");
add("TH-84", "スラタニー", "Surat Thani");
add("TH-85", "ラノーン", "Ranong");
add("TH-86", "チュムポーン", "Chumphon");

add("TH-90", "ソンクラー", "Songkhla");
add("TH-91", "サトゥーン", "Satun");
add("TH-92", "トラン", "Trang");
add("TH-93", "パッタルン", "Phatthalung");
add("TH-94", "パッタニー", "Pattani");
add("TH-95", "ヤラー", "Yala");
add("TH-96", "ナラーティワート", "ナラティワート", "Narathiwat");

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

  if (prop.type === "multi_select") {
    return prop.multi_select.map(s => s.name).join(",");
  }

  if (prop.type === "checkbox") {
    return prop.checkbox ? "true" : "false";
  }

  if (prop.type === "formula") {
    const f = prop.formula;
    if (f.type === "string") return f.string || "";
    if (f.type === "boolean") return f.boolean ? "true" : "false";
    if (f.type === "number") return String(f.number ?? "");
  }

  if (prop.type === "rollup") {
    const r = prop.rollup;
    if (r.type === "number") return String(r.number ?? "");
    if (r.type === "array") return r.array.map(propToText).join(",");
  }

  return "";
}

function getTitle(page) {
  const props = page.properties || {};
  for (const prop of Object.values(props)) {
    if (prop.type === "title") return propToText(prop);
  }
  return "";
}

function getPropByNames(props, names) {
  for (const name of names) {
    if (props[name]) return props[name];
  }
  return null;
}

function isChecked(props, names) {
  const prop = getPropByNames(props, names);
  return prop?.type === "checkbox" && prop.checkbox === true;
}

function textMatches(props, names, keywords) {
  const prop = getPropByNames(props, names);
  const text = propToText(prop);
  return keywords.some(k => text.includes(k));
}

function isVisited(props) {
  if (isChecked(props, ["行った", "訪問済み", "訪問済", "Visited", "visited"])) return true;

  return textMatches(
    props,
    ["ステータス", "Status", "状態", "訪問状況"],
    ["訪問済み", "訪問済", "行った", "完了", "済", "Visited", "Done"]
  );
}

function isPlanned(props) {
  if (isChecked(props, ["計画中", "予定", "行く予定", "Planned", "planned"])) return true;

  return textMatches(
    props,
    ["ステータス", "Status", "状態", "訪問状況"],
    ["計画中", "予定", "行く予定", "Planned", "Planning"]
  );
}

async function queryNotion(cursor = null) {
  const body = {
    page_size: 100
  };

  if (cursor) body.start_cursor = cursor;

  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
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
    const id = provinceMap.get(normalizeKey(title));

    if (!id) {
      unknown.push(title);
      continue;
    }

    const props = page.properties || {};

    if (isVisited(props)) {
      visited.push(id);
    } else if (isPlanned(props)) {
      planned.push(id);
    }
  }

  const output = {
    updatedAt: new Date().toISOString(),
    visited: [...new Set(visited)].sort(),
    planned: [...new Set(planned)].sort(),
    unknown
  };

  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync("data/status.json", JSON.stringify(output, null, 2));

  console.log(`Visited: ${output.visited.length}`);
  console.log(`Planned: ${output.planned.length}`);
  if (unknown.length) {
    console.log("Unknown province names:", unknown);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
