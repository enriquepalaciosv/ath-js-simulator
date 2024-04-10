declare const ATHM_Checkout: any;
declare const authorizationATHM: () => void;
declare const cancelATHM: () => void;
declare const expiredATHM: () => void;

const ATH_API_URL = window.location.href;
const BUTTON_CONTAINER_ID = "ATHMovil_Checkout_Button_payment_sandbox";
const LABEL_ID = "ATHMovil_Payent_Label";
const FORM_ID = "ATHMovil_Submit_Form";

import axios from "axios";

export async function authorization() {
  try {
    const url = `${ATH_API_URL}/status`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("(ATH Simulator) Error [authorization]:", error);
  }
}
(window as any).authorization = authorization;

export async function findPaymentATHM() {
  try {
    const url = `${ATH_API_URL}/status`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("(ATH Simulator) Error [findPaymentATHM]:", error);
  }
}

(window as any).findPaymentATHM = findPaymentATHM;

const trackClick = async (buttonName: string, athUsername?: string) => {
  const payload = {
    type: buttonName,
    ath_username: athUsername,
  };
  console.log("(ATH Simulator) [Click Tracking]", payload);
  try {
    const url = `${ATH_API_URL}/click`;
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    console.error("(ATH Simulator) Error [trackClick]:", error);
  }
};

const submitEvent = async (ath_payload: any) => {
  try {
    const url = `${ATH_API_URL}/event`;
    const response = await axios.post(url, { ath_payload });
    return response.data;
  } catch (error) {
    console.error("(ATH Simulator) Error [submitEvent]:", error);
  }
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
  inputElement.style.display = "block";
  inputElement.style.minWidth = "300px";
  inputElement.style.padding = "10px";
  inputElement.style.margin = "16px 0px";
  inputElement.style.fontSize = "16px";
  inputElement.style.border = "1px solid #ccc";
  inputElement.style.borderRadius = "4px";
  inputElement.style.boxSizing = "border-box";
  inputElement.style.transition = "border-color 0.3s ease";

  inputElement.addEventListener("focus", function () {
    inputElement.style.borderColor = "#007bff";
  });

  inputElement.addEventListener("blur", function () {
    inputElement.style.borderColor = "#ccc";
  });

  var buttonElement = document.createElement("button");
  buttonElement.textContent = "Next";
  buttonElement.style.display = "inline-block";
  buttonElement.style.padding = "10px 20px";
  buttonElement.style.fontSize = "16px";
  buttonElement.style.fontWeight = "bold";
  buttonElement.style.textAlign = "center";
  buttonElement.style.textDecoration = "none";
  buttonElement.style.cursor = "pointer";
  buttonElement.style.borderRadius = "4px";
  buttonElement.style.transition = "background-color 0.3s, color 0.3s";
  buttonElement.style.backgroundColor = "#3f51b5";
  buttonElement.style.color = "#ffffff";
  buttonElement.style.border = "none";
  buttonElement.addEventListener("click", function () {
    var inputValue = inputElement.value;
    if (inputValue) {
      clickHandler(inputValue);
    }
  });

  container?.appendChild(inputElement);
  container?.appendChild(buttonElement);
}

(function () {
  function init() {
    async function submit(athUsername: string) {
      const form = document.getElementById(FORM_ID) as HTMLDivElement;
      if (form) {
        const button = form.querySelector("button") as HTMLButtonElement;
        button.disabled = true;
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed";
        button.style.backgroundColor = "#ccc";
        button.style.color = "#999";
        button.style.boxShadow = "none";
        button.innerText = "Loading...";
      }

      const { payment_intent_status } = await trackClick("form", athUsername);
      await submitEvent(ATHM_Checkout);
      switch (payment_intent_status) {
        case "rejected":
          cancelATHM();
          break;
        case "expired":
          expiredATHM();
          break;
        default:
          authorizationATHM();
          break;
      }
    }

    function showSubmitionForm() {
      trackClick("button");
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
