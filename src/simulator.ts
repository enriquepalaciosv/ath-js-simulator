declare const ATHM_Checkout: any;
declare const authorizationATHM: () => void;
declare const cancelATHM: () => void;
declare const expiredATHM: () => void;

const ATH_API_URL = "https://ath-simulator.acima.com";
const BUTTON_CONTAINER_ID = "ATHMovil_Checkout_Button_payment_sandbox";
const LABEL_ID = "ATHMovil_Payent_Label";
const FORM_ID = "ATHMovil_Submit_Form";

const authorization = async () => {
  // TODO: call /pay/ABCDEF12/status
  return new Promise((resolve) => {
    resolve({ method: "authorization", payload: ATHM_Checkout });
  });
};

const findPaymentATHM = async () => {
  // TODO: call /pay/ABCDEF12/status
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

function removeElement(containerId: string) {
  var elementToRemove = document.getElementById(containerId);
  if (elementToRemove) {
    elementToRemove.parentNode?.removeChild(elementToRemove);
  }
}

function createSubmitForm(
  containerId: string,
  clickHandler: (athUsername: string) => void
) {
  var container = document.getElementById(containerId) as HTMLElement;

  container.style.display = "flex";
  container.style.flexDirection = "column";

  var inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.placeholder = "Email, username or phone number";
  inputElement.style.marginBottom = "10px";

  var buttonElement = document.createElement("button");
  buttonElement.textContent = "Next";
  buttonElement.style.cursor = "pointer";
  buttonElement.style.padding = "8px 16px";
  buttonElement.style.border = "none";
  buttonElement.style.backgroundColor = "#007bff";
  buttonElement.style.color = "#fff";
  buttonElement.style.fontWeight = "bold";
  buttonElement.style.borderRadius = "4px";
  buttonElement.addEventListener("click", function () {
    var inputValue = inputElement.value;
    clickHandler(inputValue);
  });

  container?.appendChild(inputElement);
  container?.appendChild(buttonElement);
}

(function () {
  function init() {
    function submit(athUsername: string) {
      trackClick("Form submit", athUsername);
      // /pay/ABCDEF12/event - POST
    }

    function showSubmitionForm() {
      trackClick("ATH button");
      removeElement(BUTTON_CONTAINER_ID);
      removeElement(LABEL_ID);
      createSubmitForm(FORM_ID, submit);
    }

    createButton(BUTTON_CONTAINER_ID, showSubmitionForm);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
