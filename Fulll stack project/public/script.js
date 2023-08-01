window.onload = loadContact;

function loadContact() {
  fetch("/contactInfo")
    .then((res) => res.json())
    .then((contacts) => {
      contacts.forEach((ele) => {
        const tbody = document.querySelector("tbody");
        const tr = document.createElement("tr");

        const id = document.createElement("td");
        id.textContent = ele.id;
        tr.appendChild(id);

        const Name = document.createElement("td");
        Name.textContent = ele.Name;
        tr.appendChild(Name);

        const Age = document.createElement("td");
        Age.textContent = ele.Age;
        tr.appendChild(Age);

        const contact = document.createElement("td");
        contact.textContent = ele.contact;
        tr.appendChild(contact);

        tbody.appendChild(tr);
      });
    });
}

const Name = document.getElementById("Name");
const Age = document.getElementById("Age");
const Contact = document.getElementById("Contact");
const addContact = document.querySelector(".add-btn");

addContact.addEventListener("click", () => {
  if (Name.value == "" || Age.value == "" || Contact.value == "") {
    return;
  }
  const data = {
    Name: Name.value,
    Age: Age.value,
    Contact: Contact.value,
  };

  fetch("/uploadData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log("stuck");
      return res.json(); 
    })
    .then((dat) => {
      console.log(dat.warningStatus);
      if (dat.warningStatus == 0) {
        location.reload();
      }
    })
    .catch((error) => {
      console.error("Error uploading data:", error);
    });
});

// {
//   "fieldCount": 0,
//   "affectedRows": 1,
//   "insertId": 9,
//   "info": "",
//   "serverStatus": 2,
//   "warningStatus": 0,
//   "changedRows": 0
// }
