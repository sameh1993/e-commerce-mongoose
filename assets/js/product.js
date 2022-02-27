


$("document").ready(function () {
  var brand = [];
  var ram = [];
  var i;

  $(".brand input").change(function () {
    const value = $(this).val() == "true" ? false : true;
    $(this).attr("value", value);
    console.log(value);

    if (value === true) {
      brand.push($(this).data("brand"));
    } else {
      brand.splice(brand.indexOf($(this).data("brand")), 1);
    }
    sendRequest()
  });

  $(".ram input").change(function () {
    const value = $(this).val() == "true" ? false : true;

    // return console.log(value)
    $(this).attr("value", value);

    if (value === true) {
      ram.push($(this).data("ram"));
    } else {
      ram.splice(ram.indexOf($(this).data("ram")), 1);
    }
    sendRequest()
  });

  function sendRequest() {

    var filter = JSON.parse($(".param").val());

    if (brand) {
      filter.brand = brand
    }

    if (ram) {
      filter.ram = ram
    }

    axios.post("/api/filter-product", filter).then(result => {
      const products = result.data
      if (products) {
        const firstSection = $(".first-section .row")
        const secondSection = $(".socend-section .row")
        const thirdSection = $(".third-section .row")
        const fourSection = $(".fourth-section .row")
        firstSection.html("")
        secondSection.html("")
        thirdSection.html("")
        fourSection.html("")
        for (i = 0; i < 3; i++) {
          firstSection.append(`
            <div class="col-md-4 product-men">
              <div class="men-pro-item simpleCart_shelfItem">
                <div class="men-thumb-item text-center">
                  <img src="/images/${products[i].category}/${products[i].images[0]}"
                    alt="">
                  <div class="men-cart-pro">
                    <div class="inner-men-cart-pro">
                      <a href="/product/${products[i]._id}"
                        class="link-product-add-cart">Quick View</a>
                    </div>
                  </div>
                </div>
                <div class="item-info-product text-center border-top mt-4">
                  <h4 class="pt-1">
                    <a href="/product/${products[i]._id}">
                      <%= products[i].productName %> </a>
                  </h4>
                  <div class="info-product-price my-2">
                    <span class="item_price"> $
                      ${products[i].price - ((products[i].price * products[i].discount) / 100)}
                    </span>
                    <del> ${products[i].price} </del>
                  </div>
                  <div
                    class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                    <form action="#" method="post">
                      <fieldset>
                        <input type="hidden" name="cmd" value="_cart" />
                        <input type="hidden" name="add" value="1" />
                        <input type="hidden" name="business" value=" " />
                        <input type="hidden" name="item_name"
                          value="Samsung Galaxy J7" />
                        <input type="hidden" name="amount" value="200.00" />
                        <input type="hidden" name="discount_amount" value="1.00" />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input type="hidden" name="return" value=" " />
                        <input type="hidden" name="cancel_return" value=" " />
                        <input type="submit" name="submit" value="Add to cart"
                          class="button btn" />
                      </fieldset>
                    </form>
                  </div>

                </div>
              </div>
            </div>
            `)
        }
      }

    }).catch(err => {
      console.log("not found products")
    })

  }

});
