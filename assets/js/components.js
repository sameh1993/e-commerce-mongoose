// require param [ single product ] 
export const productComp = function (prod) {
    return `
    <div class="col-md-4 product-men">
    <div class="men-pro-item simpleCart_shelfItem">
        <div class="men-thumb-item text-center">
            <img src="/images/${prod.department}/${prod.images[0]}" alt="">
            <div class="men-cart-pro">
                <div class="inner-men-cart-pro">
                    <a href="/product/${prod._id}"
                        class="link-product-add-cart">Quick View</a>
                </div>
            </div>
        </div>
        <div class="item-info-product text-center border-top mt-4">
            <h4 class="pt-1">
                <a href="/product/${prod._id}"> ${prod.productName} </a>
            </h4>
            <div class="info-product-price my-2">
                <span class="item_price"> $
                  ${prod.price.$numberDecimal}

                </span>
                <del> ${prod.price.$numberDecimal} </del>
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
    `
}

// require [ productLength ]
export const pagination = function () {
    return `
    <ul class="pagination d-flex justify-content-center list-unstyled">
</ul>
    `
}