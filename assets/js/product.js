
import { productComp, pagination } from "./components.js"

$("document").ready(function () {
  var parentContainer = $(".agileinfo-ads-display .wrapper");
  var filter = JSON.parse($(".param").val());
  var brand = [];
  var ram = [];
  var discount = 0
  var availiability = false
  var arrival = 0
  var cashOnDelivery = false
  const productLength = $(".productLength").val()
  const page = undefined

  $(".brand input").change(function () {
    const value = $(this).val() == "true" ? false : true;
    $(this).attr("value", value);
    // return console.log(value);
    if (value === true) {
      brand.push($(this).data("brand"));
    } else {
      brand.splice(brand.indexOf($(this).data("brand")), 1);
    }
    // return console.log(brand);
    sendRequest();
  });

  $(".ram input").change(function () {
    const value = $(this).val() == "true" ? false : true;
    // return console.log(value)
    $(this).attr("value", value);
    // return console.log(value);
    if (value === true) {
      ram.push($(this).data("ram"));
    } else {
      ram.splice(ram.indexOf($(this).data("ram")), 1);
    }
    sendRequest();
  });

  $(".cashOnDevliery input").change(function () {
    cashOnDelivery = !cashOnDelivery
    sendRequest()
  })

  $(".availability input").change(function () {
    availiability = !availiability

    sendRequest()
  })

  $(".arrivals input").change(function () {
    arrival = $(this).data("arrival")

    console.log(arrival)
    sendRequest()
  })


  $(".prodDiscount input").change(function () {
    discount = $(this).data("discount");
    sendRequest();
  });

  $("body").on("click", ".pagination li", function () {
    page = $(this).data("page")
    sendRequest()
  })

  function sendRequest(page) {

    $(".product-sec1 > .row > div").html("<div style='min-height:250px'> sameh sayed </div>")

    if (brand.length > 0) {
      filter.brand = { $in: brand };
    } else {
      delete filter.brand
    }

    if (ram.length > 0) {
      filter.ram = { $in: ram };
    } else {
      delete filter.ram
    }

    if (discount > 0) {
      filter.discount = discount
    } else {
      delete filter.discount
    }

    if (availiability) {
      filter.amount = { $gt: 0 }
    } else {
      delete filter.amount
    }

    if (arrival > 0) {
      filter.arrival = arrival
    }

    if (page) {
      filter.page = page
    }

    const ourClass = 'product-sec1 px-sm-4 px-3 py-sm-5 py-3 mb-4'
    axios
      .post("/product/filter", filter)
      .then((result) => {
        parentContainer.html(" ")
        const products = result.data
        if (products.length > 0) {

          parentContainer.append(`<div class="${ourClass} first-section"> <div class="row"></div> </div>`)

          for (let i = 0; i < 3; i++) {
            if (i < products.length) {
              let prod = products[i]
              $(".first-section .row").append(productComp(prod))
            }
          }

          if (products.length > 3) {
            parentContainer.append(`<div class="${ourClass} second-section"> <div class="row"></div> </div>`)
            for (let i = 3; i < 6; i++) {
              let prod = products[i]
              if (i < products.length) {
                $(".second-section .row").append(productComp(prod))
              }
            }
          }

          if (products.length > 6) {
            parentContainer.append(`<div class="${ourClass} third-section"> <div class="row"></div> </div>`)
            for (let i = 6; i < 9; i++) {
              let prod = products[i]
              if (i < products.length) {
                $(".third-section .row").append(productComp(prod))
              }
            }
          }


          console.log(productLength)
          parentContainer.parent().append(pagination)
          $(".pagination").append(`<li class="prevPage"> <button> <i class="fas fa-angle-left"></i></button>
          </li>`)
          for (let page = 1; page <= Math.ceil(productLength / 12); page++) {
            $(".pagination").append(`<li class='${page == 1 ? 'currentPage' : ''}' data-page='${page}'> ${page}  </li>`)
          }
          $(".pagination").append(`<li class="nextPage"> <button> <i class="fas fa-angle-right"></i></button> </li>`)

        } else {
          parentContainer.html(`<div class="alert alert-danger text-capitalize"> No products yet </div>`)
        }



      })
      .catch((err) => {
        console.log(err);
      });
  }
});
