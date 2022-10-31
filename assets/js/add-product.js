
$(document).ready(function () {

    const departments = JSON.parse($(".departs").val())
    const departElement = $(".department")
    var categElement = $(".categories")
    var multiOptions = $(".multi-select .options")
    var categories = new Array()

    departElement.change(function () {
        const currDepart = departments.filter(item => item.name == $(this).val())
        // var types = []
        // console.log(currDepart)
        multiOptions.html(" ")
        for (let item of currDepart[0].categories) {
            multiOptions.append(`<li> <i data-value="${item.categName}" class="far fa-square"></i> ${item.categName} </li>`)
            // types = types.concat(item.types)
        }
        // function onlyUnique(value, index, self) {
        //     return self.indexOf(value) === index;
        // }
        // types = types.filter(onlyUnique)
        const typeSelect = $(".type")
        typeSelect.html(` `)
        typeSelect.html(`<option selected>  select product type </option>`)
        // return console.log(currDepart)
        for (let item of currDepart[0].mainParts) {
            typeSelect.append(`<option value="${item}"> ${item} </option>`)
        }
        currentCategory = []
    })



    $(".category").change(function () {
        // return console.log($(this).val())
        let outTypes = types.filter(item => item.category == $(this).val())

        $(".type").html("<option selected>  Select Type </option>")
        for (let item of outTypes) {
            console.log(item)
            $(".type").append(`<option value='${item.type}'> ${item.name} </option>`)
        }
    })

    // render options in view section
    function renderCateges(categories) {
        const parent = $(".multi-select .view")
        for (let item of categories) {
            parent.append(`<span> ${item} <i class="fa fa-times"></i> </span>`)
        }
    }

    $("body").on("click", ".options i", function () {
        const views = $(".multi-select .view")
        $(this).toggleClass("fas fa-check-square far fa-square")
        $(this).parent().toggleClass("active")
        const item = $(this).data("value")
        if (categories.includes(item)) {
            views.find(`.${item}`).parent().fadeOut(300)
            categories.splice(categories.indexOf(item), 1)
            if (categories.length <= 0) {
                views.html('No Items Selected')
            }
            $(".category").attr('value', JSON.stringify(categories))
            console.log()
        } else {
            if (categories.length <= 0) {
                views.html(" ")
            }
            categElement.attr("value", categories)
            categories.push($(this).data("value"))
            $(".multi-select .view").append(`<span> ${item} <i class="fa fa-times ${item}" data-value="${item}"></i>  </span>`)
            $(".category").attr('value', JSON.stringify(categories) || 'sameh')
        }
        console.log(categories)
    })


    // delete category item 
    $("body").on("click", ".fa-times", function () {
        let item = $(this).data("value")
        categories.splice(item, 1)
        $(this).parent().addClass("hidden")
        $(".options").find(`[data-value='${item}']`).toggleClass("fas fa-check-square far fa-square")
        if (categories.length == 0) {
            $(".multi-select .views").html('No Item Selected')
        }
    })

    $("body").niceScroll();

})