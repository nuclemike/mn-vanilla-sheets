function systemMessage(message, className) {
  $(
    "<p id='systemMessage' class='" + className + "' >" + message + "</p>"
  ).insertAfter("#header");

  setTimeout(function () {
    $("#systemMessage").remove();
  }, 8000);
}

function getProductImgUrl(product, category) {
  const imgUrl =
    category +
    "/" +
    (product.brand + product.title).replace(/[^a-z0-9]/gi, "").toLowerCase() +
    (product.spec
      ? "_" + product.spec.replace(/[^a-z0-9]/gi, "").toLowerCase()
      : "") +
    ".jpg";

  return imgUrl.toLowerCase();
}
