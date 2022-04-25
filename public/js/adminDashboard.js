const dateInput = document.forms['date-search']['date'];
const tableBody = document.getElementById("table-body");
const strengthCount = document.getElementById("strength");
const dateDisplay = document.getElementById("data-date");
const durationDisplay = document.getElementById("duration");

async function dateQuery() {
    const date = dateInput.value;
    if (date === '') {
        dateInput.focus();
        return;
    }
    dateInput.value = '';

    const response = await fetch(`/admin/api/v1/attendance/${date}`);
    const json = await response.json();
    strengthCount.innerHTML = `<b>Strength:</b> ${json.data.length}`;
    dateDisplay.innerHTML = `<b>Date:</b> ${date.split('-')[2]}-${date.split('-')[1]}-${date.split('-')[0]}`;

    let domContent = "";
    let sno = 0;
    let maxduration = 0;
    json.data.forEach(record => {
        sno++;
        maxduration = (record.duration > maxduration) ? record.duration : maxduration;
        domContent += `<tr>
            <td>${sno}</td>
            <td>dummy name</td>
            <td>0000000</td>
            <td>ABCD</td>
            <td>0</td>
            <td>${record.in}</td>
            <td>${record.out}</td>
            <td>${Math.floor(record.duration / 3600)}h:${Math.floor((record.duration % 3600) / 60)}m</td>
            <td>${record.username}</td>
        </tr>`
    });

    // pending - change relative to 4pm
    durationDisplay.innerHTML = `<b>Duration:</b> ${Math.floor(maxduration / 3600)}h:${Math.floor((maxduration % 3600) / 60)}m`
    tableBody.innerHTML = domContent;
}