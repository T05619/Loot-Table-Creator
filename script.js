let dictionaryOfItems = {}

console.clear()

function generateSnippet(name) {
    var template = `
        <div class="flex justify-between items-center p-2 border-b border-black" id=${name + "_item"}>
            <p class="text-xl">${name}</p>
            <div>
                <button class="text-lg items-center" id="${name + "_bb"}" onclick='openInfo("${name}")'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 iconfixheight iconbutton">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                </button>
                <button class="text-lg" id="${name + "_cb"}" onclick='removeItem("${name}", "${name + "_item"}")'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 iconfixheight iconbutton">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    `;

    return template;
}

function NHelp() {
    document.getElementById("NameHelpInfo").classList.remove("hidden");
    document.getElementById("helpPanel").classList.remove("hidden");
};

function CRHelp() {
    document.getElementById("CRHelpInfo").classList.remove("hidden");
    document.getElementById("helpPanel").classList.remove("hidden");
};

function MMHelp() {
    document.getElementById("MMHelpInfo").classList.remove("hidden");
    document.getElementById("helpPanel").classList.remove("hidden");
};

function closeHelp() {
    document.getElementById("helpPanel").classList.add("hidden");
    if (!document.getElementById("NameHelpInfo").classList.contains("hidden")) {
        document.getElementById("NameHelpInfo").classList.add("hidden");
    } else if (!document.getElementById("CRHelpInfo").classList.contains("hidden")) {
        document.getElementById("CRHelpInfo").classList.add("hidden");
    } else if (!document.getElementById("MMHelpInfo").classList.contains("hidden")) {
        document.getElementById("MMHelpInfo").classList.add("hidden");
    };
};

