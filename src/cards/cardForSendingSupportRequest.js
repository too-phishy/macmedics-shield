export const cardForSendingSupportRequest = async (
  linksResponse,
  attachmentsResponse,
  passwordResponse,
  nameResponse,
  phoneNumberResponse
) => {
  return {
    sections: [
      {
        widgets: [
          {
            decoratedText: {
              text: "Did you click on any links?",
              bottomLabel: linksResponse,
              startIcon: {
                iconUrl: "https://toophishy.com/question.png",
              },
            },
          },
          {
            decoratedText: {
              text: "Did you open any attachments?",
              bottomLabel: attachmentsResponse,
              startIcon: {
                iconUrl: "https://toophishy.com/question.png",
              },
            },
          },
          {
            decoratedText: {
              text: "Did you enter your username or password?",
              bottomLabel: passwordResponse,
              startIcon: {
                iconUrl: "https://toophishy.com/question.png",
              },
            },
          },
          {
            decoratedText: {
              text: "Name:",
              bottomLabel: nameResponse,
              startIcon: {
                iconUrl: "https://toophishy.com/question.png",
              },
            },
          },
          {
            decoratedText: {
              text: "Phone Number:",
              bottomLabel: phoneNumberResponse,
              startIcon: {
                iconUrl: "https://toophishy.com/question.png",
              },
            },
          },
          linksResponse === "No" &&
          attachmentsResponse === "No" &&
          passwordResponse === "No"
            ? {
                textParagraph: {
                  text: "Since you answered no to the above questions, you're in the clear. Delete the message or mark it as spam.",
                },
              }
            : {
                horizontalAlignment: "CENTER",
                buttonList: {
                  buttons: [
                    {
                      text: "REQUEST SUPPORT",
                      color: {
                        red: 0.2,
                        blue: 0.917,
                        green: 0.227,
                      },
                      onClick: {
                        openLink: {
                          url: `mailto:security@macmedics.ca?subject=Phishing%20-%20Support%20Request&body=Name%3A%20${encodeURIComponent(
                            nameResponse
                          )}%0APhone%3A%20${encodeURIComponent(
                            phoneNumberResponse
                          )}%0A%0ADid%20you%20click%20on%20any%20links%3F%0A${linksResponse}%0A%0ADid%20you%20open%20any%20attachments%3F%0A${attachmentsResponse}%0A%0ADid%20you%20enter%20your%20username%2Fpassword%3F%0A${passwordResponse}`,
                        },
                      },
                    },
                  ],
                },
              },
        ],
      },
    ],
  };
};
