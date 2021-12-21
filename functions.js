function systemMessage(message, className) {
  $(
    "<p id='systemMessage' class='" + className + "' >" + message + "</p>"
  ).insertAfter("#header");

  setTimeout(function () {
    $("#systemMessage").remove();
  }, 8000);
}

function renderProducts(
  container,
  category,
  displaySubCat = true,
  hotOnly = false,
  showNewIcon = true,
  showHotIcon = true
) {
  $.getJSON(category + ".json", function (json) {
    for (var index in json) {
      const item = json[index];

      displaySubCat &&
        container.append(
          '<span class="product-item-hr">' + item.subCat + "</span>"
        );

      const products = hotOnly ? item.items.filter((i) => i.hot) : item.items;

      for (var productIndex in products) {
        const product = products[productIndex];
        container.append(
          '<a class="product-item' +
            (product.new && showNewIcon ? " new" : "") +
            (product.hot && showHotIcon ? " hot" : "") +
            '"' +
            (product.fitment ? ' filtertags="' + product.fitment + '"' : "") +
            ' onclick=buyHardware(this,"' +
            category +
            '");' +
            (product.spec ? ' colors="' + product.spec + '"' : "") +
            ">" +
            '<figure><img class="product-item-image"' +
            'src="' +
            category +
            "/" +
            (product.brand + product.title)
              .replace(/[^a-z0-9]/gi, "")
              .toLowerCase() +
            (product.spec
              ? "_" + product.spec.replace(/[^a-z0-9]/gi, "").toLowerCase()
              : "") +
            '.jpg" />' +
            "</figure>" +
            '<label class="product-item-brand">' +
            product.brand +
            "</label>" +
            '<label class="product-item-title">' +
            product.title +
            "</label>" +
            '<span class="product-item-info"' +
            ">" +
            product.info +
            "</span>" +
            '<div class="product-item-buy">' +
            (product.oldPrice
              ? '<div class="product-item-oldprice">' +
                "€" +
                product.oldPrice.toFixed(2) +
                "</div>"
              : "") +
            '<div class="product-item-price">€' +
            product.price.toFixed(2) +
            "</div>" +
            "</div>" +
            "</a>"
        );
      }
    }
  });
}

function buyNectar(element) {
  if (
    accessNeeded(function () {
      buyNectar(element);
    })
  ) {
    return false;
  }

  var productTitle, productHeadInfo, productTags, imgUrl;

  productTitle = $(element).children(".nectarName").html();
  productHeadInfo = $(element).children(".nectarInfo").html();
  productTags = $(element).attr("props").replace(/ /g, " • ");
  imgUrl = $(element).find("img.nectarFlask").attr("src");

  openMenu(false);
  $("#pageLoader").show();
  $("#pageLoader").html("loading <b>" + productTitle + "</b>");
  $("#pageContent").hide();
  $("#scrollContent").scrollTop(0);

  //var nectarSimpleString = productTitle.replace(/[^a-z0-9]/gi,'').toLowerCase();
  //gtag('config', 'UA-104168459-1', {'page_path': '/'+productTitle});
  //location.hash = location.hash+'/'+nectarSimpleString;

  $("#pageContent").load(getPage("nectarorder"), function () {
    pageLoaded();

    document
      .getElementById("orderProductImage")
      .setAttribute("src", imgUrl.toLowerCase());
    document.getElementById("orderProductTitle").innerHTML = productTitle;
    document.getElementById("orderProductHeadInfo").innerHTML = productHeadInfo;
    document.getElementById("orderProductTags").innerHTML = productTags;
    document.getElementById("orderProductSlip_CUSTOMTEXT").value =
      sessionStorage.getItem("name");
  });
}

