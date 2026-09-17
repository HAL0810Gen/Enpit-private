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
};
