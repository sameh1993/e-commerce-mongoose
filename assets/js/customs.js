


$("document").ready(function () {


    var discount = 0;
    var myTypes = []

    $(".discount input").change(function () {

        if ($(this).val() == true) {
            $(this).attr("value", false)
        }

        discount = $(this).data('discount')

        fetchData()
    })

    $(".types input").change(function () {
        const value = $(this).val() == 'true' ? false : true
        $(this).attr("value", value)
        console.log(value)

        if (value === true) {
            myTypes.push($(this).data("type"))
        } else {
            myTypes.splice(myTypes.indexOf($(this).data('type')), 1)
        }
        fetchData()
    })


    function fetchData() {

        const filterMobiles = { category: 'mobiles' }
        const filterTvScreen = { category: 'tv, screen' }
        const filterHousehold = { category: 'household appliance' }
        let price = JSON.parse($(".url").val())

        if (discount > 0) {
            filterMobiles.discount = { $lte: discount }
            filterTvScreen.discount = { $lte: discount }
            filterHousehold.discount = { $lte: discount }
        }

        if (myTypes.length > 0) {
            filterMobiles.type = { $in: myTypes }
            filterTvScreen.type = { $in: myTypes }
            filterHousehold.type = { $in: myTypes }
        }

        if (price) {
            if (price.includes("&")) {
                const splitIt = price.split("&")
                price = {
                    $gt: +splitIt[0],
                    $lt: +splitIt[1]
                }
            } else if (price == 1000) {
                price = {
                    $lte: +price
                }
            } else {
                price = {
                    $gte: +price
                }
            }
        }


        const filter = { filterMobiles, filterTvScreen, filterHousehold, price }
        if (price) {
            filter.price = price
        }
        axios.post("/api/filter-product", filter).then(result => {
            console.log(result)
            const msg = `<div class="alert alert-danger text-center w-100 d-block mt-3"> there are not found products yet </div>`
            if (result.data.mobiles.length > 0) {
                $(".mobiles .row").html("")
                for (let prod of result.data.mobiles) {
                    $(".mobiles .row").append(`
                                <div class=" col-md-4 product-men mt-5">
    
                                <div class="men-pro-item simpleCart_shelfItem">
                                    <div class="men-thumb-item text-center">
                                        <img src="/images/${prod.category}/${prod.images[0]}" alt="">
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
                                                ${prod.price - ((prod.price * prod.discount) / 100)}
                                            </span>
                                            <del> ${prod.price} </del>
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
            } else {
                $(".mobiles .row").html(msg)
            }

            if (result.data.tv.length > 0) {
                $(".tvScreen .row").html("")
                for (let prod of result.data.tv) {
                    $(".tvScreen .row").append(`
                                <div class=" col-md-4 product-men mt-5">
    
                                <div class="men-pro-item simpleCart_shelfItem">
                                    <div class="men-thumb-item text-center">
                                        <img src="/images/${prod.category}/${prod.images[0]}" alt="">
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
                                                ${prod.price - ((prod.price * prod.discount) / 100)}
                                            </span>
                                            <del> ${prod.price} </del>
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
            } else {
                $(".tvScreen .row").html(msg)
            }
            if (result.data.houseHold.length > 0) {
                $(".houseapplince .row").html("")
                for (let prod of result.data.houseHold) {
                    $(".houseapplince .row").append(`
                                <div class=" col-md-4 product-men mt-5">
    
                                <div class="men-pro-item simpleCart_shelfItem">
                                    <div class="men-thumb-item text-center">
                                        <img src="/images/${prod.category}/${prod.images[0]}" alt="">
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
                                                ${prod.price - ((prod.price * prod.discount) / 100)}
                                            </span>
                                            <del> ${prod.price} </del>
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
            } else {
                $(".houseapplince .row").html(msg)
            }
        })

    }


    $(".confirmPass, .custom-control-input").change(function () {
        const password = $(".password").val()
        const confirmPass = $(".confirmPass").val()
        const checked = $(".custom-control-input").val()

        if (password == confirmPass && checked) {
            $(".register").attr("disabled", false)
        } else {
            $(".register").attr("disabled", true)
        }
    })



    // registeration user
    $("button.register").click(function (e) {
        e.preventDefault()

        const parent = $(this).parents(".form-register")

        const data = {
            name: parent.find(".name").val(),
            email: parent.find(".email").val(),
            password: parent.find(".password").val(),
        }

        axios.post("/api/auth/signup", data).then(result => {
            if (result.data.err) {
                $(".modal-body .alert-danger.register").html(result.data.err).slideDown(200)
            } else {
                $("#exampleModal2, .modal-backdrop").removeClass("show d-block-modal")
                $(".message").html("welcome form jquery").addClass("active")
            }
        }).catch(err => {
            console.log(err)
        })
    })

    var isAuth = $(".isAuth")

    // login user
    $("button.login").on("click", function (e) {
        e.preventDefault()
        const parent = $(this).parents(".form-login")
        const data = {
            email: parent.find(".email").val(),
            password: parent.find(".password").val()
        }
        axios.post("/api/auth/login", data).then(result => {
            console.log(result)
            if (result.data.err) {
                $(".modal .alert-danger.login").html(result.data.err).slideDown(300)
            } else {
                $(".register").hide()
                $(".links").append(`
                    <li class="text-center text-white logout">
                        <i class="fas fa-sign-out-alt mr-2"></i> Log Out
                    </li>
                `)
                $(".modal").hide()
                $(".message").addClass("alert-info").html("user is logged").slideDown(700, function () {
                    $(this).delay(4000).slideUp(500)
                })
                $(".d-none").addClass("d-block").removeClass("d-none")
                isAuth.attr("value", result.data.id)
            }
        }).catch(err => {
            console.log(err)
        })
    })

    $(".header-right ul li.logout").click(function () {
        console.log('clicked me')
    })

    $(".tittle-w3l button, .fa-cart-arrow-down").on("click", function () {
        console.log("sameh")
    })

    $(document).on("click", ".logout", function () {
        axios.get("/api/auth/logout").then(result => {
            if (result.data.err) {
                $(".message").html(result.data.err).addClass("alert-danger")
            } else {
                $(".logout").hide()
                $(".links").append(`
                        <li class="text-center border-right text-white register">
                            <a href="#" data-toggle="modal" data-target="#exampleModal" class="text-white">
                                <i class="fas fa-sign-in-alt mr-2"></i> Log In </a>
                        </li>
                        <li class="text-center text-white register">
                            <a href="#" data-toggle="modal" data-target="#exampleModal2" class="text-white">
                                <i class="fas fa-sign-out-alt mr-2"></i>Register </a>
                        </li>`)
                $(".d-block").removeClass("d-block").addClass("d-none")
                $(".message").addClass("alert-info").html("user is logout").slideDown(700, function () {
                    $(this).delay(4000).slideUp(500)
                })
                isAuth.attr("value", "")
            }
        }).catch(err => {
            console.log(err)
        })
    })

    console.log(typeof isAuth, isAuth.val())

    $(".w3view-cart, .w3view-cart i").click(function () {
        console.log(isAuth.val())
        if (isAuth.val()) {
            paypals.minicarts.view.show()
        } else {
            $(".message").addClass("alert-info").html("you must be logged in and try again").slideDown(700, function () {
                $(this).delay(4000).slideUp(500)
            })
        }

    })

    // to delete slide of sliders
    $(".carousel-inner .fa-trash").click(function () {

        var test = document.getElementById("slider").getAttribute("data-array") // test is now a valid js object

        const id = $(this).data("id")

        axios.get("/api/slider/delete/" + id).then(result => {
            if (result.data.deletedCount) {
                const slider = JSON.parse(test).filter(function (item) { item._id != id })
                console.log(slider)
                slider.entries((index, element) => {
                    $(".carousel-indicators").html(
                        `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="${index == 0 ? 'active' : ''}"></li>`
                    )
                    $(".carousel-inner").html(
                        `<div style="background-image: url('/images/${element.image}')" class="carousel-item item${index + 1} ${index === 0 ? 'active' : ''}">
                            <i data-id="<%= slider[i]._id %>" class="fa fa-trash"></i>
                            <div class="container">
                                <div class="w3l-space-banner">
                                    <div class="carousel-caption p-lg-5 p-sm-4 p-3">
                                        <p>  ${element.subTitle} </p>
                                        <h3 class="font-weight-bold pt-2 pb-lg-5 pb-4">
                                        ${element.title}
                                        </h3>
                                        <a class="button2" href="/product/">Shop Now </a>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    )
                })
            }
        }).catch(err => {
            console.log(err)
        })
    })

    //******* / slider  **********/
    //**************************** */
    $(".fa-trash").click(function () {
        const sliderId = $(this).data("id")

        axios.get(`/api/slider/delete/${sliderId}`).then(result => {

        })
    })

    // add a new description
    $(".body .btn-primary").click(function () {
        $(this).parent(".parent-input").append("<input name='description'  placeholder='attribute: description' type='text' class='form-control mt-3'>")
    })

    // add a new description
    $(".body .btn-primary").click(function () {
        $(this).parent(".parent-about").append("<input name='about'  placeholder='attribute: description' type='text' class='form-control mt-3'>")
    })

    $(".form-control.images").change(function (e) {
        for (let item of e.target.files) {
            const url = URL.createObjectURL(item)
            $(".view-image").append(`<div class="img">
                                        <img src="${url}" class="img-fluid">
                                        <i class="fa fa-window-close"></i>
                                    </div>`)
        }
    })

    $(".edit-product .view-image .img i").click(function () {
        const url = $(this).siblings("img").attr('src')
        $(".parent-input").append(`<input type='hidden' value='${url}' name='removeImages'> `)
        $(this).parent(".img").remove();
    })



    let imagefile = {}

    $(".fixed .content .image").change(function (e) {
        imagefile = e.target.files[0]
        console.log(imagefile)

    })

    $(".fixed > .fa").click(function () { $(this).parents(".fixed").fadeOut(500) })
    $(".carousel .fa-plus").click(function () { $(".fixed").fadeIn(700) })

    $(".fixed .content .btn").click(function (e) {
        e.preventDefault()
        $(this).parents(".fixed").fadeOut(300)
        const parent = $(this).parent(".form")

        const formDate = new FormData();
        formDate.append("image", imagefile)
        formDate.append("title", parent.find(".title").val())
        formDate.append("subTitle", parent.find(".subtitle").val())
        formDate.append("image", imagefile.name)

        // return console.log(formDate)
        axios.post('/api/slider/add', formDate, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            const data = result.data
            $(".carousel-indicators").append(
                `<li data-target="#carouselExampleIndicators" data-slide-to="${data.length}"></li>`
            )

            $(".carousel-inner").append(`
            <div style="background-img: url('/assets/images/${data.image}')" class="carousel-item item1">
            <div class="container">
                <div class="w3l-space-banner">
                    <div class="carousel-caption p-lg-5 p-sm-4 p-3">
                        <p> ${data.subTitle} </p>
                        <h3 class="font-weight-bold pt-2 pb-lg-5 pb-4">
                            ${data.title}
                        </h3>
                        <a class="button2" href="/product/">Shop Now </a>
                    </div>
                </div>
            </div>
        </div>
            `)
        }).catch(err => {
            console.log(err)
        })

    })


    // add a new product to cart
    $(".add-cart").click(function () {

        console.log("sameh")

        const parent = $(this).parents(".form-data")
        const data = { "discount_amount": +parent.find(".discount").val(), "item_name": parent.find(".productName").val(), "amount": +parent.find(".amount").val(), "currency_code": "EGP" }
        paypals.minicarts.cart.add(data)
        // paypals.minicarts.cart.add(data)

        console.log(data)
    })




    /* =================================================
       =============== ckeckout page ==================== */

    $(".submit").click(function () {
        const parent = $(this).parents(".creditly-card-form")

        let data = {
            street: parent.find(".street").val(),
            phoneNo: parent.find(".phoneNo").val(),
            landmark: parent.find(".landmark").val(),
            addressType: parent.find(".addressType").val()
        }

        console.log(data)
    })


})