function buyHardware(element, cat) {
  if (
    accessNeeded(function () {
      buyHardware(element, cat);
    })
  ) {
    return false;
  }

  var productSubtitle,
    productTitle,
    productPrice,
    productOldPrice,
    productSlipInfo,
    imgUrl,
    productColors = [],
    productSizes = [];

  productSubtitle = $(element).children(".product-item-brand").html();
  productTitle = $(element).children(".product-item-title").html();
  var outOfStock = $(element).hasClass("oos");
  productPrice = $(element).find(".product-item-price").html().substring(1);
  productSlipInfo = $(element).find(".product-item-info").html();

  var productOldPriceElement = $(element).find(".product-item-oldprice");
  if (productOldPriceElement.length) {
    productOldPrice = productOldPriceElement.html().substring(1);
  }

  if (element.hasAttribute("colors")) {
    productColors = element.getAttribute("colors").split(",");
  }

  if (element.hasAttribute("sizes")) {
    productSizes = element.getAttribute("sizes").split(",");
  }

  imgUrl = $(element).find("img.product-item-image").attr("src");

  openMenu(false);
  $("#pageLoader").show();
  $("#pageLoader").html("loading <b>" + productTitle + "</b>");
  $("#pageContent").hide();
  $("#scrollContent").scrollTop(0);

  $("#pageContent").load(getPage("hardwareorder"), function () {
    pageLoaded();

    document.getElementById("orderProductType").innerHTML = cat;

    document
      .getElementById("orderProductImage")
      .setAttribute("src", imgUrl.toLowerCase());
    document.getElementById("orderProductTitle").innerHTML = productTitle;

    document.getElementById("orderProductSubtitle").innerHTML = productSubtitle;
    document
      .getElementById("orderProductSlipPricing")
      .setAttribute("price", productPrice);
    $("#orderProductSlipPurchase")
      .html(outOfStock ? "Place Backorder" : "Place Order")
      .toggleClass("tomato", outOfStock);

    document.getElementById("orderProductSlipPrice").innerHTML =
      "€" + productPrice;
    document.getElementById("orderProductSlipInfo").innerHTML =
      productSlipInfo != null
        ? "<b>Quick Specs</b><p>" + productSlipInfo + "</p>"
        : "";

    if (productOldPrice != undefined) {
      document
        .getElementById("orderProductSlipPricing")
        .setAttribute("oldprice", productOldPrice);
      document.getElementById("orderProductSlipOldPrice").innerHTML =
        "€" + productOldPrice;
      var percentOff =
        ((productOldPrice - productPrice) / productOldPrice) * 100;
      document.getElementById("orderProductSlipEarn").innerHTML =
        "This product is on <b>" + Math.round(percentOff) + "%</b> Discount!";
    } else {
      $("#orderProductSlipOldPrice, #orderProductSlipEarn").remove();
    }

    if (productColors.length > 0) {
      var colorSelectionElement = document.getElementById(
        "orderProductSlip_COLOR"
      );

      productColors.forEach(function (color) {
        var option = document.createElement("option");
        option.text = color;
        colorSelectionElement.add(option);
      });
    } else {
      $("#orderProductSlipRow_COLORS").remove();
    }

    if (productSizes.length > 0) {
      var sizeSelectionElement = document.getElementById(
        "orderProductSlip_SIZE"
      );

      productSizes.forEach(function (size) {
        var option = document.createElement("option");
        option.text = size;
        sizeSelectionElement.add(option);
      });
    } else {
      $("#orderProductSlipRow_SIZE").remove();
    }
  });
}

function selectOption(element) {
  $(element).addClass("selected").siblings().removeClass("selected");
  recalcNectar();
}

function recalcHardware() {
  var pricingElement = document.getElementById("orderProductSlipPricing");
  var UnitPrice = pricingElement.getAttribute("price");

  var qty = document.getElementById("orderProductSlip_QTY").value;
  var totalPrice = UnitPrice * qty;

  document.getElementById("orderProductSlipPrice").innerHTML =
    "€" + totalPrice.toFixed(2);

  if (pricingElement.hasAttribute("oldPrice")) {
    var UnitOldPrice = pricingElement.getAttribute("oldprice");
    var totalOldPrice = UnitOldPrice * qty;
    document.getElementById("orderProductSlipOldPrice").innerHTML =
      "€" + totalOldPrice.toFixed(2);
  }
}

