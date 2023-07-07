const form = document.querySelector('form');
const add_btn = document.querySelector('.add_btn');
const name_input = document.querySelector('.iname');
const id_input = document.querySelector('.iid');
const course_input = document.querySelector('.icourse');
const grades_input = document.querySelector('.igrades');
const container = document.querySelector('.new-student');
const all_input = document.querySelector('input');

formSubmit();
function formSubmit() {
    //get username from LS
    const storedUsername = localStorage.getItem('username');
    console.log(storedUsername);

    const navbar = document.querySelector('.navbar');
    navbar.innerHTML = `
         <h2>Welcome ${storedUsername} </h2>
        <button class="logout">Logout</button>
        <div class="line"></div>
    `;
    add_btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Get the input values
        const fullName = name_input.value;
        const id = id_input.value;
        const course = course_input.value;
        const grades = grades_input.value;


        // Create a new table row
        const newTab = document.createElement('tr');
        newTab.innerHTML = ` 
        <tbody id="myTable">
        <td>${fullName}</td>
         <td>${id}</td>
         <td>${course}</td>
         <td>${grades}</td>
         <td>
             <button class="remove">Remove</button>
            <button class="edit">Edit</button>
         </td>
        </tbody>
    `;
        //gives a warning if you don't add anything to the input
        if (fullName === '' || id === '' || course === '' || grades === '') {
            const error_page = document.createElement('div');
            error_page.classList.add('error-container');
            error_page.innerHTML = `
            <i class="fa-solid fa-exclamation fa-fade"></i>
                <p>You can't leave it blank</p>
            `;
            container.appendChild(error_page);

            setTimeout(() => {
                error_page.remove();
            }, 2000);
            return;
        }
        // Append the row to the table
        const fullTab = document.querySelector('table');
        fullTab.appendChild(newTab);

        // Clear the input values
        name_input.value = '';
        id_input.value = '';
        course_input.value = '';
        grades_input.value = '';

        //remove buttons action
        const remove_btn = newTab.querySelector('.remove');
        remove_btn.addEventListener('click', () => {
            newTab.remove();
        })
        //edit button action
        const edit_btn = newTab.querySelector('.edit');
        edit_btn.addEventListener('click', () => {
            const selectedRows = newTab.querySelectorAll('td:not(:last-child)');
            if (edit_btn.textContent == 'Edit') {
                selectedRows.forEach((e) => {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = e.textContent;
                    e.innerHTML = '';
                    e.appendChild(input);
                });
                edit_btn.textContent = 'Save';
            }
            else {
                selectedRows.forEach((e) => {
                    const input = e.querySelector('input');
                    e.textContent = input.value;
                });
                edit_btn.textContent = 'Edit';
            }
        });
    });
    const logout_btn = document.querySelector('.logout');
    logout_btn.addEventListener('click', () => {
        window.location.href = 'index.html';
    })


    const search_btn = document.querySelector('.search_btn');
    const filter_input = document.querySelector('.filter_input');
    const tableRows = document.querySelectorAll('#search_table tbody tr');

    search_btn.addEventListener('click', () => {
        const searchValue = filter_input.value;
        console.log(searchValue);

        const tableRows = document.querySelectorAll('#myTable tbody tr');
        tableRows.forEach((row) => {
            const name = row.cells[0].textContent;
            const id = row.cells[1].textContent;
            const course = row.cells[2].textContent;
            const grades = row.cells[3].textContent;

            if (
                name.includes(searchValue) ||
                id.includes(searchValue) ||
                course.includes(searchValue) ||
                grades.includes(searchValue)
            ) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}