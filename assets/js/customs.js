import { productComp } from "./components.js";

$("document").ready(function () {

  var discount = 0;
  var myTypes = [];

  $(".discount input").change(function () {

    discount = $(this).data("discount");

    fetchData();
  });

  function fetchData() {
    const filter = JSON.parse($(".query").val())

    if (discount > 0) {
      filter.mobile.discount = { $lte: discount };
      filter.tvScreen.discount = { $lte: discount };
      filter.houseHold.discount = { $lte: discount };
    }

    console.log(filter)

    axios.post("/api/filter-product", filter).then((result) => {
      const products = result;
      console.log(products.data.mobiles[0].price.$numberDecimal)
      const msg = `<div class="alert alert-danger text-center w-100 d-block mt-3"> there are not found products yet </div>`;
      if (result.data.mobiles.length > 0) {
        $(".mobiles .row").html("");
        for (let prod of result.data.mobiles) {
          $(".mobiles .row").append(productComp(prod));
        }
      } else {
        $(".mobiles .row").html(msg);
      }

      if (result.data.tv.length > 0) {
        $(".tvScreen .row").html("");
        for (let prod of result.data.tv) {
          $(".tvScreen .row").append(productComp(prod));
        }
      } else {
        $(".tvScreen .row").html(msg);
      }
      if (result.data.houseHold.length > 0) {
        $(".houseapplince .row").html("");
        for (let prod of result.data.houseHold) {
          $(".houseapplince .row").append(productComp(prod));
        }
      } else {
        $(".houseapplince .row").html(msg);
      }
    });
  }

  $(".confirmPass, .custom-control-input").change(function () {
    const password = $(".password").val();
    const confirmPass = $(".confirmPass").val();
    const checked = $(".custom-control-input").val();

    if (password == confirmPass && checked) {
      $(".register").attr("disabled", false);
    } else {
      $(".register").attr("disabled", true);
    }
  });

  // registeration user
  $("button.register").click(function (e) {
    e.preventDefault();

    const parent = $(this).parents(".form-register");

    const data = {
      name: parent.find(".name").val(),
      email: parent.find(".email").val(),
      password: parent.find(".password").val(),
    };

    axios
      .post("/api/auth/signup", data)
      .then((result) => {
        if (result.data.err) {
          $(".modal-body .alert-danger.register")
            .html(result.data.err)
            .slideDown(200);
        } else {
          $("#exampleModal2, .modal-backdrop").removeClass(
            "show d-block-modal"
          );
          $(".message").html("welcome form jquery").addClass("animate__animated animate__bounce");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  var isAuth = $(".isAuth");

  // login user
  $("button.login").click(function (e) {
    e.preventDefault();
    const parent = $(this).parents(".form-login");
    const data = {
      email: parent.find(".email").val(),
      password: parent.find(".password").val(),
    };
    axios
      .post("/api/auth/login", data)
      .then((result) => {
        console.log(result);
        if (result.data.err) {
          $(".modal .alert-danger.login").html(result.data.err).slideDown(300);
        } else {
          $(".register").hide();
          $(".logout").show();
          $("body").removeClass("modal-open");
          $(".modal").hide();
          $(".message")
            .addClass("alert-info")
            .html("user is login")
            .slideDown(700, function () {
              $(this).delay(4000).slideUp(500);
            });
          $(".d-none").addClass("d-block").removeClass("d-none");
          isAuth.attr("value", result.data.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });


  $(document).on("click", ".logout", function () {
    axios
      .get("/api/auth/logout")
      .then((result) => {
        if (result.data.err) {
          $(".message").html(result.data.err).addClass("alert-danger");
        } else {
          $(".logout").hide();
          $(".links").append(`
                        <li class="text-center border-right text-white register">
                            <a href="#" data-toggle="modal" data-target="#exampleModal" class="text-white">
                                <i class="fas fa-sign-in-alt mr-2"></i> Log In </a>
                        </li>
                        <li class="text-center text-white register">
                            <a href="#" data-toggle="modal" data-target="#exampleModal2" class="text-white">
                                <i class="fas fa-sign-out-alt mr-2"></i>Register </a>
                        </li>`);
          $(".d-block").removeClass("d-block").addClass("d-none");
          $(".message")
            .addClass("alert-info")
            .html("user is logout")
            .slideDown(700, function () {
              $(this).delay(4000).slideUp(500);
            });
          isAuth.attr("value", "");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  $(".w3view-cart, .w3view-cart i").click(function () {
    console.log(isAuth.val());
    if (isAuth.val()) {
      paypals.minicarts.view.show();
    } else {
      $(".message")
        .addClass("alert-info")
        .html("you must be logged in and try again")
        .slideDown(700, function () {
          $(this).delay(4000).slideUp(500);
        });
    }
  });

  // to delete slide of sliders
  $(".carousel-inner .fa-trash").click(function () {
    var test = document.getElementById("slider").getAttribute("data-array"); // test is now a valid js object

    const id = $(this).data("id");

    axios
      .get("/api/slider/delete/" + id)
      .then((result) => {
        if (result.data.deletedCount) {
          const slider = JSON.parse(test).filter(function (item) {
            item._id != id;
          });
          console.log(slider);
          slider.entries((index, element) => {
            $(".carousel-indicators").html(
              `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="${index == 0 ? "active" : ""
              }"></li>`
            );
            $(".carousel-inner").html(
              `<div style="background-image: url('/images/${element.image
              }')" class="carousel-item item${index + 1} ${index === 0 ? "active" : ""
              }">
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
            );
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //******* / slider  **********/
  //**************************** */
  $(".fa-trash").click(function () {
    const sliderId = $(this).data("id");

    axios.get(`/api/slider/delete/${sliderId}`).then((result) => { });
  });

  // add a new description
  $(".description .describe").click(function () {
    $(this).parent(".details").find(".parent-about").append(`<div class="about">
        <input placeholder="enter description" name="description" type="text"
            class="form-control" />
        <i class="fa fa-times"></i>
    </div>`);
  });

  // add a new description
  $(".about .describe").click(function () {
    $(this).parent(".details").find(".parent-about").append(`<div class="about">
            <input placeholder="enter information" name="about" type="text"
            class="form-control" />
            <i class="fa fa-times"></i>
        </div>`);
  });

  $("body").on("click", ".about .fa-times", function () {
    $(this).parent().remove();
  });

  $(".form-control.images").change(function (e) {
    for (let item of e.target.files) {
      const url = URL.createObjectURL(item);
      $(".view-image").append(`<div class="img">
                                        <img src="${url}" class="img-fluid">
                                        <i class="fa fa-window-close"></i>
                                    </div>`);
    }
  });

  $(".edit-product .view-image .img i").click(function () {
    const url = $(this).siblings("img").attr("src");
    $(".parent-input").append(
      `<input type='hidden' value='${url}' name='removeImages'> `
    );
    $(this).parent(".img").remove();
  });

  let imagefile = {};

  $(".fixed .content .image").change(function (e) {
    imagefile = e.target.files[0];
    console.log(imagefile);
  });

  $(".fixed > .fa").click(function () {
    $(this).parents(".fixed").fadeOut(500);
  });
  $(".carousel .fa-plus").click(function () {
    $(".fixed").fadeIn(700);
  });

  $(".fixed .content .btn").click(function (e) {
    e.preventDefault();
    $(this).parents(".fixed").fadeOut(300);
    const parent = $(this).parent(".form");

    const formDate = new FormData();
    formDate.append("image", imagefile);
    formDate.append("title", parent.find(".title").val());
    formDate.append("subTitle", parent.find(".subtitle").val());
    formDate.append("image", imagefile.name);

    // return console.log(formDate)
    axios
      .post("/api/slider/add", formDate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        const data = result.data;
        $(".carousel-indicators").append(
          `<li data-target="#carouselExampleIndicators" data-slide-to="${data.length}"></li>`
        );

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
            `);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // add a new product to cart
  $(".add-cart").click(function () {
    const parent = $(this).parents(".form-data");
    const data = {
      discount_amount: +parent.find(".discount").val(),
      item_name: parent.find(".productName").val(),
      amount: +parent.find(".amount").val(),
      currency_code: "EGP",
    };
    paypals.minicarts.cart.add(data);
    // paypals.minicarts.cart.add(data)

    console.log(data);
  });

  /* =================================================
       =============== ckeckout page ==================== */

  $(".prevPage").click(function () {
    console.log("prev page");
    $(".currentPage").prev().find("form").submit();
  });

  $(".nextPage").click(function () {
    console.log("prev page");
    $(".currentPage").next().find("form").submit();
  });
});
