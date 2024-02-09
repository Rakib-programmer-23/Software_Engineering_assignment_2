document.addEventListener("DOMContentLoaded", function () {
    let sortByViewAsc = true; 

    const Display_section = document.getElementById("display");
    const sortByViewButton = document.getElementById("sortByView");
    const blogButton = document.getElementById("blogButton");

     
     const openBlog = () => {
        window.location.href = "blog.html";
    };

    
      const updateSortButtonText = () => {
        sortByViewButton.textContent = `Sort by view`;
        sortByViewButton.setAttribute('data-bs-original-title', `${sortByViewAsc ? 'Highest to Lowest' : 'Lowest to Highest'}`);
        
         new bootstrap.Tooltip(sortByViewButton);
       
    };
    
    updateSortButtonText();
    
    const fetchData = (category) => {
        fetch(`https://openapi.programming-hero.com/api/videos/category/${category}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Network response was not ok (${res.status})`);
                }
                return res.json();
            })
            .then((data) => {
                console.log(`Data loaded successfully for category ${category}:`, data);
                DisplayData(data.data);
            })
            .catch((error) => {
                console.error(`Error loading ${category} data:`, error);
            });
    };

    const loadAllData = () => fetchData(1000);
    const loadMusicData = () => fetchData(1001);
    const loadComedyData = () => fetchData(1003);

    const DisplayData = (data) => {
        Display_section.innerHTML = "";
       
        data.sort((a, b) => {
            const timeA = a.others.posted_date;
            const timeB = b.others.posted_date;
            return sortByViewAsc ? timeB - timeA : timeA - timeB;
        });

        data.forEach((info) => {
            const card = document.createElement("div");
            card.classList.add("box");

            const postedDate = info.others.posted_date;
            const hours = parseInt(postedDate / 3600 | 0);
            const minutes = parseInt((postedDate - hours * 3600) / 60);

            card.innerHTML = `
                <div class="thumbnail-container">
                        <img class="thumbnail" src="${info.thumbnail}" alt="">
                        ${hours !== 0 && minutes !== 0 ? `
                        <div class="time-info">
                            <p>${hours} hrs ${minutes} mins</p>
                        </div>` : ''}
                </div>

                <div class="profile-info">
                    <img class="Profile_picture" src="${info.authors[0].profile_picture}" alt="">
                    <p style="font-weight: bold; font-size:20px">${info.title}</p>
                </div>
                <div class="authors">
                    <p>${info.authors[0].profile_name}</p>
                    <p style="padding-bottom:0px">${info.others.views}</p>
                </div>
            `;
            Display_section.appendChild(card);
        });
    };

    const loadDrawing = () => {
        const drawing = document.getElementById("display");
        drawing.innerHTML = `
            <div class="box_1" >
                <img src="icons/Icon.png" alt="">
                <p style="font-weight: bold; font-size:25px"> 
                    Oops!! Sorry, there is no 
                        <br>content here.</p>
            </div>
        `;
    };

    const toggleSortOrder = () => {
        sortByViewAsc = !sortByViewAsc; 
        updateSortButtonText();
        
        if (document.getElementById("allButton").classList.contains("active")) {
            loadAllData();
        } else if (document.getElementById("musicButton").classList.contains("active")) {
            loadMusicData();
        } else if (document.getElementById("comedyButton").classList.contains("active")) {
            loadComedyData();
        }
    };

    sortByViewButton.addEventListener("click", toggleSortOrder);

    document.getElementById("allButton").addEventListener("click", () => {
        loadAllData();
        document.getElementById("allButton").classList.add("active");
        document.getElementById("musicButton").classList.remove("active");
        document.getElementById("comedyButton").classList.remove("active");
    });

    document.getElementById("musicButton").addEventListener("click", () => {
        loadMusicData();
        document.getElementById("allButton").classList.remove("active");
        document.getElementById("musicButton").classList.add("active");
        document.getElementById("comedyButton").classList.remove("active");
    });

    document.getElementById("comedyButton").addEventListener("click", () => {
        loadComedyData();
        document.getElementById("allButton").classList.remove("active");
        document.getElementById("musicButton").classList.remove("active");
        document.getElementById("comedyButton").classList.add("active");
    });

    document.getElementById("drawingButton").addEventListener("click", loadDrawing);
    blogButton.addEventListener("click", openBlog);

   
    loadAllData();

     
     function handleButtonClick(buttonId) {
        
        document.querySelectorAll('.content-section button').forEach(button => {
            button.classList.remove('active-button');
        });

       
        document.getElementById(buttonId).classList.add('active-button');
    }

    
    document.getElementById("allButton").addEventListener("click", function() {
        handleButtonClick("allButton");
        
    });

    document.getElementById("musicButton").addEventListener("click", function() {
        handleButtonClick("musicButton");
       
    });

    document.getElementById("comedyButton").addEventListener("click", function() {
        handleButtonClick("comedyButton");
       
    });

    document.getElementById("drawingButton").addEventListener("click", function() {
        handleButtonClick("drawingButton");
       
    });
});
