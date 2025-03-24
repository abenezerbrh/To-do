document.addEventListener("DOMContentLoaded", function () {
    // Function to mark task as completed
    function completeTask(taskId) {
        fetch(`/complete/${taskId}/`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'completed') {
                    const taskElement = document.getElementById(`task-${taskId}`);
                    const completedList = document.getElementById("completed");
                    taskElement.classList.add("completed");
                    completedList.appendChild(taskElement);
                    taskElement.querySelector(".complete-btn").remove(); // Remove complete button
                }
            })
            .catch(error => console.error("Error:", error));
    }

    // Function to delete a task
    function deleteTask(taskId) {
        fetch(`/delete/${taskId}/`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'deleted') {
                    document.getElementById(`task-${taskId}`).remove();
                }
            })
            .catch(error => console.error("Error:", error));
    }

    // Attach event listeners to buttons dynamically
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("complete-btn")) {
            const taskId = event.target.getAttribute("data-id");
            completeTask(taskId);
        }
        if (event.target.classList.contains("delete-btn")) {
            const taskId = event.target.getAttribute("data-id");
            deleteTask(taskId);
        }
    });
});

// Get the toggle button and body
const toggleButton = document.getElementById("toggle-theme");
const body = document.body;
const moonIcon = document.getElementById("moon-icon");
const sunIcon = document.getElementById("sun-icon");

// Check for previously saved theme preference (localStorage)
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleButton.checked = true;  // Set toggle to dark mode position
    moonIcon.style.display = "none";  // Hide moon icon
    sunIcon.style.display = "block";  // Show sun icon
}

toggleButton.addEventListener("change", () => {
    body.classList.toggle("dark-mode");

    // Save the theme preference to localStorage
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        moonIcon.style.display = "none";  // Hide moon icon
        sunIcon.style.display = "block";  // Show sun icon
    } else {
        localStorage.setItem("theme", "light");
        moonIcon.style.display = "block";  // Show moon icon
        sunIcon.style.display = "none";  // Hide sun icon
    }
});