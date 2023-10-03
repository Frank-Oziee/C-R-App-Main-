$(document).ready(function(){
    let clickedTextArray = JSON.parse(localStorage.getItem("clikdCourse")) || [];
    // Create a Set to keep track of rendered items
    const renderedItems = new Set();

    //Code for making the preloader run before the App displays;
    function hidePreloader() {
        $(".preloader").fadeOut("slow");
      }
      // Simulate app loading (remove this in your actual code)
      setTimeout(hidePreloader, 250); // This simulates that the app has finished loading after 2.5 seconds

        //CODE FOR THE COURSE PAGE ELEMENT(Fetching of data from an API):
        // API URL (Replace with your API endpoint)
        const apiUrl = 'couses.json';
        async function courses() {
            try {
                // Make the API request using async/await
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}, <br><b>Failed to fetch Courses!</b>`);
                }

                const data = await response.json();

                // Store the data in an array
                const dataArray = data;

                // Handle the API response here or access data from the array
                displayData(dataArray);
            } catch (error) {
                // Handle any errors that occur during the request
                console.log('Error:', error);
                const resultElement = $('.dropdown');
                resultElement.append(`<p class="Errparagraph"> ${('Error:', error)}</p> <p class="refresh">Refresh page!<p>`);
                $('.courseSectOneBt1').hide();
                $('.courseSectOneBt').hide();
            }
        }

        // Function to display or access the data from the array
        function displayData(dataArray) {
            const resultElement = $('.dropdownLi');
            resultElement.html('<h2>Avaliable Courses:</h2>');
            const selectedC = $('.dropdownLi2');
            selectedC.html('<h2>Selected Courses:</h2>')

            // Assuming the API returns an array of items
            dataArray.forEach(function (item) {
                resultElement.append(`<li class="clickable-paragraph"> ${item.course}</li>`);
            });

            // Attach a click event handler to the rendered paragraphs
            $('.clickable-paragraph').click(function () {
                let clickedText = $(this).text();
                clickedTextArray.push(clickedText);
                localStorage.setItem("clikdCourse", JSON.stringify(clickedTextArray))
                // Remove the clicked list item
                $(this).remove();
                seletd()
            });

            function seletd(){
                for(let i=0; i<clickedTextArray.length; i++){
                    const item = clickedTextArray[i]
                    // Check if the item has not been rendered before
                    if (!renderedItems.has(item)) {
                        selectedC.append(`<li class="clickable-para"> ${item}</li>`)
                        renderedItems.add(item); // Add the item to the Set of rendered items
                    }   
                }
            }

            $('.dropdown2').on('click', function(){
                seletd()
            })      
        }
 
        //Attach a click event handler to the rendered list items(li) of the selected courses box, so that onclick of the list items
        //the rendered list items there deletes, incase of any mistake while selecting courses; 
        $('.dropdownLi2').click(function () {
            let clickedText = $(this).text();
            clickedTextArray.splice(clickedText);
            localStorage.setItem("clikdCourse", JSON.stringify(clickedTextArray))
            // Remove the clicked list item
            $(this).remove();
            location.reload() 
        });

    
        //On click of the 'select courses button', the courses fetched from the api should render;
        $('.courseSectOneBt1').on('click', function(){
            courses()
        })

        //On click of the 'list of courses' input field, all the selected courses in the array should render on the input field;
        $('.listofCourse').on('click', function(){
            let clickedText = $(this);        
            const item = clickedTextArray;
            clickedText.val(item);
        })

    //Code for 'dialog box' and input field manipulation on button click;
    $("#myForm").submit(function(e){
        // Prevent the default form submission
        e.preventDefault();

        //Assigning all 'form' elements with the 'input-control' class to a variable
        let elemts = $('.input-control') 

        // Check if all input fields are filled
        let allFilled = true;
        elemts.each(function () {
        if ($(this).val() === '') {
            allFilled = false;
            return false; // Exit the loop early
        }
        clickedTextArray = [] //Clear everthing in the array on click of the 'register button'
        localStorage.setItem("clikdCourse", JSON.stringify(clickedTextArray))//update the local storage after array clear'
        });

        // Check if the input field is not empty
        if (allFilled) {  
            // Show the dialog only when there is a value in the input field
            $("#dialog").dialog("open");
            // Clear the input field when the dialog is opened
            $(".input-control").val('');
        } else {
            // Display an alert or message if the input field is empty
            alert("Please enter a value in the input fields.");
        }
    })
    //Code for the 'dialog box' UI display;
    $("#dialog").dialog({
        title: "Thank you for registering!",
        closeOnEscape: false,
        modal: true,
        autoOpen: false
    })

    // When the form is submitted
    $("#myForm").submit(async function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Serialize the form data into a JSON object
        var formData = $(this).serializeArray();
        console.log(formData)

        try {
            // Send the data to the server using AJAX with async/await
            const response = await $.ajax({
                url: 'your-server-endpoint-url', // Replace with your server endpoint URL
                type: 'POST',
                data: formData
            });

            // Handle the server response here
            console.log("Server Response:", response);
        } catch (error) {
            // Handle errors here
            console.error("Error:", error);
        }
    });

})

