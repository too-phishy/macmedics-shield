export const cardForInactiveUser = {
  sections: [
    {
      widgets: [
        {
          imageUrl:
            "https://www.toophishy.com/macmedics-powered-by-too-phishy.png",
          altText: `MacMedics`,
          onClick: {
            openLink: {
              url: "https://www.macmedics.ca/security",
            },
          },
        },
        {
          textParagraph: {
            text: "To get started, contact Mac Medics for an account!",
          },
          horizontalAlignment: "CENTER",
        },
        {
          buttonList: {
            buttons: [
              {
                text: "Contact",
                color: {
                  red: 0.4,
                  blue: 0.227,
                  green: 0.717,
                },
                onClick: {
                  openLink: {
                    url: "mailto:support@macmedics.ca",
                    openAs: "OVERLAY",
                    onClose: "RELOAD",
                  },
                },
              },
            ],
          },
          horizontalAlignment: "CENTER",
        },
      ],
      header: " ",
    },
  ],
};
