declare const ATHM_Checkout: any;
declare const authorizationATHM: () => void;
declare const cancelATHM: () => void;
declare const expiredATHM: () => void;

const authorization = async () => {
  console.log("authorization function");
  return new Promise((resolve) => {
    resolve({ method: "authorization", payload: ATHM_Checkout });
  });
};

const findPaymentATHM = async () => {
  console.log("findPaymentATHM function");
  return new Promise((resolve) => {
    resolve({ method: "findPaymentATHM", payload: ATHM_Checkout });
  });
};

const trackClick = async (buttonName: string, athUsername?: string) => {
  const payload = {
    type: buttonName,
    ath_username: athUsername,
  };
  console.log("tracking click", payload);
  // TODO: /pay/ABCDEF12/click - POST
};

function createButton(containerId: string, clickHandler: () => void) {
  var container = document.getElementById(containerId);

  if (container) {
    var button = document.createElement("button");
    button.innerText = "Pay with ATH";
    button.style.display = "inline-block";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.fontWeight = "bold";
    button.style.textAlign = "center";
    button.style.textDecoration = "none";
    button.style.cursor = "pointer";
    button.style.borderRadius = "4px";
    button.style.transition = "background-color 0.3s, color 0.3s";

    button.style.backgroundColor = "#3f51b5";
    button.style.color = "#ffffff";
    button.style.border = "none";

    button.addEventListener("mouseenter", function () {
      button.style.backgroundColor = "#303f9f";
    });

    button.addEventListener("mouseleave", function () {
      button.style.backgroundColor = "#3f51b5";
    });

    button.addEventListener("mousedown", function () {
      button.style.backgroundColor = "#283593";
    });

    button.addEventListener("mouseup", function () {
      button.style.backgroundColor = "#303f9f";
    });

    button.addEventListener("click", function () {
      clickHandler();
    });

    container.appendChild(button);
  } else {
    console.error("Container with ID '" + containerId + "' not found.");
  }
}

(function () {
  const BUTTON_CONTAINER_ID = "ATHMovil_Checkout_Button_payment_sandbox";

  function init() {
    function showSubmitionForm() {
      trackClick("ATH button");
      authorizationATHM();
      // TODO: show submition form
    }

    function submit(athUsername: string) {
      trackClick("Form submit", athUsername);
    }

    createButton(BUTTON_CONTAINER_ID, showSubmitionForm);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