function recalcNectar() {
  var nicDose = document.getElementById("orderProductSlip_NICOTINE").value;

  //show nictype only when dose is more than zero mg
  $("#orderProductSlipRow_NICTYPE").toggle(nicDose > 0);

  //if nicotine is Zero, default the type to freebase
  if ($("#orderProductSlipRow_NICTYPE").is(":hidden"))
    $(".orderProductSlip_NICTYPE[value=F]")
      .addClass("selected")
      .siblings()
      .removeClass("selected");

  var size = +$(".orderProductSlip_SIZE.selected").attr("value");

  var nicType = $(".orderProductSlip_NICTYPE.selected").attr("value");

  //hide 250 and 500mls when selecting salt
  $(
    ".orderProductSlip_SIZE[value=250], .orderProductSlip_SIZE[value=500]"
  ).toggle(nicType == "F");

  //default to 120ml if hydra was selected at large size
  if (size > 120 && nicType == "S") {
    $(".orderProductSlip_SIZE[value=120]")
      .addClass("selected")
      .siblings()
      .removeClass("selected");
    size = 120;
  }

  //show Nozzle only when size is 250 or 500
  $("#orderProductSlipRow_NOZZLE").toggle(size == 250 || size == 500);

  //if size is up to 120, default to No Nozzle
  if ($("#orderProductSlipRow_NOZZLE").is(":hidden"))
    $('.orderProductSlip_NOZZLE[value="false"]')
      .addClass("selected")
      .siblings()
      .removeClass("selected");

  var nozzle = $(".orderProductSlip_NOZZLE.selected").attr("value") === "true";

  // var size = $(".orderProductSlip_SIZE.selected").attr("value");
  var qty = +document.getElementById("orderProductSlip_QTY").value;

  var price = 0.0;
  var total = 0.0;

  var backPointsValue = 0;

  if (size && nicDose > -1) {
    if (nicType == "F") {
      switch (size) {
        case 30:
          price = 6;
          break;
        case 60:
          price = 10.5;
          break;
        case 120:
          price = 19.5;
          break;
        case 250:
          price = 37;
          break;
        case 500:
          price = 70;
          break;
      }
    } else if (nicType == "S") {
      switch (size) {
        case 30:
          price = 7;
          break;
        case 60:
          price = 12.5;
          break;
        case 120:
          price = 23.5;
          break;
      }
    }

    //if unflavored, reduce price by 10%
    if ($("#orderProductTitle").text() == "Unflavored") {
      price = +(price * 0.9).toFixed(2); //the plus avoids returning a string by toFixed
    }

    //calculations
    var myPoints = 0;

    if (sessionStorage.getItem("points") != null) {
      myPoints = sessionStorage.getItem("points");
    }

    total = price * +qty;
    var backPointsValue = Math.floor((15 - nicDose) * total);

    total += qty * (nozzle ? 2 : 0);
    var hasEnoughPoints = myPoints >= total * 100;

    //calculate points back or points to redeem
    if ($("#orderProductSlipRedeemButton").is(":checked") && hasEnoughPoints) {
      //$('#orderContainer').addClass('redeemMode');
      document.getElementById("orderProductSlipPrice").innerHTML = "€0.00";
      document.getElementById("orderProductSlipEarn").innerHTML = ""; //"you'll use <b>"+100 * total +"</b> points for this purchase!";
      $("#orderProductSlipEarn").show();
    } else {
      //$('#orderContainer').removeClass('redeemMode');
      $("#orderProductSlipRedeemButton").prop("checked", false);
      document.getElementById("orderProductSlipPrice").innerHTML =
        "€" + total.toFixed(2);
      document.getElementById("orderProductSlipEarn").innerHTML =
        "you'll earn <b>" + backPointsValue + "</b> points with this purchase!";
      $("#orderProductSlipEarn").toggle(backPointsValue > 0);
    }

    document.getElementById("orderProductSlipRedeemButtonCaption").innerHTML =
      "Use " + Math.round(+total * 100) + " points!";
    document.getElementById("orderProductSlipPointsBalance").innerHTML =
      "You have " + myPoints + " points in your account";

    //if user has enough points
    if (hasEnoughPoints) {
      $("#orderProductSlipRedeem").removeClass("notEnough");
    } else {
      $("#orderProductSlipRedeem").addClass("notEnough");
    }
  }

  $("#orderProductSlipPricing, #orderProductSlipRedeem").toggle(
    size != undefined && nicDose > -1
  );
}