function addItem() {
    let ItemNameValue = document.getElementById("ItemNameInput").value.trim();
    let ChanceValue = parseFloat(document.getElementById("ChanceInput").value.trim());
    let RollsValue = parseFloat(document.getElementById("RollsInput").value.trim());
    let MinValue = parseInt(document.getElementById("MinInput").value.trim());
    let MaxValue = parseInt(document.getElementById("MaxInput").value.trim());

    let ErrorMessage = document.getElementById("ErrorMessage");

    let TargetDiv = document.getElementById("ListOfItems");

    if (ItemNameValue === "") {
        ErrorMessage.innerHTML = "ERROR: Item Name: Please provide a name";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (ChanceValue > 1.00 || ChanceValue < 0.001 || isNaN(ChanceValue)) {
        ErrorMessage.innerHTML = "ERROR: Choice: Enter a value between 0.001 and 1.00";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (RollsValue < 1.00 || RollsValue % 1 !== 0 || isNaN(RollsValue)) {
        ErrorMessage.innerHTML = "ERROR: Rolls: Enter a value above 1 and an integer";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (isNaN(MinValue)) {
        ErrorMessage.innerHTML = "ERROR: Min: Enter a min value";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (isNaN(MaxValue)) {
        ErrorMessage.innerHTML = "ERROR: Min: Enter a max value";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (MinValue > MaxValue) {
        ErrorMessage.innerHTML = "ERROR: Min & Max: Min cannot be larger than Max";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (MinValue < 0 || MinValue > 64) {
        ErrorMessage.innerHTML = "ERROR: Min: Enter a value between 1 and 64";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (MaxValue < 0 || MaxValue > 64) {
        ErrorMessage.innerHTML = "ERROR: Max: Enter a value between 1 and 64";
        ErrorMessage.classList.remove("hidden");
        return;
    } else {
        ErrorMessage.classList.add("hidden");
    };

    if (!document.getElementById("noItemsInListText").classList.contains("hidden")) {
        document.getElementById("noItemsInListText").classList.add("hidden");
    };

    let snippet = generateSnippet(ItemNameValue);
    TargetDiv.insertAdjacentHTML("beforeend", snippet);

    document.getElementById("ItemNameInput").value = "";
    document.getElementById("ChanceInput").value = "";
    document.getElementById("RollsInput").value = "";
    document.getElementById("MinInput").value = "";
    document.getElementById("MaxInput").value = "";

    dictionaryOfItems[ItemNameValue] = [ItemNameValue, ChanceValue, RollsValue, MinValue, MaxValue];
};

function removeItem(DictItemName, HTMLid) {
    let TargetDiv = document.getElementById("ListOfItems");
    let itemToRemove = document.getElementById(HTMLid);

    TargetDiv.removeChild(itemToRemove);
    delete dictionaryOfItems[DictItemName];

    checkIfItemsLeft()
};

function openInfo(name) {
    let InfoNameValue = document.getElementById("InfoNameValue");
    let InfoChanceValue = document.getElementById("InfoChanceValue");
    let InfoRollsValue = document.getElementById("InfoRollsValue");
    let InfoMinValue = document.getElementById("InfoMinValue");
    let InfoMaxValue = document.getElementById("InfoMaxValue");

    let dictionaryEntry = dictionaryOfItems[name];

    InfoNameValue.innerHTML = dictionaryEntry[0];
    InfoChanceValue.innerHTML = dictionaryEntry[1];
    InfoRollsValue.innerHTML = dictionaryEntry[2];
    InfoMinValue.innerHTML = dictionaryEntry[3];
    InfoMaxValue.innerHTML = dictionaryEntry[4];

    document.getElementById("InfoPanel").classList.remove("hidden");
};

function closeInfo() {
    document.getElementById("InfoPanel").classList.add("hidden");

    let pencilIcon =  document.getElementById("pencil-icon");
    pencilIcon.classList.remove("hidden");

    let checkIcon =  document.getElementById("check-icon");
    checkIcon.classList.add("hidden");

    let nameValueData = document.getElementById("InfoNameValue").getAttribute("data-type");
    let chanceValueData = document.getElementById('InfoChanceValue').getAttribute("data-type");
    let rollsValueData = document.getElementById('InfoRollsValue').getAttribute("data-type");
    let minValueData = document.getElementById('InfoMinValue').getAttribute("data-type");
    let maxValueData = document.getElementById('InfoMaxValue').getAttribute("data-type");

    if (document.getElementById("InfoNameValue").tagName === "p") {
        document.getElementById("InfoNameValue").innerHTML = nameValueData;
        document.getElementById("InfoChanceValue").innerHTML = chanceValueData;
        document.getElementById("InfoRollsValue").innerHTML = rollsValueData;
        document.getElementById("InfoMinValue").innerHTML = minValueData;
        document.getElementById("InfoMaxValue").innerHTML = maxValueData;
    } else if (document.getElementById("InfoNameValue").tagName === "INPUT") {
        document.getElementById("InfoNameValue").value = nameValueData;
        document.getElementById("InfoChanceValue").value = chanceValueData;
        document.getElementById("InfoRollsValue").value = rollsValueData;
        document.getElementById("InfoMinValue").value = minValueData;
        document.getElementById("InfoMaxValue").value = maxValueData;
    };

    if (!document.getElementById("ErrorMessageEdit").classList.contains("hidden")) {
        document.getElementById("ErrorMessageEdit").classList.add("hidden");
    };

    InputturnIntoP();
};

function editItem() {
    let pencilIcon =  document.getElementById("pencil-icon");
    pencilIcon.classList.add("hidden");

    let checkIcon =  document.getElementById("check-icon");
    checkIcon.classList.remove("hidden");

    let nameValue = document.getElementById('InfoNameValue').innerHTML;
    let chanceValue = document.getElementById('InfoChanceValue').innerHTML;
    let rollsValue = document.getElementById('InfoRollsValue').innerHTML;
    let minValue = document.getElementById('InfoMinValue').innerHTML;
    let maxValue = document.getElementById('InfoMaxValue').innerHTML;


    let dictionaryEntry = dictionaryOfItems[nameValue];

    let paragraphs = document.querySelectorAll('.centered-div p');

    paragraphs.forEach(paragraph => {
        if (paragraph.id === "InfoNameValue") {
            const computedStyle = window.getComputedStyle(paragraph);
            const width = computedStyle.width;
            let input = document.createElement('input');
            
            input.type = 'text';
            input.value = dictionaryEntry[0];

            input.classList.add("pl-2");
            input.classList.add("text-xl");
            input.classList.add("replacedInput");
            input.classList.add("replacedInput-dark");

            input.id = "InfoNameValue";
            input.autocomplete = "off";

            input.setAttribute("data-type", nameValue);

            input.style.width = width;

            paragraph.parentNode.replaceChild(input, paragraph);
        } else if (paragraph.id === "InfoChanceValue") {
            const computedStyle = window.getComputedStyle(paragraph);
            const width = computedStyle.width;
            let input = document.createElement('input');

            input.type = 'text';
            input.value = dictionaryEntry[1];

            input.classList.add("pl-2");
            input.classList.add("text-xl");
            input.classList.add("replacedInput");
            input.classList.add("replacedInput-dark");

            input.id = "InfoChanceValue";
            input.autocomplete = "off";

            input.setAttribute("data-type", chanceValue);

            input.style.width = width;

            paragraph.parentNode.replaceChild(input, paragraph);
        } else if (paragraph.id === "InfoRollsValue") {
            const computedStyle = window.getComputedStyle(paragraph);
            const width = computedStyle.width;
            let input = document.createElement('input');

            input.type = 'text';
            input.value = dictionaryEntry[2];

            input.classList.add("pl-2");
            input.classList.add("text-xl");
            input.classList.add("replacedInput");
            input.classList.add("replacedInput-dark");

            input.id = "InfoRollsValue";
            input.autocomplete = "off";

            input.setAttribute("data-type", rollsValue);

            input.style.width = width;

            paragraph.parentNode.replaceChild(input, paragraph);
        } else if (paragraph.id === "InfoMinValue") {
            const computedStyle = window.getComputedStyle(paragraph);
            const width = computedStyle.width;
            let input = document.createElement('input');

            input.type = 'text';
            input.value = dictionaryEntry[3];

            input.classList.add("pl-2");
            input.classList.add("text-xl");
            input.classList.add("replacedInput");
            input.classList.add("replacedInput-dark");

            input.id = "InfoMinValue";
            input.autocomplete = "off";

            input.setAttribute("data-type", minValue);

            input.style.width = width;

            paragraph.parentNode.replaceChild(input, paragraph);
        } else if (paragraph.id === "InfoMaxValue") {
            const computedStyle = window.getComputedStyle(paragraph);
            const width = computedStyle.width;
            let input = document.createElement('input');

            input.type = 'text';
            input.value = dictionaryEntry[4];

            input.classList.add("pl-2");
            input.classList.add("text-xl");
            input.classList.add("replacedInput");
            input.classList.add("replacedInput-dark");

            input.id = "InfoMaxValue";
            input.autocomplete = "off";

            input.setAttribute("data-type", maxValue);

            input.style.width = width;

            paragraph.parentNode.replaceChild(input, paragraph);
        };
    });
};

function saveEdit() {
    let previousName = document.getElementById("InfoNameValue").getAttribute("data-type");

    let NewName = document.getElementById("InfoNameValue").value;
    let NewChance = document.getElementById("InfoChanceValue").value;
    let NewRolls = document.getElementById("InfoRollsValue").value;
    let NewMin = document.getElementById("InfoMinValue").value;
    let NewMax = document.getElementById("InfoMaxValue").value;

    let NewChanceFloat = parseFloat(document.getElementById("InfoChanceValue").value.trim())
    let NewRollsFloat = parseFloat(document.getElementById("InfoRollsValue").value.trim())
    let NewMinFloat = parseInt(document.getElementById("InfoMinValue").value.trim())
    let NewMaxFloat = parseInt(document.getElementById("InfoMaxValue").value.trim())

    let ErrorMessage = document.getElementById("ErrorMessageEdit");

    if (NewName === "") {
        ErrorMessage.innerHTML = "ERROR: Item Name: Please provide a name";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (NewChanceFloat > 1.00 || NewChanceFloat < 0.001 || isNaN(NewChanceFloat)) {
        ErrorMessage.innerHTML = "ERROR: Choice: Enter a value between 0.001 and 1.00";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (NewRollsFloat < 1.00 || NewRollsFloat % 1 !== 0 || isNaN(NewRollsFloat)) {
        ErrorMessage.innerHTML = "ERROR: Rolls: Enter a value above 1 and an integer";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (isNaN(NewMinFloat)) {
        ErrorMessage.innerHTML = "ERROR: Min: Enter a min value";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (isNaN(NewMaxFloat)) {
        ErrorMessage.innerHTML = "ERROR: Min: Enter a max value";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (NewMinFloat > NewMaxFloat) {
        ErrorMessage.innerHTML = "ERROR: Min & Max: Min cannot be larger than Max";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (NewMinFloat < 0 || NewMinFloat > 64) {
        ErrorMessage.innerHTML = "ERROR: Min: Enter a value between 1 and 64";
        ErrorMessage.classList.remove("hidden");
        return;
    } else if (NewMaxFloat < 0 || NewMaxFloat > 64) {
        ErrorMessage.innerHTML = "ERROR: Max: Enter a value between 1 and 64";
        ErrorMessage.classList.remove("hidden");
        return;
    } else {
        ErrorMessage.classList.add("hidden");
    };

    if (previousName !== NewName) {
        delete dictionaryOfItems[previousName];

        dictionaryOfItems[NewName] = [NewName, NewChance, NewRolls, NewMin, NewMax];
        document.getElementById(previousName + "_item").querySelector("p").innerHTML = NewName;
        document.getElementById(previousName + "_item").id = NewName + "_item";

        let bookButton = document.getElementById(previousName + "_bb");
        bookButton.onclick = () => openInfo(NewName);
        bookButton.id = NewName + "_bb";

        let crossButton = document.getElementById(previousName + "_cb");
        crossButton.onclick = () => removeItem(NewName, NewName + "_item");
        crossButton.id = NewName + "_cb";
    } else {
        dictionaryOfItems[NewName] = [NewName, NewChance, NewRolls, NewMin, NewMax];
    };

    let pencilIcon =  document.getElementById("pencil-icon");
    pencilIcon.classList.remove("hidden");

    let checkIcon =  document.getElementById("check-icon");
    checkIcon.classList.add("hidden");

    InputturnIntoP()
};

function InputturnIntoP() {
    let nameValueData = document.getElementById("InfoNameValue").getAttribute("data-type");
    let chanceValueData = document.getElementById('InfoChanceValue').getAttribute("data-type");
    let rollsValueData = document.getElementById('InfoRollsValue').getAttribute("data-type");
    let minValueData = document.getElementById('InfoMinValue').getAttribute("data-type");
    let maxValueData = document.getElementById('InfoMaxValue').getAttribute("data-type");

    let nameValue = document.getElementById('InfoNameValue').value;
    let dictionaryEntry = dictionaryOfItems[nameValue];

    let inputs = document.querySelectorAll('.centered-div input');

    inputs.forEach(ainput => {
        if (ainput.id === "InfoNameValue") {
            let paragraph = document.createElement('p');
            
            paragraph.innerHTML = dictionaryEntry[0];

            paragraph.classList.add("pl-2");
            paragraph.classList.add("text-xl");
            paragraph.classList.add("valueitem-dark");

            paragraph.id = "InfoNameValue";
            
            paragraph.setAttribute("data-type", nameValueData);

            ainput.parentNode.replaceChild(paragraph, ainput);
        } else if (ainput.id === "InfoChanceValue") {
            let paragraph = document.createElement('p');

            paragraph.innerHTML = dictionaryEntry[1];

            paragraph.classList.add("pl-2");
            paragraph.classList.add("text-xl");
            paragraph.classList.add("valueitem-dark");

            paragraph.id = "InfoChanceValue";

            paragraph.setAttribute("data-type", chanceValueData);

            ainput.parentNode.replaceChild(paragraph, ainput);
        } else if (ainput.id === "InfoRollsValue") {
            let paragraph = document.createElement('p');

            paragraph.innerHTML = dictionaryEntry[2];

            paragraph.classList.add("pl-2");
            paragraph.classList.add("text-xl");
            paragraph.classList.add("valueitem-dark");

            paragraph.id = "InfoRollsValue";

            paragraph.setAttribute("data-type", rollsValueData);

            ainput.parentNode.replaceChild(paragraph, ainput);
        } else if (ainput.id === "InfoMinValue") {
            let paragraph = document.createElement('p');

            paragraph.innerHTML = dictionaryEntry[3];

            paragraph.classList.add("pl-2");
            paragraph.classList.add("text-xl");
            paragraph.classList.add("valueitem-dark");

            paragraph.id = "InfoMinValue";

            paragraph.setAttribute("data-type", minValueData);

            ainput.parentNode.replaceChild(paragraph, ainput);
        } else if (ainput.id === "InfoMaxValue") {
            let paragraph = document.createElement('p');

            paragraph.innerHTML = dictionaryEntry[4];

            paragraph.classList.add("pl-2");
            paragraph.classList.add("text-xl");
            paragraph.classList.add("valueitem-dark");

            paragraph.id = "InfoMaxValue";

            paragraph.setAttribute("data-type", maxValueData);

            ainput.parentNode.replaceChild(paragraph, ainput);
        };
    });
};

function checkIfItemsLeft() {
    if (document.getElementById("ListOfItems").children.length === 0) {
        document.getElementById("noItemsInListText").classList.remove("hidden");
    };
};

//Check if items are in the loot table
//Check if the holder div has any children divs
//Do the actual output using loot table name and all the items

function downloadOutput() {
    let lootTableName = document.getElementById("LootTableName").value;
    if (!lootTableName) {
        if (document.getElementById("ErrorMessageDownload").classList.contains("hidden")) {
            document.getElementById("ErrorMessageDownload").classList.remove("hidden");
        }
        return;
    } else if (Object.keys(dictionaryOfItems).length === 0) {
        if (document.getElementById("ErrorMessageDownloadNoItems").classList.contains("hidden")) {
            document.getElementById("ErrorMessageDownloadNoItems").classList.remove("hidden");
        }
        return;
    } else {
        if (document.getElementById("ErrorMessageDownload").classList.contains("hidden")) {
            document.getElementById("ErrorMessageDownload").classList.add("hidden");
        } else if (document.getElementById("ErrorMessageDownloadNoItems").classList.contains("hidden")) {
            document.getElementById("ErrorMessageDownloadNoItems").classList.add("hidden");
        }
    };

    let lootTable = {
        pools: []
    };

    for (let itemName in dictionaryOfItems) {
        let itemData = dictionaryOfItems[itemName];

        let entry = {
            rolls: itemData[2],
            entries: [
                {
                    type: "item",
                    name: "minecraft:" + itemData[0],
                    conditions: [
                        {
                            condition: "minecraft:random_chance",
                            chance: itemData[1]
                        }
                    ],
                    functions: [
                        {
                            function: "set_count",
                            count: {
                                type: "uniform",
                                min: itemData[3],
                                max: itemData[4]
                            }
                        }
                    ]
                },
                {
                    type: "empty"
                }
            ]
        };

        lootTable.pools.push(entry);
    };

    let stringifedJSON = JSON.stringify(lootTable, null, 4);

    let blob = new Blob([stringifedJSON], { type: 'application/json' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = lootTableName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};