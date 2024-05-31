let OffersService = {
    fetchOffersFromFile : function(){

      RestClient.get('offers.json', function(data){
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
      }, function(error){
        console.error('Error fetching data from file : ', error);
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

    getOfferById: function(id, callback){

      RestClient.get('offer' + id + '.json', function(data){
        $.blockUI();
        localStorage.setItem('selectedOffer', JSON.stringify(data));
        $.unblockUI();
        if(callback) callback();
      }, function(error){
        console.log("Error fetching data from file ", error);
        $.unblockUI();
      })
    },

    openViewMore: function(id){
      OffersService.getOfferById(id, function(){
        window.location.replace("#view-more");
        OffersService.populateViewMore();
      });
    },

    populateViewMore: function(){
      let selectedOffer = JSON.parse(localStorage.getItem('selectedOffer'));
      console.log(selectedOffer);
      let offerMain = "<div class='col-md-3'><img src='" + selectedOffer.imgSrc + "'>" +
                      "</div><div class='section-header col-md-9'><h2>" + selectedOffer.cardTitle + 
                      "</h2><p><small>" + selectedOffer.cardSmallText + "</small></p>" +
                      "<div class='main-content'><p>" + selectedOffer.cardText + "</p></div></div>";
      let offerOptions = "<h4>Pick wanted options</h4>";
      for (let option in selectedOffer.options) {
        offerOptions += "<div class='form-check'><input class='form-check-input' type='checkbox' id='" + option + "'>" +
                        "<label class='form-check-label' for='" + option + "'>" + selectedOffer.options[option] + "</label></div>";
      }
      document.getElementById("offer-main").innerHTML = offerMain;
      document.getElementById("offer-options").innerHTML = offerOptions;
    },

    reservationSuccess: function(){
      toastr.success("You successfully made a reservation!");
    }
}