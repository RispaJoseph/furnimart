(function ($) {
  "use strict";
  /*Product Details*/
  var productDetails = function () {
    $(".product-image-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      asNavFor: ".slider-nav-thumbnails",
    });

    $(".slider-nav-thumbnails").slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: ".product-image-slider",
      dots: false,
      focusOnSelect: true,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="fi-rs-angle-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="fi-rs-angle-right"></i></button>',
    });

    // Remove active class from all thumbnail slides
    $(".slider-nav-thumbnails .slick-slide").removeClass("slick-active");

    // Set active class to first thumbnail slides
    $(".slider-nav-thumbnails .slick-slide").eq(0).addClass("slick-active");

    // On before slide change match active thumbnail to current slide
    $(".product-image-slider").on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        var mySlideNumber = nextSlide;
        $(".slider-nav-thumbnails .slick-slide").removeClass("slick-active");
        $(".slider-nav-thumbnails .slick-slide")
          .eq(mySlideNumber)
          .addClass("slick-active");
      }
    );

    $(".product-image-slider").on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        var img = $(slick.$slides[nextSlide]).find("img");
        $(".zoomWindowContainer,.zoomContainer").remove();
        $(img).elevateZoom({
          zoomType: "inner",
          cursor: "crosshair",
          zoomWindowFadeIn: 500,
          zoomWindowFadeOut: 750,
        });
      }
    );
    //Elevate Zoom
    if ($(".product-image-slider").length) {
      $(".product-image-slider .slick-active img").elevateZoom({
        zoomType: "inner",
        cursor: "crosshair",
        zoomWindowFadeIn: 500,
        zoomWindowFadeOut: 750,
      });
    }
    //Filter color/Size
    $(".list-filter").each(function () {
      $(this)
        .find("a")
        .on("click", function (event) {
          event.preventDefault();
          $(this).parent().siblings().removeClass("active");
          $(this).parent().toggleClass("active");
          $(this)
            .parents(".attr-detail")
            .find(".current-size")
            .text($(this).text());
          $(this)
            .parents(".attr-detail")
            .find(".current-color")
            .text($(this).attr("data-color"));
        });
    });
    //Qty Up-Down
    $(".detail-qty").each(function () {
      var qtyval = parseInt($(this).find(".qty-val").text(), 10);
      $(".qty-up").on("click", function (event) {
        event.preventDefault();
        qtyval = qtyval + 1;
        $(this).prev().text(qtyval);
      });
      $(".qty-down").on("click", function (event) {
        event.preventDefault();
        qtyval = qtyval - 1;
        if (qtyval > 1) {
          $(this).next().text(qtyval);
        } else {
          qtyval = 1;
          $(this).next().text(qtyval);
        }
      });
    });

    $(".dropdown-menu .cart_list").on("click", function (event) {
      event.stopPropagation();
    });
  };
  /* WOW active */
  new WOW().init();

  //Load functions
  $(document).ready(function () {
    productDetails();
  });
})(jQuery);





// // Add to cart functionality
// $("#add-to-cart-btn").on("click", function () 
// {
//   // let quantity = $("input[name='product-quantity']").val();
//   let quantity = $("#product-quantity").val();
//   let product_title = $(".product-title").val();
//   let product_id = $(".product-id").val();
//   let product_price = $(".current-product-price1").text();

//   // let product_price = $(".product-price").text();
//   // console.log("Price:", product_price);
//   // let product_image = $(".product-image-slider").val();
//   // let product_pid = $(".product-id").val();

//   let product_image = $(".product-image-sliderr img:first").attr("src");
//   // let product_pid = $(".product-image-sliderr figure:first").data("pid");
//   let product_pid = $(".product-pid").val();

//   let this_val = $(this);


//   console.log("Quantity:", quantity);
//   console.log("Title:", product_title);
//   console.log("Price:", product_price);
//   console.log("ID:", product_id);
//   console.log("PID:",product_pid);
//   console.log("Image:",product_image);
//   console.log("Current Element :", this_val);

//   $.ajax({
//     url: "/add_to_cart/",
//     data: {
//       id: product_id,
//       pid: product_pid,
//       image: product_image,
//       qty: quantity,
//       title: product_title,
//       price: product_price,
//     },
//     dataType: "json",
//     beforeSend: function () {
//       console.log("Adding Product to Cart...");
//     },
//     success: function (res) {
//       this_val.html("Item added to cart"); // Update button text
//       console.log("Added Product to cart!");
//       $(".cart-items-count").text(res.totalcartitems)
//     },
//     error: function (err) {
//       console.error("Error adding product to cart:", err);
//     },
//   });
// });




$("#add-to-cart-btn").on("click", function () {
  
  let this_val = $(this);
  let index = this_val.attr("data-index");
  let quantity = $(".product-quantity-" + index).val();

  let product_title = $(".product-title-" + index).val();
  let product_id = $(".product-id-" + index).val();
  let product_price = parseFloat($(".current-product-price-" + index).text());
  let product_pid = $(".product-pid-" + index).val();
  let product_image = $(".product-image-" + index).val();

  console.log("quantity:", quantity);
  console.log("title:", product_title);
  console.log("id:", product_id);
  console.log("pid:", product_pid);
  console.log("image:", product_image);
  console.log("price:", product_price);
  console.log("Current element:", this_val);

  $.ajax({
      url: '/add_to_cart',
      data: {
          'id': product_id,
          'pid': product_pid,
          'image': product_image,
          'qty': quantity,
          'title': product_title,
          'price': product_price,
      },
      dataType: 'json',
      beforeSend: function () {
          console.log("adding product to cart...");
      },
      success: function (response) {
          console.log(response);
          if (response.already_in_cart) {
              this_val.html("Already");
          } else {
              this_val.html("Added ✔");
          }
          console.log("Added Product to Cart");
          $(".cart-items-count").text(response.totalcartitems);
      }
  });
});



