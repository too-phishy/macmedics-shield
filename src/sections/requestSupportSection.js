export const requestSupportSection = (baseUrl) => {
  return {
    header: "Did you...?",
    widgets: [
      {
        selectionInput: {
          name: "links",
          label: "Did you click on any links?",
          type: "RADIO_BUTTON",
          items: [
            {
              text: "Yes",
              value: "Yes",
              selected: false,
            },
            {
              text: "No",
              value: "No",
              selected: false,
            },
          ],
        },
      },
      {
        selectionInput: {
          name: "attachments",
          label: "Did you open any attachments?",
          type: "RADIO_BUTTON",
          items: [
            {
              text: "Yes",
              value: "Yes",
              selected: false,
            },
            {
              text: "No",
              value: "No",
              selected: false,
            },
          ],
        },
      },
      {
        selectionInput: {
          name: "password",
          label: "Did you enter your username or password?",
          type: "RADIO_BUTTON",
          items: [
            {
              text: "Yes",
              value: "Yes",
              selected: false,
            },
            {
              text: "No",
              value: "No",
              selected: false,
            },
          ],
        },
      },
      {
        textInput: {
          name: "name",
          label: "Name",
          validation: {
            inputType: "TEXT",
          },
        },
      },
      {
        textInput: {
          name: "phone_number",
          label: "Phone Number",
          validation: {
            inputType: "TEXT",
          },
        },
      },
      {
        horizontalAlignment: "CENTER",
        buttonList: {
          buttons: [
            {
              text: "NEXT",
              color: {
                red: 0.2,
                blue: 0.917,
                green: 0.227,
              },
              onClick: {
                action: {
                  function: `${baseUrl}/submitForm`,
                },
              },
            },
          ],
        },
      },
    ],
  };
};
