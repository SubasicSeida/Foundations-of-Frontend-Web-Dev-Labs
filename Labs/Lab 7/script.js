document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("employeesTable");
    const modal = document.getElementById("employeeModal");
    const closeBtn = document.querySelector(".close");
    const searchInput = document.getElementById("searchInput");
    let data = []; // This will hold the employee data
  
    // Function to fill the table with data
    function populateTable(data) {
      const tbody = table.querySelector("tbody");
      tbody.innerHTML = ""; // Clear existing rows
      data.forEach(employee => {
        const row = tbody.insertRow();
        row.innerHTML = `
          <td class="employee-name">${employee.name}</td>
          <td>${employee.department}</td>
          <td>${employee.position}</td>
          <td>${employee.salary}</td>
          <td>${employee.hireDate}</td>
          <td><button class="details-btn" data-id="${employee.id}">Details</button></td>
        `;
      });
    }
  
    // Function to sort data
    function sortData(key, order) {
      data.sort((a, b) => {
        if (a[key] < b[key]) return order === "asc" ? -1 : 1;
        if (a[key] > b[key]) return order === "asc" ? 1 : -1;
        return 0;
      });
    }
  
    // Function to toggle sorting icons
    function toggleSortIcon(target) {
      const allIcons = table.querySelectorAll(".sortIcon");
      allIcons.forEach(icon => icon.classList.remove("asc", "desc"));
      const icon = target.querySelector(".sortIcon");
      icon.classList.toggle("asc", target.classList.contains("asc"));
      icon.classList.toggle("desc", target.classList.contains("desc"));
    }
  
    // Function to show employee details modal
    function showDetails(employeeId) {
      const employee = data.find(emp => emp.id === employeeId);
      const employeeInfoTable = document.getElementById("employeeInfoTable");
      const employeeImage = document.getElementById("employeeImage");
  
      // Clear previous data
      employeeInfoTable.innerHTML = "";
  
      // Populate employee details
      const details = `
        <tr><td>Name:</td><td>${employee.name}</td></tr>
        <tr><td>Department:</td><td>${employee.department}</td></tr>
        <tr><td>Position:</td><td>${employee.position}</td></tr>
        <tr><td>Salary:</td><td>${employee.salary}</td></tr>
        <tr><td>Hire Date:</td><td>${employee.hireDate}</td></tr>
      `;
  
      // Populate employee picture (assuming employee.picture contains the image URL)
      employeeImage.src = employee.picture;
      employeeImage.alt = `Picture of ${employee.name}`;
  
      // Append details to modal
      employeeInfoTable.innerHTML = details;
      modal.style.display = "block";
    }
  
    // Close modal when close button is clicked
    closeBtn.onclick = () => modal.style.display = "none";
  
    // Close modal when clicked outside of it
    window.onclick = event => {
      if (event.target == modal) modal.style.display = "none";
    };
  
    // Event listener for search input
    searchInput.addEventListener("input", function() {
      const query = this.value.toLowerCase();
      const filteredData = data.filter(employee => employee.name.toLowerCase().includes(query));
      populateTable(filteredData);
    });
  
    // Sample employee data
    data = [
      { id: 1, name: "John Doe", department: "HR", position: "Manager", salary: "$60,000", hireDate: "2023-01-15", picture: "john_doe.jpg" },
      { id: 2, name: "Jane Smith", department: "Finance", position: "Accountant", salary: "$50,000", hireDate: "2022-05-20", picture: "jane_smith.jpg" },
      { id: 3, name: "David Johnson", department: "IT", position: "Developer", salary: "$70,000", hireDate: "2023-03-10", picture: "david_johnson.jpg" },
      { id: 4, name: "Emily Brown", department: "Marketing", position: "Coordinator", salary: "$45,000", hireDate: "2021-11-30", picture: "emily_brown.jpg" }
    ];
  
    // Populate table with initial data
    populateTable(data);
  
    // Event listener for details button clicks
    table.addEventListener("click", function(e) {
      if (e.target.classList.contains("details-btn")) {
        const employeeId = parseInt(e.target.dataset.id);
        showDetails(employeeId);
      }
    });
  
    // Trigger click on the "Employee Name" column to initially sort by name
    const nameColumnHeader = table.querySelector("th[data-sort='name']");
    nameColumnHeader.click();
  });
  