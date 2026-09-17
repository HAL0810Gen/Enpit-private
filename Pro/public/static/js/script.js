const onClick = (type) => {
    addsclist(type);
};

const addsclist = (type) => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月 (01〜12)
    const day = String(now.getDate()).padStart(2, '0');       // 日 (01〜31)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const li = document.createElement("li");
    const div = document.createElement("div");
    div.className = "sclist";

    const p = document.createElement("p");
    // 表示形式を「MM月DD日 hh:mm:ss」にする例
    p.innerText = `${type}予定：${month}月${day}日${hours}:${minutes}`;

    div.appendChild(p);
    li.appendChild(div);

    document.getElementById("sclist").appendChild(li);
};