$(".button-add-to-cart").on("click", function () {
  let button = $(this);
  let productContainer = button.closest('tr');
  let index = button.attr("data-index");

  let quantity = productContainer.find(".product-quantity-" + index).val();
  let product_title = productContainer.find(".product-title-" + index).val();
  let product_id = productContainer.find(".product-id-" + index).val();
  let product_price = parseFloat(productContainer.find(".current-product-price-" + index).text());
  let product_pid = productContainer.find(".product-pid-" + index).val();
  let product_image = productContainer.find(".product-image-" + index).val();

  console.log("Quantity:", quantity);
  console.log("Title:", product_title);
  console.log("ID:", product_id);
  console.log("PID:", product_pid);
  console.log("Image:", product_image);
  console.log("Price:", product_price);
  console.log("Current Element:", button);

  $.ajax({
      url: '/add_to_cart',
      data: {
          'id': product_id,
          'pid': product_pid,
          'image': product_image,
          'qty': quantity,
          'title': product_title,
          'price': product_price,
      },
      dataType: 'json',
      beforeSend: function () {
          console.log("Adding product to cart...");
      },
      success: function (response) {
          console.log(response);
          if (response.already_in_cart) {
              button.html("Already");
          } else {
              button.html("Added ✔");
          }
          console.log("Added Product to Cart");
          $(".cart-items-count").text(response.totalcartitems);
      }
  });
});



$(".delete-product").on("click", function(){

  let product_id = $(this).attr("data-product")
  let this_val = $(this)

  console.log("Product ID:", product_id);
  $.ajax({
      url: "/delete-from-cart",
      data: {
        "id": product_id
      },
      dataType: "json",
      beforeSend: function(){
        this_val.hide()
      },
      success: function(response){
        this_val.show()
        $("#cart-list").html(response.data)
      }
  })
})








$(".update-product").on("click", function(){
  let product_id = $(this).attr("data-product");
  let this_val = $(this);
  let product_quantity = $(".product-qty-" + product_id).val();

  console.log("Product ID:", product_id);
  console.log("Product QTY:", product_quantity);

  $.ajax({
      url: "/update-cart",
      data: {
        "id": product_id,
        "qty": product_quantity,
      },
      dataType: "json",
      beforeSend: function(){
        this_val.hide()
      },
      success: function(response){
        this_val.show();
        $("#cart-list").html(response.data);
      }
  });
});



// $(document).on("click", ".add-to-wishlist", function(){
//   let product_id = $(this).attr("data-product-item")
//   let this_val = $(this)

//   console.log("PRODUCT ID IS", product_id)

//   $.ajax({
//     url: "add-to-wishlist/",
//     data: {
//       "id":product_id
//     },
//     dataType: "json",
//     beforeSend: function{
//       this_val.html("✓")
//     },
//     success: function{
//       console.log("Added to wishlist")
//     }
      
//   })
// })


$(document).on("click", ".add-to-wishlist", function(){
  let product_id = $(this).attr("data-product-item");
  let this_val = $(this);

  console.log("PRODUCT ID IS", product_id);

  $.ajax({
    url: "/add-to-wishlist",
    data: {
      "id": product_id
    },
    dataType: "json",
    beforeSend: function() {
      console.log("Adding to wishlist..")
    },
    success: function(response) {
      this_val.html("✓");
      if (response.bool === true){
        console.log("Added to wishlist");
      }
    }
  });
});



// Remove from wishlist
$(document).on("click", ".delete-wishlist-product", function(){
  let wishlist_id = $(this).attr("data-wishlist-product")
  let this_val = $(this)

  console.log("wishlist id is:", wishlist_id);

  $.ajax({
    url:"/remove-from-wishlist/",
    data:{
        "id": wishlist_id
   },
   dataType: "json",
   beforeSend: function(){
    console.log("Deleting product from wishlist...");
   },
   success: function(response){
    $("#wishlist-list").html(response.data)
    
   },
   
})
})


// Making default address

// $(document).on("click", ".make-default-address", function(){
//   let this_val = $(this);
//   let id = this_val.attr("data-address-id");  
  
//   console.log("ID is:", id);
//   console.log("Element is:", this_val);


//   $.ajax({
//       url:"/make-default-address",
//       data:{
//           "id":id
//       },
//       dataType:"json",
//       success: function(response){
//           console.log("Address made default...");
//           if (response.boolean == true){
//               $(".check").hide()
//               $(".action_btn").show()

//               $(".check"+id).show()
//               $(".button"+id).hide()
//           }
//       }

//   })
// });


$(document).on("click", ".make-default-address", function(){
  let this_val = $(this);
  let id = this_val.attr("data-address-id");  
  
  console.log("ID is:", id);
  console.log("Element is:", this_val);

  $.ajax({
    url: "/make-default-address/",
    data: {
      "id": id
    },
    dataType: "json",
    success: function(response){
      console.log("Address made default...");
      if (response.boolean == true){
        // Hide all checkmarks and show all buttons
        $(".fa-check-circle").hide();
        $(".make-default-address").show();

        // Show checkmark and hide button for the selected address
        $(".check" + id).show();
        $(".button" + id).hide();
      }
    }
  });
});

