async function renderProducts(
  container,
  category,
  displaySubCat = true,
  hotOnly = false,
  showNewIcon = true,
  showHotIcon = true
) {
  const grouped = [];

  await $.getJSON(category + ".json", function (json) {
    //Group products
    for (var index in json) {
      const item = json[index];

      const subCatIndex = grouped.findIndex((x) => x.subCat == item.subCat);

      if (subCatIndex >= 0) grouped[subCatIndex].items.push(item);
      else grouped.push({ subCat: item.subCat, items: [item] });
    }

    for (var index in grouped) {
      const item = grouped[index];

      displaySubCat &&
        container.append(
          '<span class="product-item-hr">' + item.subCat + "</span>"
        );

      const products = hotOnly ? item.items.filter((i) => i.hot) : item.items;

      for (var productIndex in products) {
        const product = products[productIndex];

        var anchor = document.createElement("a");
        anchor.className = `product-item ${
          product.new && showNewIcon && " new"
        } ${product.hot && showHotIcon && " hot"}`;
        // anchor.setAttribute('href',"yourlink.htm");
        // anchor.innerText = "link text";

        product.fitment && anchor.setAttribute("filtertags", product.fitment);
        product.spec && anchor.setAttribute("specs", product.spec);

        anchor.onclick = function () {
          // buyHardware(product.code, category);
          buyHardware(product, category);
        };

        var figure = document.createElement("figure");
        var img = document.createElement("img");
        img.className = "product-item-image";
        img.setAttribute("src", getProductImgUrl(product, category));
        figure.appendChild(img);
        anchor.appendChild(figure);

        var brand = document.createElement("label");
        brand.className = "product-item-brand";
        brand.innerHTML = product.brand;
        anchor.appendChild(brand);

        var title = document.createElement("label");
        title.className = "product-item-title";
        title.innerHTML = product.title;
        anchor.appendChild(title);

        var info = document.createElement("span");
        info.className = "product-item-info";
        info.innerHTML = product.info;
        anchor.appendChild(info);

        var prices = document.createElement("div");
        prices.className = "product-item-buy";

        if (product.oldPrice) {
          var oldPrice = document.createElement("div");
          oldPrice.className = "product-item-oldprice";
          oldPrice.innerHTML = "€" + product.oldPrice.toFixed(2);
          prices.appendChild(oldPrice);
        }

        if (product.price) {
          var price = document.createElement("div");
          price.className = "product-item-price";
          price.innerHTML = "€" + product.price.toFixed(2);
          prices.appendChild(price);
        }

        anchor.appendChild(prices);

        container.append(anchor);

        // container.append(
        //   '<a class="product-item' +
        //     (product.new && showNewIcon ? " new" : "") +
        //     (product.hot && showHotIcon ? " hot" : "") +
        //     '"' +
        //     (product.fitment ? ' filtertags="' + product.fitment + '"' : "") +
        //     ' onclick=buyHardware("' +
        //     product.code +
        //     '","' +
        //     category +
        //     '");' +
        //     (product.spec ? ' specs="' + product.spec + '"' : "") +
        //     ">" +
        //     '<figure><img class="product-item-image"' +
        //     'src="' +
        //     category +
        //     "/" +
        //     (product.brand + product.title)
        //       .replace(/[^a-z0-9]/gi, "")
        //       .toLowerCase() +
        //     (product.spec
        //       ? "_" + product.spec.replace(/[^a-z0-9]/gi, "").toLowerCase()
        //       : "") +
        //     '.jpg" />' +
        //     "</figure>" +
        //     '<label class="product-item-brand">' +
        //     product.brand +
        //     "</label>" +
        //     '<label class="product-item-title">' +
        //     product.title +
        //     "</label>" +
        //     '<span class="product-item-info"' +
        //     ">" +
        //     product.info +
        //     "</span>" +
        //     '<div class="product-item-buy">' +
        //     (product.oldPrice
        //       ? '<div class="product-item-oldprice">' +
        //         "€" +
        //         product.oldPrice.toFixed(2) +
        //         "</div>"
        //       : "") +
        //     '<div class="product-item-price">€' +
        //     product.price?.toFixed(2) +
        //     "</div>" +
        //     "</div>" +
        //     "</a>"
        // );
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

    const oos = ["Ape Charlies", "Congo Bongo"].includes(productTitle);

    $("#orderProductSlipPurchase")
      .html(oos == true ? "Place Backorder" : "Place Order")
      .toggleClass("tomato", oos);
  });
}

async function buyHardware(product, cat) {
  if (
    accessNeeded(function () {
      buyHardware(product, cat);
    })
  ) {
    return false;
  }

  //var product;
  try {
    // await $.getJSON(cat + ".json", function (json) {
    //   product = json.filter((j) => j.code === productCode)[0];
    // });

    // if (!product) return;

    const imgUrl = getProductImgUrl(product, cat);

    const productSpecs = undefined;

    if (product && product.spec) productSpecs = product.spec?.split(",");

    openMenu(false);
    $("#pageLoader").show();
    $("#pageLoader").html("loading <b>" + product.title + "</b>");
    $("#pageContent").hide();
    $("#scrollContent").scrollTop(0);

    $("#pageContent").load(getPage("hardwareorder"), function () {
      pageLoaded();

      document.getElementById("orderProductType").innerHTML = cat;

      document.getElementById("orderProductImage").setAttribute("src", imgUrl);

      document.getElementById("orderProductTitle").innerHTML = product.title;

      document.getElementById("orderProductSubtitle").innerHTML = product.brand;

      document
        .getElementById("orderProductSlipPricing")
        .setAttribute("price", product.price);
      // $("#orderProductSlipPurchase")
      //   .html(outOfStock ? "Place Backorder" : "Place Order")
      //   .toggleClass("tomato", outOfStock);

      document.getElementById("orderProductSlipPrice").innerHTML =
        "€" + product.price.toFixed(2);

      document.getElementById("orderProductSlipInfo").innerHTML =
        product.info != null
          ? "<b>Quick Specs</b><p>" + product.info + "</p>"
          : "";

      if (product.oldPrice != undefined) {
        document
          .getElementById("orderProductSlipPricing")
          .setAttribute("oldprice", product.oldPrice);
        document.getElementById("orderProductSlipOldPrice").innerHTML =
          "€" + product.oldPrice.toFixed(2);
        var percentOff =
          ((product.oldPrice - product.price) / product.oldPrice) * 100;
        document.getElementById("orderProductSlipEarn").innerHTML =
          "This product is on <b>" + Math.round(percentOff) + "%</b> Discount!";
      } else {
        $("#orderProductSlipOldPrice, #orderProductSlipEarn").remove();
      }

      if ((productSpecs ?? []).length > 0) {
        var specSelectionElement = document.getElementById(
          "orderProductSlip_SPEC"
        );

        productSpecs.forEach(function (spec) {
          var option = document.createElement("option");
          option.text = spec;
          specSelectionElement.add(option);
        });
      } else {
        $("#orderProductSlipRow_SPECS").remove();
      }
    });

    // const hardwareStock = db.collection("hardware");

    // let doc = await hardwareStock.doc(productCode).get();
    // if (doc.exists) console.log(doc.data().balance);
    // else console.log("ProductCode not found: ", productCode);
  } catch (error) {
    console.error("Error: ", error);
  }
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
