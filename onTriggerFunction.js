import express from "express";
import { google } from "googleapis";
import asyncHandler from "express-async-handler";
import { OAuth2Client } from "google-auth-library";
import { processMessage } from "./src/processMessage.js";
import { cardForActiveUser } from "./src/cards/cardForActiveUser.js";
import { cardForInactiveUser } from "./src/cards/cardForInactiveUser.js";
import * as util from "util";
import { cardForSendingSupportRequest } from "./src/cards/cardForSendingSupportRequest.js";

const gmail = google.gmail({ version: "v1" });
// Create and configure the app
const app = express();

// Trust GCPs front end to for hostname/port forwarding
app.set("trust proxy", true);
app.use(express.json());

const CUSTOMER_LIST = new Set([
  "lydia.stepanek@gmail.com",
  "gsmtestuser@marketplacetest.net",
  "gsmtestadmin@marketplacetest.net",
]);

app.post(
  "/",
  asyncHandler(async (req, res) => {
    const baseUrl = `${req.protocol}://${req.hostname}${req.baseUrl}`;
    const currentMessageId = req.body.gmail.messageId;
    const event = req.body;
    const accessToken = event.authorizationEventObject.userOAuthToken;

    const tokenInfo = await new OAuth2Client().getTokenInfo(accessToken);
    const email = tokenInfo.email;

    const activeCustomer = CUSTOMER_LIST.has(email);

    const messageToken = event.gmail.accessToken;
    const auth = new OAuth2Client();
    auth.setCredentials({ access_token: accessToken });

    const gmailResponse = await gmail.users.messages.get({
      id: currentMessageId,
      userId: "me",
      format: "full",
      auth,
      headers: {
        "X-Goog-Gmail-Access-Token": messageToken,
      },
    });
    const messageData = gmailResponse.data;

    const { headers, fullLinkURIs, messageBodies } = await processMessage(
      messageData
    );

    const pushCard = activeCustomer
      ? await cardForActiveUser(
          headers,
          fullLinkURIs,
          baseUrl,
          messageBodies,
          messageData
        )
      : cardForInactiveUser;
    const renderAction = {
      action: {
        navigations: [
          {
            pushCard,
          },
        ],
      },
    };
    res.json(renderAction);
  })
);

app.post(
  "/submitForm",
  asyncHandler(async (req, res) => {
    const event = req.body;
    const formInputs = event.commonEventObject.formInputs;
    const linksResponse = formInputs?.links?.stringInputs.value[0];
    const attachmentsResponse = formInputs?.attachments?.stringInputs.value[0];
    const passwordResponse = formInputs?.password?.stringInputs.value[0];
    const nameResponse = formInputs?.name?.stringInputs.value;
    const phoneNumberResponse = formInputs?.phone_number?.stringInputs.value;
    const pushCard = cardForSendingSupportRequest(
      linksResponse,
      attachmentsResponse,
      passwordResponse,
      nameResponse,
      phoneNumberResponse
    );
    const renderAction = {
      action: {
        navigations: [
          {
            pushCard,
          },
        ],
      },
    };
    res.json(renderAction);
  })
);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
