const onClick = () => {
    addsclist();
};

const addsclist = () => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.className = "sclist";
    const p = document.createElement("p");
    p.innerText = "仮予定";

    div.appendChild(p);
    li.appendChild(div);
    document.getElementById("sclist").appendChild(li);
};