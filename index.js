$(document).ready(function () {
  tryFetchSession();

  if (!("ontouchstart" in document.documentElement)) {
    document.documentElement.className += " notouch";
  }
});

function initApp() {
  if (
    sessionStorage.getItem("over18") == null &&
    sessionStorage.getItem("userid") == null
  ) {
    $("#ageCheck").show();
  }

  if (
    window.location.hash == "#mylab" ||
    window.location.hash == "#myaccount" ||
    window.location.hash == "#nectars" ||
    window.location.hash == "#home" ||
    window.location.hash == "#seducehydra" ||
    window.location.hash == "#chargers" ||
    window.location.hash == "#batteries" ||
    window.location.hash == "#coilheads" ||
    window.location.hash == "#rebuilding" ||
    window.location.hash == "#glasstubes" ||
    window.location.hash == "#atomizers" ||
    window.location.hash == "#mods" ||
    window.location.hash == "#accessories" ||
    window.location.hash == "#starterkits"
  ) {
    loadContent(window.location.hash.substring(1));
  } else {
    loadContent("home");
  }

  //$('#shutdownNoticeShadow').show();
}

window.onload = function () {
  /*
	var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
if( isMobile.any() ) alert('Mobile');
};*/
};

var imagesLoaded = 0;

function pageLoaded() {
  $("#pageLoader").hide();
  $("#pageLoader").html("");
  $("#pageContent").show();
}

function openMenu(visibility) {
  $("#headerMenu, #headerMenuCloser").toggleClass("opened", visibility);
}

var afterLoginFunction = undefined;

function preloadContent(pageName) {
  if (window.location.hash == "#" + pageName) loadContent(pageName);
  else window.location.hash = "#" + pageName;
}

function recommendedByAFriend(value) {
  $("#registerPopupFriend").attr("required", value);
  $("#registerPopupFriendSection").toggle(value);
}

function loadContent(pageName) {
  openMenu(false);
  $("#pageLoader").show();
  $("#pageContent").hide();
  $("#scrollContent").scrollTop(0);

  switch (pageName) {
    case "myaccount":
      $("#headerMyAccount")
        .addClass("selected")
        .siblings()
        .removeClass("selected");
      break;
    case "mylab":
      $("#headerMyLab").addClass("selected").siblings().removeClass("selected");
      break;
    case "nectars":
      $("#headerNectar")
        .addClass("selected")
        .siblings()
        .removeClass("selected");
      break;
    default:
      $("#headerMenu").children().removeClass("selected");
      break;
  }

  $("#pageContent").load(getPage(pageName), function () {
    pageLoaded();
  });

  //gtag('config', 'UA-104168459-1', {'page_path': '/'+pageName});

  //$(body).attr('onhashchange','loadContent(window.location.hash.substring(1));');

  //window.onhashchange = undefined;
  //window.location.hash = '#'+pageName;
}

function accessNeeded(func) {
  if (sessionStorage.getItem("seid") != null) {
    return false;
  } else {
    loginPopup(func);
    return true;
  }
}

function infoPopup(content, color) {
  $("body").append(
    '<div\
  id="infoPopupShadow"\
  class="fxDisplay fxAlignCenter fxJustifyCenter">\
  <div id="infoPopupElement">\
    <h1 style="color:' +
      color +
      '">' +
      content.title +
      "</h1>\
    <h2>" +
      content.subtitle +
      "</h2>\
    <p>" +
      content.info +
      "</p>\
    <h3>" +
      content.footer +
      '</h3>\
    <button id="infoPopupOkBtn"\
      onclick="this.parentElement.parentElement.remove();">\
      OK </button>\
  </div>\
</div>'
  );
}

