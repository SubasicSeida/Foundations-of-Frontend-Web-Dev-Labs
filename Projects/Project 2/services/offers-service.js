let OffersService = {
    fetchOffersFromFile : function(){
        $.ajax({
            url: '/Foundations-of-Frontend-Web-Dev/Projects/Project 2/data/offers.json',
            type: 'GET',
            dataType: 'json',
            success: function(data){
              let html = "";
              data.forEach(element => {
                html += "<li class='list-group-item'><div class='card mb-3' style='max-width: auto;'><div class='row g-0'>" +              
                                  "<div class='col-md-3'><img src=" + element.imgSrc + " class='img-fluid rounded-start'>" +
                                  "</div><div class='col-md-9'><div class='card-body'><h5 class='card-title single-explore-txt bg-theme-5'>" +
                                  element.cardTitle + "</h5><p class='card-text' style='margin-right: 20px;'>" + element.cardText +
                                  "</p><p class='card-text'><small class='text-body-secondary'><span>" + element.cardSmallText +
                                  "</span></small></p><button class='btn btn-primary' onclick='OffersService.openViewMore(" + 
                                  element.id + ")'>View More</button></div></div></div></div></li>";
              });
              $("#explore-list").html(html);
            },
            error: function(xhr, status, error){
              console.error('Error fetching data from file : ', error);
            }
          })
    },

    fetchOfferCategories : function(){
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
            this.classList.toggle("active-panel");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
            });
        }
    },

    getOfferById: function(id){
      $.ajax({
        url: '/Foundations-of-Frontend-Web-Dev/Projects/Project 2/data/offer' + id + '.json',
        type: 'GET',
        dataType: 'json',
        success: function(data){
          $.blockUI();
          localStorage.setItem('selectedOffer', JSON.stringify(data));
          console.log(JSON.stringify(localStorage.getItem('selectedOffer')));
          $.unblockUI();
        },
        error: function(xhr, status, error){
          console.log("Error fetching data from file ", error);
          $.unblockUI();
        }
      })
    },

    openViewMore: function(id){
      OffersService.getOfferById(id);
      window.location.replace("#view-more");
    },

    populateViewMore: function(){
      let selectedOffer = localStorage.getItem('selectedOffer');

    }
}