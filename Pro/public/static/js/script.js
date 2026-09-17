//入力データ(フロントエンド)
let schedules = []; // { id, category, createdAt }

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const YEAR = new Date().getFullYear();

let currentMonth = new Date().getMonth();
const ACTUAL_CURRENT_MONTH = new Date().getMonth();

const dateOnly = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

//ボタン押下時の処理
const onClick = (type) => {
    addsclist(type);
};

const addsclist = (type) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const li = document.createElement("li");
    const div = document.createElement("div");
    div.className = "sclist";

    const p = document.createElement("p");
    p.innerText = `${type}の仮予定：${hours}:${minutes}:${seconds}`;

    div.appendChild(p);
    li.appendChild(div);

    document.getElementById("sclist").appendChild(li);

    schedules.push({
        id: Date.now(),
        category: type, // "３日以内" / "今日" / "それ以降"
        createdAt: now
    });
    renderCalendar();
};

// ==== 画面切り替え ====
const openCalendar = () => {
    document.getElementById("calendar-view").style.display = "flex"; // ← block から flex に変更
    renderCalendar();
};

const closeCalendar = () => {
    document.getElementById("calendar-view").style.display = "none";
};

// ==== 「３日以内」の期限切れ判定 ====
const isExpiredWithin3Days = (schedule) => {
    const today = dateOnly(new Date());
    const limit = dateOnly(schedule.createdAt);
    limit.setDate(limit.getDate() + 3);
    return today > limit;
};

const getValidSchedules = () => {
    return schedules.filter((s) => {
        if (s.category === "３日以内") {
            return !isExpiredWithin3Days(s);
        }
        return true;
    });
};

// ==== 日付ごとのゾーン判定 ====
const classifyDate = (cellDate, flags) => {
    const today = dateOnly(new Date());
    const target = dateOnly(cellDate);
    const diffDays = Math.round((target - today) / MS_PER_DAY);

    if (diffDays < 0) return ""; // 過去は無色

    if (diffDays <= 2) {
        return flags.hasUrgent ? "cal-zone-urgent" : "";
    }
    if (target.getFullYear() === today.getFullYear() && target.getMonth() === today.getMonth()) {
        return flags.hasMonth ? "cal-zone-month" : "";
    }
    return flags.hasLater ? "cal-zone-later" : "";
};

// ==== カレンダー描画 ====
const renderCalendar = () => {
    const grid = document.getElementById("calendar-grid");
    const title = document.getElementById("calendar-title");
    if (!grid || !title) return;

    grid.innerHTML = "";
    title.textContent = `${YEAR}年 ${currentMonth + 1}月`;

    const valid = getValidSchedules();

    // カテゴリごとの件数を数える
    const counts = {
        urgent: valid.filter((s) => s.category === "３日以内").length,
        month: valid.filter((s) => s.category === "今月").length,
        later: valid.filter((s) => s.category === "それ以降").length,
    };

    // ゾーンの色付け判定には「1件以上あるか」のフラグとして流用
    const flags = {
        hasUrgent: counts.urgent > 0,
        hasMonth: counts.month > 0,
        hasLater: counts.later > 0,
    };

    // 凡例の件数表示を更新
    document.getElementById("count-urgent").textContent = `${counts.urgent}件`;
    document.getElementById("count-month").textContent = `${counts.month}件`;
    document.getElementById("count-later").textContent = `${counts.later}件`;

    // ここから下（曜日・日付セルの生成部分）は変更不要
    ["日", "月", "火", "水", "木", "金", "土"].forEach((day) => {
        const cell = document.createElement("div");
        cell.className = "calendar-cell calendar-weekday";
        cell.textContent = day;
        grid.appendChild(cell);
    });

    const firstWeekday = new Date(YEAR, currentMonth, 1).getDay();
    const lastDate = new Date(YEAR, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstWeekday; i++) {
        const empty = document.createElement("div");
        empty.className = "calendar-cell calendar-empty";
        grid.appendChild(empty);
    }

    for (let d = 1; d <= lastDate; d++) {
        const cellDate = new Date(YEAR, currentMonth, d);
        const zoneClass = classifyDate(cellDate, flags);
        const cell = document.createElement("div");
        cell.className = `calendar-cell ${zoneClass}`.trim();
        cell.textContent = d;
        grid.appendChild(cell);
    }

    document.getElementById("prev-mon").disabled = (currentMonth <= ACTUAL_CURRENT_MONTH);
    document.getElementById("next-mon").disabled = (currentMonth >= 11);
};

// ==== 月移動ボタン ====
document.addEventListener("DOMContentLoaded", () => {
    const prevBtn = document.getElementById("prev-mon");
    const nextBtn = document.getElementById("next-mon");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentMonth > ACTUAL_CURRENT_MONTH) {
                currentMonth--;
                renderCalendar();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentMonth < 11) {
                currentMonth++;
                renderCalendar();
            }
        });
    }
});