function loginPopup(queuedFunc) {
  afterLoginFunction = queuedFunc;
  openMenu(false);

  $(".credPopupData.register").hide();
  $(".credPopupData.login").show();
  $("#registerPopupFriendSection").toggle(false);
  document.getElementById("registerForm").reset();

  document.getElementById("loginForm").reset();

  $("#scrollContent").css("overflow", "hidden");
  $("#loginPopupTitle").text("Account Login");
  $("#loginPopupEmail").val("");
  $("#loginPopupPassword").val("");
  $("#loginPopupError").text("");
  $("#loginPopupShadow").css("z-index", "9999").fadeTo("medium", 1);
}

function changePassPopup() {
  $("#changePassPopupTitle").text("Change Password");
  $("#scrollContent").css("overflow", "hidden");
  $("#changePassCurrent").val("");
  $("#changePassNew").val("");
  $("#changePassConfirm").val("");
  $("#changePassPopupError").text("");
  $("#changePassPopupShadow").css("z-index", "9999").fadeTo("medium", 1);
}

function logout() {
  openMenu(false);

  sessionStorage.removeItem("userid");
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("points");
  sessionStorage.removeItem("seid");

  localStorage.removeItem("userid");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("points");
  localStorage.removeItem("seid");

  document.location.href = window.location.href.split("#")[0];
}

function closeCredPopup(id) {
  $("#scrollContent").css("overflow", "auto");
  if ($("#" + id).hasClass("loading")) return false;
  afterLoginFunction = undefined;
  $("#" + id).fadeTo("fast", 0, function () {
    $(this).css("z-index", "-9999");
  });
}

function ageCheckOk(element) {
  sessionStorage.setItem("over18", true);
  element.parentElement.parentElement.remove();
}
// var rememberMe = false;

function tryFetchSession() {
  //try populate SessionStorage from LocalStorage
  if (
    localStorage.getItem("userid") != null &&
    localStorage.getItem("seid") != null
  ) {
    sessionStorage.setItem("userid", localStorage.getItem("userid"));
    sessionStorage.setItem("seid", localStorage.getItem("seid"));
  }

  if (
    sessionStorage.getItem("userid") == null &&
    sessionStorage.getItem("seid") == null
  ) {
    populateUser(false);
    initApp();
  } else {
    loginObj = {
      email: null,
      pass: null,
      userid: sessionStorage.getItem("userid"),
      seid: sessionStorage.getItem("seid"),
    };

    //$("#pageLoader").html("logging in");

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbzVgUmPLBBeNXNcxbZ-Jhfqht8rY_n19KSx8T04618AbCKDio4N3AUZqbO56n3RHN0w/exec",
      type: "GET",
      data: loginObj,
      success: function (response) {
        updateSession(JSON.parse(response));
      },
      error: function () {
        populateUser(false);
      },
      complete: function () {
        initApp();
      },
    });
  }
}

function updateSession(response) {
  sessionStorage.setItem("userid", response.userid);
  sessionStorage.setItem("seid", response.seid);
  sessionStorage.setItem("name", response.name);
  sessionStorage.setItem("email", response.email);
  sessionStorage.setItem("points", response.points);

  //if was saved, save again
  if (localStorage.getItem("userid") != null) {
    localStorage.setItem("userid", response.userid);
    localStorage.setItem("seid", response.seid);
  }

  // $("#pageContent").addClass("member");

  populateUser(true);

  //initApp();
}

function populateUser(success) {
  if (success) {
    document.getElementById("headerLoginText").innerHTML =
      "Hello " + sessionStorage.getItem("name") + "!";
    $("#headerLoginText").fadeIn();
    $("#headerLogout, #headerMyLab, #headerMyAccount").show();
    $("#headerLogin").hide();
  } else {
    document.getElementById("headerLoginText").innerHTML = ""; // "Welcome to Mama's Nectar!";
    $("#headerLoginText").hide();
    $("#headerLogout, #headerMyLab, #headerMyAccount").hide();
    $("#headerLogin").show();
    // var isInMyLab = document.getElementById("myLabRequestTitle");
    // if (isInMyLab) loadContent('nectars');
  }
}
